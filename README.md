# robotics.al — V1 landing page

Bilingual (Albanian default, English at `/en/`) static site for the **Operations Intelligence** pilot validation. Plain HTML/CSS/vanilla JS. No build step, no cookies, no analytics, no third-party requests.

## Structure
```
index.html            Albanian home (default, robotics.al/)
en/index.html         English home
privacy/index.html    Albanian privacy notice
en/privacy/index.html English privacy notice
assets/css/styles.css Shared styles
assets/js/site.js     Enquiry form logic (validation, email draft, copy)
assets/img/           Favicon
404.html  robots.txt  sitemap.xml  CNAME  .nojekyll
```

## Editing copy
Edit the HTML directly. Keep the Albanian and English pages in step (same sections, same IDs). Language links work without JavaScript.

## Enquiry form
GitHub Pages cannot receive form submissions. The form builds an email draft in the visitor's own mail app (they must press Send) and offers "Copy enquiry". It never reports a message as sent.
Set the recipient in `assets/js/site.js` (`ENQUIRY_EMAIL`). While empty, the form only shows/copies the text. To switch to a form service (e.g. Formspree) later, review its privacy terms and pricing first, then update the privacy notice.

## Preview locally
```
python3 -m http.server 8000     # then open http://localhost:8000/
```

## Publish
Hosting: GitHub Pages, deploy from branch `main`, folder `/ (root)`, custom domain `robotics.al` (the `CNAME` file must contain exactly `robotics.al`).
```
git add -A && git commit -m "describe change" && git push
```
Pages redeploys in about a minute.

## Roll back
```
git revert <bad-commit-hash>   # creates a new commit undoing it
git push
```
(Find hashes with `git log --oneline`.) Never force-push to `main`.

## Before going live
- Fill the owner placeholders (highlighted) in both privacy pages: data controller/contact, retention.
- Set `ENQUIRY_EMAIL`.
- DNS: see the DNS plan; do not change nameservers; keep MX/TXT records.
