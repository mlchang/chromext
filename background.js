chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "popup-click":
            // execute the content script
            chrome.tabs.executeScript(null, { // defaults to the current tab
                file: "contentscript.js", // script to inject into page and run in sandbox
                allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
            });
            sendResponse({}); // sending back empty response to sender
            break;
        default:
        }
    }
);