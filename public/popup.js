/**
 * Runs the UI for the applications. This file should be kept simple, and pass
 * any heavy lifting to the extension service worker.
 */

// When the popup loads, populate the YNAB Access token field with the stored
// value (if there is one).
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get("ynab_access_token").then((result) => {
        document.getElementById('ynab_access_token').value = result.ynab_access_token || '';
    });
});

// When the user clicks the Run button, send a message to the extension service 
// worker to start the transaction gathering process.
document.getElementById("run").addEventListener("click", async () => {
    const ynabAccessToken = document.getElementById('ynab_access_token').value;
    await chrome.storage.local.set({"ynab_access_token": ynabAccessToken});
    await chrome.runtime.sendMessage({ type: "run", ynabAccessToken });
    // The response will come in a different message (see addListener below).
});

// Listen for updates from the extension service worker.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == 'Success') {
        alert('Done! ' + message.message);
    }
});