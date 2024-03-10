import * as ynab from "ynab";
import { FullTransaction, parseOrders, parseTransactions as parseTransactions } from "./amazon";

function getDocument(): Promise<string> {
    if (document.readyState === 'loading') {
        // Honestly, not sure if this first branch works...
        return new Promise((resolve) => {
            document.addEventListener('DOMContentLoaded', () => {
                resolve(document.body.innerHTML);
            });
        });
    } else {
        return Promise.resolve(document.body.innerHTML);
    }
}

/** Get all transactions by scraping Amazon. 
 * 
 * For each transaction, we need the name of the order and the price. To do this, we have to get the list of all transactions on
 * https://www.amazon.com/cpe/yourpayments/transactions. This unfortunately only contains order numbers and dollar amounts, but not name. 
 * We then need to go to the orders page at https://www.amazon.com/gp/css/order-history?ie=UTF8&ref=nav_orders_first 
 * and page through each page of orders until we have all the ones we want. Then, we match the info from those two 
 * sources up - and finally, we'll be ready to match things up with YNAB transactions.
 */
async function getAmazonInfo() {
    // First part: Amazon Transactions page, with high-level order data like number and dollar amount.
    const tab: chrome.tabs.Tab = await new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, (result) => {
            // TODO error and warning handling.
            resolve(result[0]);
        });
    });
    const transactionsPage = await chrome.scripting.executeScript({
        target: { tabId: tab.id ? tab.id : -1 },
        func: getDocument,
        args: [],
    })
    if (!transactionsPage || !transactionsPage[0].result) {
        console.error('Unable to get page HTML when scraping the Amazon page.')
    }
    const amazonHtml = transactionsPage[0].result
    const amazonTransactions = parseTransactions(amazonHtml);
    console.log(`Amazon Transactions: ${JSON.stringify(amazonTransactions)}`);

    // Next up: Orders page.
    await chrome.tabs.update({
        url: "https://www.amazon.com/gp/css/order-history?ie=UTF8&ref=nav_orders_first "
    });
    // A big hack: Sleep so the document has a chance to start loading.
    await new Promise(r => setTimeout(r, 1000));
    const ordersPage = await chrome.scripting.executeScript({
        target: { tabId: tab.id ? tab.id : -1 },
        func: getDocument,
        args: []
    });
    const ordersHtml = ordersPage[0].result;
    const orders = parseOrders(ordersHtml);
    console.log(`Orders: ${JSON.stringify(orders)}`);
    const ordersMap = new Map(orders.map((order) => [order.orderNumber, order.itemNames]));

    // Here's a limitation of our strategy: For orders of multiple items, we don't know 
    // which items comprised what amount of the total order. Supporting this is doable
    // but requires some work: we would have to dig into the individual orders' page,
    // and we would have to update the transaction in YNAB. So instead, we just concatenate
    // the item names into one.
    const transactions: FullTransaction[] = [];
    amazonTransactions.forEach((transaction) => {
        const order = ordersMap.get(transaction.orderNumber);
        if (!order) {
            console.warn(`Could not find information for transaction with order ${transaction.orderNumber}`);
            return;
        }
        transactions.push({ ...transaction, itemNames: order });
    });
    return transactions;
}

chrome.runtime.onMessage.addListener(async (request: any, sender: chrome.runtime.MessageSender, sendResponse: (v: any) => void) => {
    const amazonTransactions = await getAmazonInfo();
    console.log(`Amazon Transactions: ${JSON.stringify(amazonTransactions)}`);

    const accessToken = request['ynabAccessToken'];
    const ynabAPI = new ynab.API(accessToken);
    const budgetsResponse = await ynabAPI.budgets.getBudgets();
    const budgets = budgetsResponse.data.budgets;
    if (!budgets) {
        console.error('API call to get budgets was successful, but returned 0 budgets!')
        return;
    }
    const budget = budgets.sort((a, b) => {
        if (!a.last_modified_on && !b.last_modified_on) {
            return 0;
        }
        if (!b.last_modified_on) {
            return new Date(a.last_modified_on!).getTime();
        }
        if (!a.last_modified_on) {
            return new Date(b.last_modified_on!).getTime();
        }
        return new Date(b.last_modified_on).getTime() - new Date(a.last_modified_on).getTime()
    })[0];

    console.log(`Got ${budgets.length} budgets, picking the most recently modified one with name ${budget.name} and ID ${budget.id}, which was modified on ${budget.last_modified_on}`);
    const transactions = await ynabAPI.transactions.getTransactionsByType(budget.id, 'uncategorized')
    console.log(`Got ${transactions.data.transactions.length} uncategorized transactions.`);

    const ynabAmazonTransactions = transactions.data.transactions.filter((t) => t.payee_name?.includes('Amazon'));
    console.log(`Got ${ynabAmazonTransactions.length} Amazon transactions!`);

    const toUpdate: ynab.SaveTransactionWithId[] = [];
    // For now, just match it up by amount. TODO: Make this more robust, e.g. by resolving duplicates by date.
    const amazonTransactionsMap = new Map(amazonTransactions.map((a) => [a.priceInCents, a]));
    ynabAmazonTransactions.forEach((ynabAmazonTransaction) => {
        // Lookup by amount (divide by 10 to convert from milliunits - https://api.ynab.com/#formats).
        const amazonTransaction = amazonTransactionsMap.get(ynabAmazonTransaction.amount / 10);
        if (!amazonTransaction) {
            // console.warn(`Could not find amazon Transaction for YNAB transaction ${JSON.stringify(ynabAmazonTransaction)}`);
            return;
        }
        let memo = amazonTransaction.itemNames.join('; ');
        // YNAB has a maximum memo length of 200 characters.
        if (memo.length > 200) {
            memo = memo.slice(0, 200);
        }
        ynabAmazonTransaction.memo = memo;
        toUpdate.push(ynabAmazonTransaction);
    });

    // Finally, do the update!!
    await ynabAPI.transactions.updateTransactions(budget.id, { transactions: toUpdate });
    await chrome.runtime.sendMessage({action: "Success", message: `Successfully updated ${toUpdate.length} transaction(s)!`});
});