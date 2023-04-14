chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    if (request.type === "orderCompleted") {
      chrome.storage.sync.get(["credits"], function (result) {
        let newCredits = result.credits + 10;
        chrome.storage.sync.set({ credits: newCredits }, function () {
          console.log("Credits updated.");
        });
      });
    }
  });
  