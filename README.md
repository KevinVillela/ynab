# ynabbb
Tools to help use YNAB better.

# Development

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install node

# From https://betterprogramming.pub/creating-chrome-extensions-with-typescript-914873467b65 -
# to get TypeScript to work with a Google Chrome extension.
npm install --save-dev webpack webpack-cli
npm install --save-dev copy-webpack-plugin
npm install --save-dev typescript ts-loader
npm install --save-dev @types/chrome

npm install ynab

# Make changes to the code, then run
npm run build
# You can also do `npm run build_dev` for an unminified development version.
```

Then, navigate to chrome://extensions. Make sure Developer Mode is activated.

Click Load Unpacked and target the `dist` folder in your project. Click the extension icon on the right side of the Chrome toolbar. And pin the extension to the toolbar. Finally, go to https://www.amazon.com/cpe/yourpayments/transactions and try the extension out.

If you get any errors, you can click `service worker` to see the Devtools window for the extension service worker, or right-click the extension button in Chrome and click `Inspect` to see the Devtools window for the popup. Note that extensions have the concept of contexts, and the context you execute some code in will be where the output is shown. This is important, e.g., when running executeScript, as the output will be shown in the Devtools window for the page instead of the extension.

## Running tests

To run all tests:

```bash
npm run test
```