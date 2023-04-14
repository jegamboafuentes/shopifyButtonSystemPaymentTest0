document.addEventListener("DOMContentLoaded", function () {
    // Display credits
    chrome.storage.sync.get(["credits"], function (result) {
      if (result.credits === undefined) {
        chrome.storage.sync.set({ credits: 20 }); // Set trial credits
        document.getElementById("credits").innerText = 20;
      } else {
        document.getElementById("credits").innerText = result.credits;
      }
    });
  
    // Use credit button
  document.getElementById("useCredit").addEventListener("click", function () {
    chrome.storage.sync.get(["credits"], function (result) {
      if (result.credits > 0) {
        chrome.storage.sync.set({ credits: result.credits - 1 }, function () {
          document.getElementById("credits").innerText = result.credits - 1;
        });
      } else {
        alert("No credits left. Please purchase more credits.");
      }
    });
  });

  // Shopify Buy Button
  ShopifyBuyInit();
});

function ShopifyBuyInit() {
  var client = ShopifyBuy.buildClient({
    domain: "your-shopify-store.myshopify.com",
    storefrontAccessToken: "your-storefront-access-token",
  });

  ShopifyBuy.UI.onReady(client).then(function (ui) {
    ui.createComponent("product", {
      id: "your-product-id",
      node: document.getElementById("shopifyBuyButton"),
      options: {
        // Customize your Buy Button options here
      },
    });
  });
}