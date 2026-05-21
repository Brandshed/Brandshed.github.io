# Brandshed v1 — Handover Notes

These six files are the v1 brochure site, ready to push to GitHub Pages.

## Files in this drop

| File | What it is |
|---|---|
| `index.htm` | Homepage (existing design + SEO + working contact form + Cal.com link) |
| `style.css` | Untouched — no changes from Christo's original |
| `script.js` | Updated contact form handler (real Web3Forms submission) + auto-year footer |
| `robots.txt` | Tells search engines they can index the site |
| `sitemap.xml` | Lists the homepage for Google to crawl |
| `404.html` | Branded "page not found" — replaces GitHub Pages' default ugly one |

## What changed vs. the original

### `index.htm`
- Replaced the entire `<head>` with full SEO/social-share meta tags, structured data (JSON-LD for LocalBusiness/ProfessionalService), favicon links, geo tags
- Cut Google Fonts to 2 weights of each font (Fraunces 400/600, Outfit 400/600) — saves ~400KB on first paint
- Added Cal.com booking button to contact section
- Fixed contact section: real `hello@brandshed.co.za` email (was `launchpadSA.co.za`), placeholder phone, Hermanus location
- Wired contact form to Web3Forms (was a fake `alert()` before)
- Fixed footer: "brand**shed**" instead of "launch**pad**", real social/email links, auto-updating copyright year

### `script.js`
- Replaced the fake `alert()` form handler with a real fetch-based POST to Web3Forms
- Added a polite "Sending…" state on the submit button
- Added inline success/error message instead of browser `alert()`
- Auto-fills the current year in the footer

### Files unchanged
- `style.css` — no changes needed for v1

## Placeholders that need real values

Before pushing to live, these placeholders in `index.htm` must be replaced. Search for `YOUR-` or `XXX` to find them.

| Placeholder | Where | What to replace with |
|---|---|---|
| `YOUR-WEB3FORMS-ACCESS-KEY` | `index.htm` line ~155 (in the contact form `<input type="hidden">`) | Real access key from web3forms.com (Jen will sign up and send) |
| `YOUR-CAL-USERNAME/discovery` | `index.htm` line ~135 (Cal.com booking button `href`) | Real Cal.com link e.g. `cal.com/jen-brandshed/discovery` |
| `028 XXX XXXX` | `index.htm` contact section visible text | Real 028 (Hermanus) virtual number once purchased |
| `+27XXXXXXXXX` | `index.htm` `tel:` and `wa.me/` links (3 places: contact section + footer) | Real number in international format e.g. `+27281234567` |
| `brandshed-social.jpg` | OG image, multiple `<meta>` tags + JSON-LD | A 1200×630px branded social share image (Jen designing) |
| `favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, `site.webmanifest` | Favicon files in repo root | Branded favicon set (Jen designing) |
| `instagram.com/brandshed.co.za` and `facebook.com/brandshed.co.za` | Contact section + footer | Real social handles once created (or remove the icons if not on those platforms yet) |

The site will work and deploy fine before all placeholders are filled in — but the contact form won't actually send messages until the Web3Forms key is in, and the Cal.com button will 404 until the link is real. Everything else is cosmetic / nice-to-have.

## Deploy steps (Christo)

If using GitHub Pages like Bangarang:

1. Create a new GitHub repo: `brandshed` (private or public, your call)
2. Drop all six files in the repo root
3. Commit and push to `main`
4. In repo Settings → Pages → set source to `Deploy from a branch` → `main` → `/ (root)` → save
5. Add custom domain `brandshed.co.za` in Pages settings
6. In Afrihost ClientZone, point the DNS:
   - Either: change nameservers (more work but cleaner long-term)
   - Or simpler: add 4 A records pointing to GitHub Pages' IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a CNAME for `www` pointing to `YOUR-USERNAME.github.io`
7. Wait for HTTPS cert to issue (5-15 minutes)
8. Test the site loads on `https://brandshed.co.za`

## Test checklist after deploy

- [ ] Site loads on `https://brandshed.co.za` and `https://www.brandshed.co.za`
- [ ] HTTPS padlock shows (no security warnings)
- [ ] Mobile menu works
- [ ] Scroll animations trigger
- [ ] Recommendation quiz works
- [ ] Contact form submits successfully (after Web3Forms key is in) and you receive the email at hello@brandshed.co.za
- [ ] Cal.com booking button opens the right calendar (after link is in)
- [ ] Phone link opens dialer on mobile
- [ ] Email link opens mail client
- [ ] Share the URL on WhatsApp — preview shows the right title, description, and image (after social image is in)
- [ ] PageSpeed Insights mobile score is 85+ (https://pagespeed.web.dev/)
- [ ] Visit `/some-fake-page` — gets the branded 404, not GitHub's default

## Known v1 limitations (v2 fixes these)

- Single page architecture (no separate /about, /services, /blog routes)
- No newsletter signup (MailerLite)
- No FAQ chatbot (Crisp)
- No blog
- No lead magnet pages
- The "recommendation quiz" doesn't capture email — it just shows a result
- Care Plans (Watch/Tend/Grow recurring revenue tiers) not yet on the site

These are deliberately deferred — v2 = Astro rebuild with proper architecture.
