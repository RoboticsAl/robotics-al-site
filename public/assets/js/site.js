/* GitHub Pages: prepare an email draft locally; the visitor reviews and sends it. */
(function () {
  'use strict';
  const form=document.getElementById('enquiry-form');if(!form)return;
  const en=document.documentElement.lang==='en',status=document.getElementById('form-status'),button=document.getElementById('send-btn'),preview=document.getElementById('email-preview'),body=document.getElementById('email-body'),open=document.getElementById('open-email');
  const fields=[...form.querySelectorAll('input:not([type=hidden]),select,textarea')];
  form.noValidate=true;button.type='submit';
  const message=(text,kind='')=>{status.textContent=text;status.className='status-msg show '+kind;};
  const invalidate=()=>{preview.hidden=true;preview.classList.remove('show');body.value='';open.href='mailto:info@robotics.al';status.className='status-msg';status.textContent='';};
  form.addEventListener('submit',event=>{
    event.preventDefault();invalidate();let first;
    for(const field of fields){const valid=field.checkValidity(),error=document.getElementById('err-'+field.id);field.setAttribute('aria-invalid',String(!valid));if(error)error.textContent=valid?'':field.type==='email'&&field.value?form.dataset.errEmail:form.dataset.errRequired;if(!valid&&!first)first=field;}
    if(first){message(form.dataset.errSummary,'warn');first.focus();return;}
    const lines=[en?'Robotics.al pilot enquiry':'Kërkesë për pilotin Robotics.al',''];
    for(const field of fields){if(!field.value||field.type==='checkbox'&&!field.checked)continue;const label=field.labels?.[0]?.textContent.replace(/\s+/g,' ').replace(/\s*\*\s*$/,'').trim()||field.name;const value=field.tagName==='SELECT'?field.selectedOptions[0].textContent:field.type==='checkbox'?(en?'Yes':'Po'):field.value;lines.push(label+': '+value);}
    lines.push('','Language: '+document.documentElement.lang);body.value=lines.join('\n');
    const href='mailto:info@robotics.al?subject='+encodeURIComponent(en?'Pilot enquiry — Robotics.al':'Kërkesë për pilot — Robotics.al')+'&body='+encodeURIComponent(body.value);
    open.hidden=href.length>1800;if(!open.hidden)open.href=href;
    preview.hidden=false;preview.classList.add('show');
    message(en?'Draft ready. Nothing has been sent. Review it below, then send it from your email app.':'Drafti është gati. Asgjë nuk është dërguar. Kontrollojeni më poshtë dhe dërgojeni nga aplikacioni juaj i emailit.');status.focus();
  });
  fields.forEach(field=>{const edited=()=>{invalidate();if(field.checkValidity()){field.setAttribute('aria-invalid','false');const error=document.getElementById('err-'+field.id);if(error)error.textContent='';}};field.addEventListener('input',edited);field.addEventListener('change',edited);});
  document.getElementById('copy-email').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(body.value);message(en?'Draft copied. Paste it into an email to info@robotics.al. Nothing has been sent.':'Drafti u kopjua. Ngjiteni në një email për info@robotics.al. Asgjë nuk është dërguar.');status.focus();}
    catch{body.focus();body.select();message(en?'Select and copy the draft, then paste it into your email app.':'Zgjidhni dhe kopjoni draftin, pastaj ngjiteni në aplikacionin e emailit.');}
  });
})();
