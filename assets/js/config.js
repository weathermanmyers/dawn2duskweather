/*
 * SITE CONFIG — the only file you normally need to edit.
 */
window.SITE_CONFIG = {
  siteName: "Dawn2Dusk Weather",

  /* ---------- Live stream (OBS → YouTube Live) ----------
   * Easiest: set youtubeChannelId (the "UC..." ID from YouTube Studio > Settings >
   * Channel > Advanced). The player then always shows whatever is live on the
   * channel, so you never have to update the page when a new stream starts.
   * Or set embedUrl to a specific embed link instead.
   */
  liveStream: {
    title: "Live Weather Coverage",
    youtubeChannelId: "",   // e.g. "UCxxxxxxxxxxxxxxxxxxxxxx"
    embedUrl: "",           // optional override
    autoplayMuted: true     // browsers only autoplay muted; viewers tap for sound
  },

  /* ---------- Auto-updating images (Lynx Web Scheduler output) ----------
   * Paste each image's public URL. For Dropbox, use the share link with
   * ?raw=1 at the end (not dl=0). The page re-downloads them every
   * refreshMinutes so viewers see the newest version without reloading.
   */
  refreshMinutes: 5,
  cacheBust: true,  // adds &t=<timestamp> so browsers don't show a stale copy

  images: [
    { title: "Current Temperatures", url: "", alt: "Current temperature map" },
    { title: "Dewpoints",            url: "", alt: "Dewpoint map" },
    { title: "Futurecast",           url: "", alt: "Future radar" },
    { title: "7-Day Forecast",       url: "", alt: "7-day forecast graphic" },
    { title: "SPC Outlook",          url: "", alt: "Storm Prediction Center outlook" },
    { title: "Rainfall",             url: "", alt: "Rainfall totals map" }
  ],

  /* ---------- Widgets (iframes) ----------
   * Paste each widget's iframe src (e.g. Baron/Velocity Weather widget URLs)
   * and the height it needs in pixels.
   */
  widgets: [
    { title: "Current Conditions", src: "", height: 360 },
    { title: "Interactive Radar",  src: "", height: 480 },
    { title: "Hourly and Daily Forecast", src: "", height: 480 }
  ],

  /* ---------- Google Ad Manager ----------
   * Leave networkCode blank until your account is approved. Ad unit paths
   * come from Ad Manager > Inventory > Ad units.
   */
  gam: {
    networkCode: "",  // e.g. "12345678"
    slots: [
      { divId: "ad-top",    adUnit: "weather_top",    sizes: [[728, 90], [320, 50]] },
      { divId: "ad-middle", adUnit: "weather_middle", sizes: [[728, 90], [300, 250]] },
      { divId: "ad-bottom", adUnit: "weather_bottom", sizes: [[728, 90], [300, 250]] }
    ]
  }
};
