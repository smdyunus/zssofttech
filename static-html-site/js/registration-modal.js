/**
 * Modal registration form + delegated [data-open-registration] triggers.
 * Requires: form-core.js, include-courses.js (for select options), main.css
 */
(function () {
  var core = window.ZSFormCore;
  if (!core) {
    console.error("registration-modal.js: load form-core.js first");
    return;
  }

  var MODAL_ID = "zs-registration-modal";

  function ensureModal() {
    if (document.getElementById(MODAL_ID)) return;

    var html =
      '<div class="modal-backdrop" id="' +
      MODAL_ID +
      '" role="dialog" aria-modal="true" aria-labelledby="zs-reg-title" hidden>' +
      '<div class="modal">' +
      '<div class="modal-header">' +
      '<h2 id="zs-reg-title">Course registration</h2>' +
      '<button type="button" class="modal-close" data-close-registration aria-label="Close">&times;</button>' +
      "</div>" +
      '<div class="modal-body">' +
      '<form id="zs-registration-form" class="registration-form" novalidate data-email-subject="ZS Soft Tech — Course registration" data-thank-you="thank-you.html">' +
      '<div class="form-group" data-field="name">' +
      "<label for=\"zs-reg-name\">Full name *</label>" +
      '<input id="zs-reg-name" name="name" type="text" autocomplete="name" />' +
      '<p class="field-error"></p>' +
      "</div>" +
      '<div class="form-group" data-field="phone">' +
      "<label for=\"zs-reg-phone\">Phone *</label>" +
      '<input id="zs-reg-phone" name="phone" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel" />' +
      '<p class="field-error"></p>' +
      "</div>" +
      '<div class="form-group" data-field="email">' +
      "<label for=\"zs-reg-email\">Email *</label>" +
      '<input id="zs-reg-email" name="email" type="email" autocomplete="email" />' +
      '<p class="field-error"></p>' +
      "</div>" +
      '<div class="form-group" data-field="course">' +
      "<label for=\"zs-reg-course\">Course *</label>" +
      '<select id="zs-reg-course" name="course" data-course-options data-placeholder="Select course"></select>' +
      '<p class="field-error"></p>' +
      "</div>" +
      '<div class="form-group" data-field="message">' +
      "<label for=\"zs-reg-message\">Message</label>" +
      '<textarea id="zs-reg-message" name="message" rows="3"></textarea>' +
      '<p class="field-error"></p>' +
      "</div>" +
      '<p class="form-status"></p>' +
      '<button type="submit" class="btn btn-primary">Submit registration</button>' +
      "</form>" +
      "</div>" +
      "</div>" +
      "</div>";

    document.body.insertAdjacentHTML("beforeend", html);
    var backdrop = document.getElementById(MODAL_ID);

    function openModal(preselectCourse) {
      backdrop.hidden = false;
      requestAnimationFrame(function () {
        backdrop.classList.add("is-open");
      });
      document.body.style.overflow = "hidden";
      var form = document.getElementById("zs-registration-form");
      if (preselectCourse && form && form.elements.course) {
        form.elements.course.value = preselectCourse;
      }
      var first = form && form.querySelector("input,select,textarea");
      if (first) first.focus();
    }

    function closeModal() {
      backdrop.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () {
        backdrop.hidden = true;
      }, 250);
    }

    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeModal();
    });

    backdrop
      .querySelector("[data-close-registration]")
      .addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && backdrop.classList.contains("is-open"))
        closeModal();
    });

    function syncModalCourseSelect() {
      var pairs = window.ZS_COURSE_PAIRS;
      var sel = document.getElementById("zs-reg-course");
      if (!sel || !pairs || !pairs.length) return;
      sel.innerHTML = "";
      var opt0 = document.createElement("option");
      opt0.value = "";
      opt0.textContent = "Select course";
      sel.appendChild(opt0);
      pairs.forEach(function (p) {
        var o = document.createElement("option");
        o.value = p.value;
        o.textContent = p.label;
        sel.appendChild(o);
      });
    }
    syncModalCourseSelect();
    document.addEventListener("zs:courses-loaded", syncModalCourseSelect);

    document
      .getElementById("zs-registration-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        var form = e.target;
        var rules = [
          {
            name: "name",
            validate: function (v) {
              return core.validateName(v);
            },
          },
          {
            name: "phone",
            validate: function (v) {
              return core.validatePhone(v);
            },
          },
          {
            name: "email",
            validate: function (v) {
              return core.validateEmail(v);
            },
          },
          {
            name: "course",
            validate: function (v) {
              return core.validateSelect(v);
            },
          },
          {
            name: "message",
            validate: function () {
              return "";
            },
          },
        ];
        if (!core.validateForm(form, rules)) return;
        core.submitAjax(form, {
          subject: "ZS Soft Tech — Course registration",
          thankYouUrl: form.getAttribute("data-thank-you") || "thank-you.html",
        });
      });

    window.ZSRegistrationModal = { open: openModal, close: closeModal };
  }

  document.body.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-open-registration]");
    if (!btn) return;
    e.preventDefault();
    ensureModal();
    var card = btn.closest("[data-course-option]");
    var pre = card ? card.getAttribute("data-value") : null;
    window.ZSRegistrationModal.open(pre || "");
  });

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", ensureModal);
  else ensureModal();
})();
