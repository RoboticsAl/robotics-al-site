# Robotics.al — GitHub Pages

Bilingual static website (Albanian at `/`, English at `/en/`) for an Operations Intelligence pilot in development. Plain HTML/CSS/JavaScript; no build or runtime dependencies.

Source and version history: `RoboticsAl/robotics-al-site` (public).
Staging URL: https://roboticsal.github.io/robotics-al-site/

Only `public/` is uploaded by `.github/workflows/pages.yml`. Every push to `main` deploys through GitHub Actions. No Netlify, server, database, analytics or subscription is configured. The website prepares an email draft to `info@robotics.al`; the visitor reviews and sends it from their email app. It never claims successful delivery. Long drafts use copy/paste. No JavaScript: visitors can email the visible contact directly.

## Local preview

```sh
python3 -m http.server 8000 --directory public --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ or `/en/`. Press Ctrl-C to stop. Browser refresh shows saved edits. No software installation needed.

## Editing and publication

Edit `public/index.html` and `public/en/index.html` together, and both privacy pages if handling changes. Keep claims about pilot development and proposed capabilities accurate. No customer savings, installed systems or client results are verified here.

```sh
git add public README.md .github docs
git commit -m "Describe the website change"
git push origin main
```

GitHub → Actions → Deploy GitHub Pages reports deployment status. Roll back with `git revert COMMIT` and push the revert. Do not force-push.

## Domain and launch

The Pages staging site remains `noindex`. DNS and existing email records are unchanged. Before moving to `robotics.al`, confirm the mailbox receives mail, review public copy and privacy/contact details, approve the DNS plan, update canonical/social/sitemap/404 URLs, configure the Pages custom domain and verify HTTPS. Then remove staging `noindex` from the home and privacy pages. Existing thank-you URLs remain for compatibility but do not confirm delivery.

No automated email retention policy is implemented. The privacy text describes actual technical behavior; owner identity and mailbox handling need owner review before general promotion. GitHub logs IP addresses for security when serving Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection

## Verification

`docs/CURRENT_STATE.md` records the baseline, bounded migration and executed checks. Test fixtures use synthetic names and reserved `example.com` addresses. No real enquiries are sent.
