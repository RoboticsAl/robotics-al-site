/* Robotics.al — enquiry form. Posts to Netlify Forms (form name "pilot-enquiry").
   Success is shown ONLY when the server answers with an OK status.
   Without JavaScript the form still posts natively (browser validation + redirect to /thank-you/). */
(function () {
  "use strict";
  var form = document.getElementById("enquiry-form");
  if (!form) return;
  form.noValidate = true; // we show our own accessible messages

  var msg = document.getElementById("form-status");
  var btn = document.getElementById("send-btn");
  var T = form.dataset;

  function showMsg(text, kind) {
    msg.textContent = text;
    msg.className = "status-msg show" + (kind ? " " + kind : "");
  }
  function fields() {
    return Array.prototype.slice.call(form.querySelectorAll("input:not([type=hidden]):not([name=bot-field]), select, textarea"));
  }
  function validateAll() {
    var firstBad = null;
    fields().forEach(function (el) {
      var err = document.getElementById("err-" + el.id);
      var ok = el.checkValidity();
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (err) err.textContent = ok ? "" : (el.type === "email" && el.value ? T.errEmail : T.errRequired);
      if (!ok && !firstBad) firstBad = el;
    });
    return firstBad;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = validateAll();
    if (bad) { showMsg(T.errSummary, "warn"); bad.focus(); return; }

    btn.disabled = true; btn.textContent = T.sending;
    showMsg(T.sending, "");
    var body = new URLSearchParams(new FormData(form)).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      form.reset();
      showMsg(T.success, "ok");
      msg.focus();
    }).catch(function () {
      showMsg(T.errSend, "warn");
      msg.focus();
    }).then(function () {
      btn.disabled = false; btn.textContent = T.send;
    });
  });

  fields().forEach(function (el) {
    el.addEventListener("input", function () {
      if (el.getAttribute("aria-invalid") === "true" && el.checkValidity()) {
        el.setAttribute("aria-invalid", "false");
        var err = document.getElementById("err-" + el.id);
        if (err) err.textContent = "";
      }
    });
  });
})();
