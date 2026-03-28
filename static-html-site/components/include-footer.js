(function () {
  function base() {
    return typeof window.ZS_STATIC_BASE === "string" ? window.ZS_STATIC_BASE : "";
  }

  function load() {
    var mount = document.querySelector("[data-include-footer]");
    if (!mount) return;
    var url =
      base() +
      "components/footer.html?v=" +
      encodeURIComponent(String(Date.now()));
    fetch(url, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("Footer include failed");
        return r.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
        mount.classList.add("site-footer");
        mount.querySelectorAll("[data-year]").forEach(function (el) {
          el.textContent = String(new Date().getFullYear());
        });
      })
      .catch(function (e) {
        console.error(e);
        mount.innerHTML = "<div class=\"inner\">ZS Soft Tech</div>";
        mount.classList.add("site-footer");
      });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", load);
  else load();
})();
