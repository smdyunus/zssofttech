/**
 * Shared validation + FormSubmit AJAX (vanilla JS).
 * Depends: window.ZS_FORMSUBMIT_EMAIL, optional window.ZS_STATIC_BASE
 */
(function () {
  var FORMSUBMIT_EMAIL =
    window.ZS_FORMSUBMIT_EMAIL || "info.zssoft@gmail.com";

  function ajaxEndpoint() {
    return (
      "https://formsubmit.co/ajax/" + encodeURIComponent(FORMSUBMIT_EMAIL)
    );
  }

  window.ZSFormCore = {
    ajaxEndpoint: ajaxEndpoint,

    validateName: function (v) {
      v = (v || "").trim();
      if (!v) return "Name is required.";
      if (!/^[a-zA-Z\s.'-]+$/.test(v))
        return "Use letters and spaces only.";
      return "";
    },

    validatePhone: function (v) {
      v = (v || "").replace(/\D/g, "");
      if (!v) return "Phone is required.";
      if (v.length !== 10) return "Enter exactly 10 digits.";
      if (!/^[6-9]/.test(v)) return "Enter a valid Indian mobile number.";
      return "";
    },

    validateEmail: function (v) {
      v = (v || "").trim();
      if (!v) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return "Enter a valid email address.";
      return "";
    },

    validateSelect: function (v) {
      if (v == null || String(v).trim() === "")
        return "Please select an option.";
      return "";
    },

    clearFieldErrors: function (form) {
      form.querySelectorAll(".form-group.is-invalid").forEach(function (g) {
        g.classList.remove("is-invalid");
      });
    },

    setFieldError: function (form, fieldName, message) {
      var group =
        form.querySelector(".form-group[data-field='" + fieldName + "']") ||
        form.querySelector("[name='" + fieldName + "']")?.closest(".form-group");
      if (!group) return;
      group.classList.add("is-invalid");
      var el = group.querySelector(".field-error");
      if (el) el.textContent = message;
    },

    validateForm: function (form, rules) {
      this.clearFieldErrors(form);
      var ok = true;
      rules.forEach((rule) => {
        var input = form.elements[rule.name];
        if (!input) return;
        var val =
          input.type === "checkbox" ? input.checked : input.value;
        var err = rule.validate(val, input);
        if (err) {
          this.setFieldError(form, rule.name, err);
          ok = false;
        }
      });
      return ok;
    },

    /**
     * Collect visible fields + FormSubmit meta. Copies user email to _replyto and _cc.
     */
    buildJsonBody: function (form, extra) {
      var fd = new FormData(form);
      var body = {};
      fd.forEach(function (val, key) {
        if (key.indexOf("_") === 0) return;
        body[key] = val;
      });
      var email = (fd.get("email") || "").trim();
      body._subject =
        (extra && extra.subject) ||
        form.getAttribute("data-email-subject") ||
        "ZS Soft Tech — Form submission";
      body._replyto = email;
      body._cc = email;
      body._captcha = "false";
      return body;
    },

    submitAjax: function (form, options) {
      options = options || {};
      var submitBtn = form.querySelector('[type="submit"]');
      var statusEl = form.querySelector(".form-status");

      function setStatus(msg, isError) {
        if (!statusEl) return;
        statusEl.textContent = msg || "";
        statusEl.classList.toggle("is-error", !!isError);
      }

      if (submitBtn) submitBtn.disabled = true;
      setStatus("Sending…", false);

      var body = this.buildJsonBody(form, {
        subject: options.subject,
      });

      return fetch(ajaxEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok)
              throw new Error(
                (data && data.message) || "Submission failed."
              );
            return data;
          });
        })
        .then(function () {
          setStatus("", false);
          var next =
            options.thankYouUrl ||
            form.getAttribute("data-thank-you") ||
            "thank-you.html";
          window.location.href = next;
        })
        .catch(function (err) {
          setStatus(err.message || "Something went wrong.", true);
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    },
  };
})();
