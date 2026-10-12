/* Robotics.al — enquiry form helper. No network requests, no cookies, no tracking.
   The form builds an email draft in the visitor's own mail app, or lets them copy the text.
   Nothing is "sent" by this script. */
(function () {
  "use strict";

  // Verified enquiry recipient. Leave empty until the owner confirms the address.
  var ENQUIRY_EMAIL = "";

  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var msg = document.getElementById("form-status");
  var preview = document.getElementById("preview");
  var previewText = document.getElementById("preview-text");
  var T = form.dataset;

  function showMsg(text, warn) {
    msg.textContent = text;
    msg.className = "status-msg show" + (warn ? " warn" : "");
  }

  function controls() {
    return Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));
  }

  function validateAll() {
    var firstBad = null;
    controls().forEach(function (el) {
      var err = document.getElementById("err-" + el.id);
      var ok = el.checkValidity();
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (err) err.textContent = ok ? "" : (el.type === "email" && el.value ? T.errEmail : T.errRequired);
      if (!ok && !firstBad) firstBad = el;
    });
    return firstBad;
  }

  function labelFor(el) {
    if (el.dataset.label) return el.dataset.label;
    var l = form.querySelector('label[for="' + el.id + '"]');
    return l ? l.textContent.replace(/\s*\*\s*$/, "").trim() : el.name;
  }

  function valueOf(el) {
    if (el.type === "checkbox") return el.checked ? T.yes : T.no;
    if (el.tagName === "SELECT") return el.value ? el.options[el.selectedIndex].text : "";
    return el.value.trim();
  }

  function buildBody() {
    var lines = [T.intro, ""];
    controls().forEach(function (el) {
      var v = valueOf(el);
      if (v) lines.push(labelFor(el) + ": " + v);
    });
    return lines.join("\n");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = validateAll();
    if (bad) { showMsg(T.errSummary, true); bad.focus(); return; }

    var body = buildBody();
    previewText.value = body;
    preview.className = "preview show";

    if (!ENQUIRY_EMAIL) {
      showMsg(T.noEmail, true);
      return;
    }
    var url = "mailto:" + ENQUIRY_EMAIL + "?subject=" + encodeURIComponent(T.subject) +
              "&body=" + encodeURIComponent(body);
    showMsg(T.opened, false);
    window.location.href = url;
  });

  var copyBtn = document.getElementById("copy-btn");
  copyBtn.addEventListener("click", function () {
    var bad = validateAll();
    if (bad) { showMsg(T.errSummary, true); bad.focus(); return; }
    var body = buildBody();
    previewText.value = body;
    preview.className = "preview show";
    function fallback() {
      previewText.focus(); previewText.select();
      showMsg(T.copyManual, true);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(body).then(function () { showMsg(T.copied, false); }, fallback);
    } else { fallback(); }
  });

  // Clear an error as soon as the visitor fixes the field.
  controls().forEach(function (el) {
    el.addEventListener("input", function () {
      if (el.getAttribute("aria-invalid") === "true" && el.checkValidity()) {
        el.setAttribute("aria-invalid", "false");
        var err = document.getElementById("err-" + el.id);
        if (err) err.textContent = "";
      }
    });
  });
})();
