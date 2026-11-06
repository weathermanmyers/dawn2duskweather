(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var refreshMs = Math.max(1, C.refreshMinutes || 5) * 60 * 1000;

  function bust(url) {
    if (!url || C.cacheBust === false) return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "t=" + Date.now();
  }

  function timeNow() {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  /* ---------- Auto-updating image cards ---------- */
  function buildCard(item, isHero) {
    var card = el("figure", isHero ? "card hero-card" : "card");
    var frame = el("div", "frame");
    var cap = el("figcaption");
    var title = el("span", "card-title", item.title || "");
    var stamp = el("span", "stamp", item.url ? "Loading…" : "Not configured");
    cap.appendChild(title);
    cap.appendChild(stamp);

    if (!item.url) {
      frame.appendChild(el("div", "placeholder", "Add this image's URL in assets/js/config.js"));
      card.appendChild(frame);
      card.appendChild(cap);
      return card;
    }

    var img = new Image();
    img.alt = item.alt || item.title || "";
    img.decoding = "async";
    frame.appendChild(img);
    card.appendChild(frame);
    card.appendChild(cap);

    function load() {
      // Preload off-screen, then swap, so the visible image never flashes blank.
      var next = new Image();
      next.onload = function () {
        img.src = next.src;
        stamp.textContent = "Updated " + timeNow();
        card.classList.remove("is-error");
      };
      next.onerror = function () {
        stamp.textContent = img.src ? "Showing last good image" : "Image unavailable";
        card.classList.add("is-error");
      };
      next.src = bust(item.url);
    }
    load();
    setInterval(load, refreshMs);
    return card;
  }

  var grid = document.getElementById("image-grid");
  if (grid && C.images) C.images.forEach(function (i) { grid.appendChild(buildCard(i, false)); });

  /* ---------- Live stream (YouTube) ---------- */
  var live = C.liveStream || {};
  var liveSlot = document.getElementById("live-slot");
  if (liveSlot) {
    var src = live.embedUrl ||
      (live.youtubeChannelId ? "https://www.youtube.com/embed/live_stream?channel=" + encodeURIComponent(live.youtubeChannelId) : "");
    if (!src) {
      liveSlot.appendChild(el("div", "placeholder", "Add your YouTube channel ID in assets/js/config.js"));
    } else {
      if (live.autoplayMuted !== false) src += (src.indexOf("?") === -1 ? "?" : "&") + "autoplay=1&mute=1&playsinline=1";
      var f = document.createElement("iframe");
      f.src = src;
      f.title = live.title || "Live weather stream";
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      f.referrerPolicy = "strict-origin-when-cross-origin";
      liveSlot.appendChild(f);
    }
  }

  /* ---------- Widgets (iframes) ---------- */
  var wGrid = document.getElementById("widget-grid");
  if (wGrid && C.widgets) {
    C.widgets.forEach(function (w) {
      var card = el("figure", "card widget-card");
      var cap = el("figcaption");
      cap.appendChild(el("span", "card-title", w.title || ""));
      card.appendChild(cap);
      if (!w.src) {
        card.appendChild(el("div", "placeholder", "Add this widget's iframe URL in assets/js/config.js"));
      } else {
        var wf = document.createElement("iframe");
        wf.src = w.src;
        wf.title = w.title || "Weather widget";
        wf.loading = "lazy";
        wf.style.height = (w.height || 400) + "px";
        card.appendChild(wf);
      }
      wGrid.appendChild(card);
    });
  }

  /* ---------- Footer year / site name ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Google Ad Manager ---------- */
  var gam = C.gam || {};
  if (!gam.networkCode) return; // ad slots stay as labeled placeholders

  document.documentElement.classList.add("ads-on");
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
  document.head.appendChild(s);

  window.googletag = window.googletag || { cmd: [] };
  googletag.cmd.push(function () {
    (gam.slots || []).forEach(function (slot) {
      if (!document.getElementById(slot.divId)) return;
      googletag
        .defineSlot("/" + gam.networkCode + "/" + slot.adUnit, slot.sizes, slot.divId)
        .addService(googletag.pubads());
    });
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.enableServices();
    (gam.slots || []).forEach(function (slot) {
      if (document.getElementById(slot.divId)) googletag.display(slot.divId);
    });
  });
})();
