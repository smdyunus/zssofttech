/**
 * Loads course-cards.html into [data-include-course-cards] and
 * populates every <select data-course-options> from [data-course-option] entries.
 */
(function () {
  function base() {
    return typeof window.ZS_STATIC_BASE === "string" ? window.ZS_STATIC_BASE : "";
  }

  function parseOptions(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var nodes = doc.querySelectorAll("[data-course-option]");
    var pairs = [];
    nodes.forEach(function (el) {
      var value = el.getAttribute("data-value");
      var h3 = el.querySelector("h3");
      var label = h3 ? h3.textContent.trim() : value;
      if (value) pairs.push({ value: value, label: label });
    });
    return pairs;
  }

  function fillSelects(pairs) {
    document.querySelectorAll("select[data-course-options]").forEach(function (sel) {
      var placeholder = sel.getAttribute("data-placeholder") || "Select course";
      sel.innerHTML = "";
      var opt0 = document.createElement("option");
      opt0.value = "";
      opt0.textContent = placeholder;
      sel.appendChild(opt0);
      pairs.forEach(function (p) {
        var o = document.createElement("option");
        o.value = p.value;
        o.textContent = p.label;
        sel.appendChild(o);
      });
    });
  }

  function load() {
    var mount = document.querySelector("[data-include-course-cards]");
    if (!mount) {
      console.warn("[include-courses] Missing [data-include-course-cards]");
      return;
    }
    var url =
      base() +
      "components/course-cards.html?v=" +
      encodeURIComponent(String(Date.now()));
    fetch(url, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("Course fragment failed");
        return r.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
        var pairs = parseOptions(html);
        window.ZS_COURSE_PAIRS = pairs;
        fillSelects(pairs);
        window.dispatchEvent(
          new CustomEvent("zs:courses-loaded", { detail: { pairs: pairs } })
        );
      })
      .catch(function (e) {
        console.error(e);
        mount.innerHTML =
          "<p style=\"color:#f87171\">Could not load courses. Check path and server.</p>";
      });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", load);
  else load();
})();
