// App Store-lenken, ett sted. Til appen er ute står knappene som «Coming soon on the App Store»
// uten lenke. Lim inn adressen fra App Store Connect her (https://apps.apple.com/app/id…),
// så blir alle knapper med data-store en lenke til butikken.
var APP_STORE_URL = "";

(function () {
  if (!APP_STORE_URL) return;
  var buttons = document.querySelectorAll("[data-store]");
  for (var i = 0; i < buttons.length; i++) {
    var b = buttons[i];
    var a = document.createElement("a");
    a.className = b.className.replace(" soon", "");
    a.href = APP_STORE_URL;
    a.textContent = b.hasAttribute("data-short") ? "App Store" : "Download on the App Store";
    b.parentNode.replaceChild(a, b);
  }
})();
