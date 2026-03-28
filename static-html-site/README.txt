ZS Soft Tech — static HTML + FormSubmit (vanilla JS)
====================================================

Yes, you can use this approach: FormSubmit is fine for simple static sites.
Confirm on https://formsubmit.co that AJAX + _cc / _replyto behave as you expect
(some features may depend on their current docs / plan).

HOW TO RUN (required — fetch() will fail on file://)
----------------------------------------------------
From this folder:

  npx --yes serve .

Then open http://localhost:3000 (or the port shown).

FILES
-----
  index.html              — enquiry form + course grid + modal triggers
  thank-you.html          — post-submit redirect target
  css/main.css            — layout, modal, validation, responsive
  components/header.html  — header fragment
  components/footer.html  — footer fragment
  components/course-cards.html — courses + Register buttons (single source of truth)
  components/include-*.js — load fragments with cache-busting query string
  js/form-core.js         — validation + FormSubmit AJAX
  js/registration-modal.js — modal + delegated [data-open-registration]

EMAIL
-----
  Set window.ZS_FORMSUBMIT_EMAIL in each page (or one shared config script).
  Default: zssofttech@gmail.com

  Activate the address once at FormSubmit (they send a confirmation link).

NEXT.JS SITE
------------
This folder is separate from the main Next.js app in the repo. Deploy it as
static files (any host) or copy into /public only if paths are adjusted.
