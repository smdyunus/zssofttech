(function () {
  function base() {
    return typeof window.ZS_STATIC_BASE === "string" ? window.ZS_STATIC_BASE : "";
  }

  function load() {
    var mount = document.querySelector("[data-include-header]");
    if (!mount) return;
    var url =
      base() +
      "components/header.html?v=" +
      encodeURIComponent(String(Date.now()));
    fetch(url, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("Header include failed");
        return r.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
        mount.classList.add("site-header");
      })
      .catch(function (e) {
        console.error(e);
        mount.innerHTML =
          "<div class=\"inner\"><strong>ZS Soft Tech</strong></div>";
        mount.classList.add("site-header");
      });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", load);
  else load();
})();
