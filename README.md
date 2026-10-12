# robotics.al — V1 landing page

Bilingual (Albanian default at `/`, English at `/en/`) static site for the **Operations Intelligence** pilot validation. Plain HTML/CSS/vanilla JS. No build step, no cookies, no analytics, no third-party requests.

## Layout
```
netlify.toml          Netlify config: publish dir + security headers (not published)
README.md             This file (not published)
public/               Everything in here is the website (publish directory)
  index.html          Albanian home            en/index.html          English home
  privacy/            Albanian privacy notice  en/privacy/            English privacy notice
  thank-you/          Albanian confirmation    en/thank-you/          English confirmation
  assets/css|js|img/  Styles, form script, favicon, og-sq.png / og-en.png social previews
  404.html robots.txt sitemap.xml
```
Only `public/` is served, so the README, `netlify.toml` and `.git` are never exposed.

## Preview locally — use HTTP, not file://
Directory links such as `en/` only work over HTTP. Opening the folder via `file://` shows a directory listing.
```
cd public && python3 -m http.server 8000     # then open http://localhost:8000/
```
(The form POST cannot succeed locally: the Python server rejects it, and the page correctly shows an error, not a success.)

## Deployment pipeline (Netlify)
GitHub (private repo `RoboticsAl/robotics-al-site`, branch `main`) → Netlify auto-deploys on every push. No build command; publish directory `public`.
- Edit copy in the HTML files (keep Albanian and English in step: same sections, IDs and form field names).
- Publish: `git add -A && git commit -m "describe change" && git push` → live in about a minute.
- Roll back: `git revert <bad-commit>` then `git push` (or in Netlify → Deploys → pick an earlier deploy → "Publish deploy"). Never force-push `main`.
- DNS stays at the registrar (`app.cloudys.com`); keep the existing nameservers and all email records.

## Enquiry form (Netlify Forms)
Form name `pilot-enquiry`, identical field names in both languages (`name, email, business, city, facility_type, challenge, rooms, monthly_spend, monitoring, role, timeline, details, consent`) plus hidden `language`, and a honeypot (`bot-field`). The script posts the form and shows success only on an OK response; with JavaScript off the form posts natively and lands on `/thank-you/`.
After the first deploy, set in Netlify: **Forms → Form notifications → Email notification** to the owner's verified address. Submissions live in Netlify → Forms → `pilot-enquiry`.

### Retention and deletion procedure
- Enquiries that do not progress are deleted within 90 days of receipt: monthly, open Netlify → Forms → Submissions, delete entries older than 90 days, and delete the matching notification emails.
- A data-subject deletion request: delete the submission in Netlify and the notification email; reply to confirm.

## Launch checklist (staging is intentionally `noindex`)
1. Owner confirms the data controller name and privacy contact; replace the highlighted placeholder in both `privacy/` pages.
2. Owner approves the 90-day retention wording.
3. Set the Netlify notification email.
4. Remove `<meta name="robots" content="noindex, nofollow">` from the home, privacy and 404-independent pages (keep it on the two `thank-you/` pages).
5. Add `robotics.al` as a custom domain in Netlify, then (with owner approval) update DNS at the registrar as shown in Netlify's domain panel.
6. Do not collect real enquiries before steps 1–3 are done.
