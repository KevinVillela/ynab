import * as ynab from "ynab";
import { FullTransaction, parseOrders, parseTransactions, OrderInfo} from "./amazon";
import * as statusAnd from "./status_and";

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
 * 
 * @param numOrders The number of orders to crawl for.
 */
async function getAmazonInfo(numOrders: number): Promise<statusAnd.StatusAnd<FullTransaction[]>> {
    // First part: Amazon Transactions page, with high-level order data like number and dollar amount.
    const tab: chrome.tabs.Tab = await new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (result) => {
            resolve(result[0]);
        });
    });
    if (!tab.id) {
        return statusAnd.error('Could not get current tab.')
    }
    const transactionsPage = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getDocument,
        args: [],
    })
    if (!transactionsPage || !transactionsPage[0].result) {
        return statusAnd.error('Unable to get page HTML when scraping the Amazon page.')
    }
    const amazonHtml = transactionsPage[0].result
    const amazonTransactions = parseTransactions(amazonHtml);
    console.log(`Amazon Transactions: ${JSON.stringify(amazonTransactions)}`);
    if (!amazonTransactions.length) {
        return statusAnd.error('Found no Amazon transactions. Are you on the transactions page?')
    }

    // Next up: Orders page.
    const orders: OrderInfo[] = [];
    for (let i = 0; i < numOrders; i += 10) {
        const url = `https://www.amazon.com/your-orders/orders?_encoding=UTF8&ref=nav_orders_first&startIndex=${i}`
        await chrome.tabs.update({
            url
        });
        // A big hack: Sleep so the document has a chance to start loading.
        await new Promise(r => setTimeout(r, 1000));
        const ordersPage = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getDocument,
            args: []
        });
        const ordersHtml = ordersPage[0].result;
        const newOrders = parseOrders(ordersHtml);
        console.log(`Orders for page : ${JSON.stringify(newOrders)}`);
        if (!newOrders.length) {
            return statusAnd.error(`Found no Amazon orders from the Order page with index ${i} (0-indexed)`);
        }
        orders.push(...newOrders);
    }
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
            console.warn(`Could not find order information for transaction with order ${transaction.orderNumber}`);
            return;
        }
        transactions.push({ ...transaction, itemNames: order });
    });
    return statusAnd.ready(transactions);
}

chrome.runtime.onMessage.addListener(async (request: any, sender: chrome.runtime.MessageSender, _sendResponse: (v: any) => void): Promise<void> => {
    const amazonTransactions = await getAmazonInfo(request['num_orders']);
    if (statusAnd.isError(amazonTransactions)) {
        await chrome.runtime.sendMessage(amazonTransactions);
        return;
    }
    console.log(`Amazon Orders: ${JSON.stringify(amazonTransactions)}`);

    const accessToken = request['ynabAccessToken'];
    const ynabAPI = new ynab.API(accessToken);
    const budgetsResponse = await ynabAPI.budgets.getBudgets();
    const budgets = budgetsResponse.data.budgets;
    if (!budgets?.length) {
        await chrome.runtime.sendMessage(statusAnd.error('API call to get budgets was successful, but returned 0 budgets!'));
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
    if (!transactions?.data?.transactions?.length) {
        await chrome.runtime.sendMessage(statusAnd.error(`Found no uncategorized YNAB transactions.`));
        return;
    }
    console.log(`Got ${transactions.data.transactions.length} uncategorized transactions.`);

    const ynabAmazonTransactions = transactions.data.transactions.filter((t) => t.payee_name?.includes('Amazon'));
    if (!ynabAmazonTransactions.length) {
        await chrome.runtime.sendMessage(statusAnd.error(`Although we found ${transactions.data.transactions.length} uncategorized YNAB transactions, none of them were classified as being from Amazon.`));
        return;
    }
    console.log(`Got ${ynabAmazonTransactions.length} Amazon transactions!`);

    const toUpdate: ynab.SaveTransactionWithId[] = [];
    // For now, just match it up by amount. TODO: Make this more robust, e.g. by resolving duplicates by date.
    const amazonTransactionsMap = new Map(amazonTransactions.result.map((a) => [a.priceInCents, a]));
    ynabAmazonTransactions.forEach((ynabAmazonTransaction) => {
        // Lookup by amount (divide by 10 to convert from milliunits - https://api.ynab.com/#formats).
        const amazonTransaction = amazonTransactionsMap.get(ynabAmazonTransaction.amount / 10);
        if (!amazonTransaction) {
            console.warn(`Could not find amazon Transaction for YNAB transaction ${JSON.stringify(ynabAmazonTransaction)}`);
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
    await chrome.runtime.sendMessage(statusAnd.ready(`Successfully updated ${toUpdate.length} transaction(s)!`));
});