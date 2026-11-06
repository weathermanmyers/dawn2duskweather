# Dawn2Dusk Weather — starter site

A static weather site for GitHub Pages: a live YouTube stream at the top, auto-refreshing map images from Lynx Web Scheduler, iframe widgets, and Google Ad Manager slots.

Almost everything is set in **`assets/js/config.js`**. Edit the HTML only to change wording.

## 1. Put it on GitHub Pages
1. Create a free GitHub account, then a new **public** repository (for example `weather-site`).
2. Click **Add file → Upload files** and drag in everything from this folder, including `.nojekyll` and the `assets` folder.
3. Go to **Settings → Pages**, set Source to **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. After a minute or two the site is live at `https://YOURNAME.github.io/weather-site/`.

## 2. Connect your domain
1. In **Settings → Pages → Custom domain**, enter your domain (e.g. `www.yourdomain.com`) and save. GitHub adds a `CNAME` file for you.
2. At your registrar, add the DNS records GitHub shows: a `CNAME` for `www` pointing to `YOURNAME.github.io`, plus the four `A` records for the bare domain.
3. When the domain check passes, tick **Enforce HTTPS**.

`ads.txt` only counts at the root of a domain, so step 2 is required before applying to Ad Manager.

## 3. Live stream (OBS → YouTube Live)
Set `liveStream.youtubeChannelId` in `config.js`. The player always shows whatever is currently live on that channel, so a new stream doesn't require any change to the site. It autoplays muted, because browsers block autoplay with sound.

## 4. Lynx images
Have Web Scheduler export each product to a public location, such as a Dropbox folder synced on the Lynx machine. In Dropbox, copy each file's share link and change the ending to `?raw=1`. Paste the links into `images` in `config.js`.

Keep exporting to the **same filename** so the link never changes. The page re-checks every `refreshMinutes` and swaps in the new image without reloading.

## 5. Widgets
Paste each widget's iframe `src` into `widgets` in `config.js`, and adjust `height` until it fits without scrollbars.

## 6. Google Ad Manager
1. In `ads.txt`, replace `pub-0000000000000000` with your publisher ID.
2. After approval, set `gam.networkCode` and the ad unit names in `config.js`. The "Ad space" placeholders become real ads automatically.

Before applying: replace the placeholder text on the About, Contact and Privacy pages, use your real contact email, and write some original forecast content. Sites that are mostly placeholders tend to be rejected.

## Files
- `index.html` — home page
- `about.html`, `contact.html`, `privacy.html`, `404.html`
- `ads.txt` — required by Ad Manager
- `assets/js/config.js` — your settings
- `assets/js/site.js` — refresh, stream and ad logic (no need to edit)
- `assets/css/style.css` — look and feel
