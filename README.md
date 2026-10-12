# Robotics.al — GitHub Pages

Bilingual static website (Albanian at `/`, English at `/en/`) for an Operations Intelligence pilot in development. Plain HTML/CSS/JavaScript; no build or runtime dependencies. Source: public `RoboticsAl/robotics-al-site`.

The custom domain is `robotics.al`. GitHub Pages deploys only `public/` from the `main` branch using `.github/workflows/pages.yml`. No Netlify or paid hosting service is configured.

## Contact status

Enquiries are temporarily closed because `info@robotics.al` is not yet receiving mail. The public site contains no working form or `mailto:` link and does not claim to collect contact details. Once a mailbox is configured and reception tested, restore the reviewed email-draft flow from commit `3768e11` and update both language pages and the privacy notice. The site remains `noindex` while contact and domain HTTPS are being finished.

## Local preview

```sh
python3 -m http.server 8000 --directory public --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ or `/en/`. Press Ctrl-C to stop. Browser refresh shows saved edits. No software installation needed.

## DNS cutover

GitHub Pages repository Settings → Pages already has `robotics.al` saved. Current public DNS is delegated to Netlify's `nsone.net` nameservers and the apex/www records still target Shopify. To use Cloudys DNS, first create the GitHub Pages records in Cloudys Manage DNS, preserve any unrelated records, then save the Cloudys nameservers at the registrar. See `docs/CURRENT_STATE.md` for baseline and validation.

Required A records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Required `www` CNAME: `roboticsal.github.io` (no repository path). Remove only conflicting Shopify A/AAAA/ALIAS/ANAME records for `@` and Shopify `www` records. Do not invent MX records; configure email separately with the selected provider. Preserve TXT/MX/CAA and any other unrelated records. Avoid wildcard DNS.

After delegation and Pages DNS checks complete, enable Enforce HTTPS in GitHub Pages. Verify `https://robotics.al/`, `/en/`, `/privacy/`, `https://www.robotics.al/` redirect and certificate validity. Leave `noindex` until the contact channel is operational and the owner approves general promotion.

## Editing

Edit both language pages together, keeping claims about proposed capabilities and pilot development accurate. GitHub Actions deploys each push to `main`. `git revert COMMIT` and push the revert to roll back; do not force-push.
