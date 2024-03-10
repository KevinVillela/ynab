import { DOMParser, parseHTML } from 'linkedom/worker';

/** An Amazon transaction from the transactions page. */
export interface Transaction {
    orderNumber: string;
    payee: string;
    orderDate: Date;
    priceInCents: number;
}

/**
 * Parse all the transactions on the Amazon transactions page, like https://www.amazon.com/cpe/yourpayments/transactions.
 * 
 * @param html The HTML to parse.
 * @returns The parsed Transactions.
 */
export function parseTransactions(html: string): Transaction[] {
    const parsed = (new DOMParser).parseFromString(html, 'text/html');

    // Extract order information
    const orders: Transaction[] = [];

    // Find all transaction date containers
    const dateContainers = parsed.querySelectorAll(".apx-transaction-date-container");

    dateContainers.forEach((dateContainer: any) => {
        // Get order date
        const orderDateText = dateContainer.querySelector("span")!.textContent!.trim();
        const orderDate = new Date(orderDateText);

        const allOrdersOnDateContainer = dateContainer.nextElementSibling!.querySelectorAll(".apx-transactions-line-item-component-container")!;
        // const allOrdersOnDate = allOrdersOnDateContainer.querySelectorAll(".apx-transactions-line-item-component-container");

        allOrdersOnDateContainer.forEach((order: any) => {
            // Find the following line item container
            // const lineItemContainer = dateContainer.nextElementSibling!.querySelector()!;

            // Extract order details
            const orderNumberElement = order.querySelector("a")!;
            const orderNumber = orderNumberElement.textContent!.trim().replace('Order #', '');
            const priceElement = order.querySelector(".a-text-right span")!;

            const price = priceElement.textContent!.trim();
            // Remove the dollar symbol and decimal point
            const numericString = price.replace(/[^0-9-]/g, '');
            // Multiply by 100 to convert to pennies and ensure an integer
            const price_in_cents = parseInt(numericString, 10);
            const payeeElement = order.querySelectorAll("span")[2];
            if (!payeeElement) {
                // Some transactions don't have payee info, e.g. if you use an Amazon Gift Card elsewhere.
                // Ignore these for now.
                console.warn(`Ignoring transaction ${orderNumber} with no payee information.`);
                return;
            }
            const payee = payeeElement.textContent!.trim();

            // Add extracted information to the orders array
            orders.push({ orderNumber, orderDate, priceInCents: price_in_cents, payee });
        });
    });
    return orders;
}

/** Extracted order information. */
export interface OrderInfo {
    orderNumber: string;
    itemNames: string[];
}

/** Extract order information from the Orders HTML page. */
export function parseOrders(html: string): OrderInfo[] {
    const parsed = (new DOMParser).parseFromString(html, 'text/html');
    // Get all order cards on the page
    const orderCards = parsed.querySelectorAll(".order-card");

    // Initialize an empty array to store order information
    const orders: OrderInfo[] = [];

    // Loop through each order card
    orderCards.forEach((card: any) => {
        // Extract order number
        const orderNumberElement = card.querySelector(".yohtmlc-order-id span:nth-child(2)");
        const orderNumber = orderNumberElement ? orderNumberElement.textContent.trim() : "";

        // Extract item names
        const itemNames: string[] = [];
        const itemElements = card.querySelectorAll(".yohtmlc-product-title");
        itemElements.forEach((item: any) => {
            itemNames.push(item.textContent.trim());
        });

        // Add order information to the array
        orders.push({ orderNumber, itemNames });
    });

    // Return the array of order information
    return orders;
}

/** Transactions information, ready to send to YNAB. */
export interface FullTransaction {
    itemNames: string[];
    orderNumber: string;
    payee: string;
    orderDate: Date;
    priceInCents: number;
}