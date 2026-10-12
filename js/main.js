/* =====================================================================
   LA CIUDAD VELADA — Interacciones (JS vanilla, sin dependencias)
   Ver AI/02_DECISIONES.md (D-006, D-007)
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* -----------------------------------------------------------------
     LOADER
     ----------------------------------------------------------------- */
  function initLoader() {
    var loader = $("#loader");
    if (!loader) return;
    var start = Date.now();
    var MIN = reduceMotion ? 200 : 1400;

    function finish() {
      var wait = Math.max(0, MIN - (Date.now() - start));
      window.setTimeout(function () {
        document.body.classList.remove("is-loading");
        document.body.classList.add("loaded");
      }, wait);
    }

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    // Respaldo por si "load" ya no llega (imagenes pesadas colgadas)
    window.setTimeout(finish, 6000);
  }

  /* -----------------------------------------------------------------
     REVELADO POR SCROLL
     ----------------------------------------------------------------- */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { io.observe(el); });

    // Respaldo: si algo nunca entra en viewport, se muestra igual
    window.setTimeout(function () {
      items.forEach(function (el) { el.classList.add("in-view"); });
    }, 5000);
  }

  /* -----------------------------------------------------------------
     NAV
     ----------------------------------------------------------------- */
  function initNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#menu-nav");
    if (!toggle || !nav) return;

    function close() {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    $$("a", nav).forEach(function (a) { a.addEventListener("click", close); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* -----------------------------------------------------------------
     CURSOR (luz de vela)
     ----------------------------------------------------------------- */
  function initCursor() {
    var fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduceMotion) return;

    var dot = $(".cursor-dot");
    var halo = $(".cursor-halo");
    if (!dot || !halo) return;

    document.body.classList.add("has-cursor");

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var hx = tx, hy = ty;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      document.body.classList.add("cursor-active");
    });

    window.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor-active");
    });

    // El halo "arde" sobre elementos interactivos
    $$("a, button, .beast-card, input, textarea").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        if (!el.matches("input, textarea")) document.body.classList.add("cursor-hot");
      });
      el.addEventListener("mouseleave", function () {
        document.body.classList.remove("cursor-hot");
      });
    });

    (function loop() {
      hx += (tx - hx) * 0.18;
      hy += (ty - hy) * 0.18;
      dot.style.transform = "translate(" + tx + "px," + ty + "px) translate(-50%,-50%)";
      halo.style.transform = "translate(" + hx + "px," + hy + "px) translate(-50%,-50%)";
      window.requestAnimationFrame(loop);
    })();
  }

  /* -----------------------------------------------------------------
     PARTICULAS (ceniza, petalos, gotas de sangre)
     ----------------------------------------------------------------- */
  function initParticles() {
    var canvas = $("#particles");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var hero = canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0;
    var parts = [];
    var running = true;

    function resize() {
      var r = hero.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function makeParticle() {
      var r = Math.random();
      var type = r < 0.62 ? "ash" : (r < 0.88 ? "petal" : "blood");
      var p = {
        type: type,
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: 0.1 + Math.random() * 0.35,
        size: 0.7 + Math.random() * 1.6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.03,
        alpha: 0.15 + Math.random() * 0.4
      };
      if (type === "petal") { p.size = 2 + Math.random() * 3; p.vy = 0.25 + Math.random() * 0.5; }
      if (type === "blood") { p.size = 1.4 + Math.random() * 2; p.vy = 1.2 + Math.random() * 1.8; p.alpha = 0.5; }
      return p;
    }

    function build() {
      var count = Math.round(Math.min(130, (w * h) / 16000));
      parts = [];
      for (var i = 0; i < count; i++) parts.push(makeParticle());
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx + Math.sin((p.y + p.x) * 0.01) * 0.15;
        p.y += p.vy;
        p.rot += p.vr;

        if (p.y > h + 12) { p.y = -12; p.x = Math.random() * w; }
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.type === "ash") {
          ctx.fillStyle = "#b9b2a6";
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.type === "petal") {
          ctx.fillStyle = "#6b1f1f";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "#a32626";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      window.requestAnimationFrame(draw);
    }

    window.addEventListener("resize", throttle(resize, 200));
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) window.requestAnimationFrame(draw);
    });

    resize();
    window.requestAnimationFrame(draw);
  }

  /* -----------------------------------------------------------------
     PARALAJE (multicapa, scroll + puntero)
     ----------------------------------------------------------------- */
  function initParallax() {
    if (reduceMotion) return;
    var layers = $$("[data-depth]");
    if (!layers.length) return;

    var px = 0, py = 0, sx = 0, sy = 0;
    var targetPx = 0, targetPy = 0;

    window.addEventListener("mousemove", function (e) {
      targetPx = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPy = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    (function loop() {
      px += (targetPx - px) * 0.06;
      py += (targetPy - py) * 0.06;
      sy = window.scrollY || window.pageYOffset;
      sx = sx + (px - sx) * 0.1;

      for (var i = 0; i < layers.length; i++) {
        var el = layers[i];
        var d = parseFloat(el.getAttribute("data-depth")) || 0;
        var tx = sx * d * 30;
        var ty = py * d * 30 + sy * d * 0.5;
        el.style.transform = "translate3d(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px,0)";
      }
      window.requestAnimationFrame(loop);
    })();
  }

  /* -----------------------------------------------------------------
     VIAL DE SCROLL
     ----------------------------------------------------------------- */
  function initScrollVial() {
    var vial = $(".vial-blood");
    if (!vial) return;
    var doc = document.documentElement;

    function update() {
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      vial.style.setProperty("--drain", String(1 - p));
    }

    window.addEventListener("scroll", throttle(update, 50), { passive: true });
    window.addEventListener("resize", throttle(update, 200));
    update();
  }

  /* -----------------------------------------------------------------
     EASTER EGG — FRENESI (5 clics rapidos en el sigilo)
     ----------------------------------------------------------------- */
  function initFrenzy() {
    var crest = $("#crest");
    if (!crest) return;
    var clicks = 0;
    var timer = null;
    var active = false;

    crest.addEventListener("click", function (e) {
      clicks++;
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { clicks = 0; }, 1600);

      if (clicks >= 5 && !active) {
        e.preventDefault();
        clicks = 0;
        active = true;
        document.body.classList.add("frenzy-on");
        window.setTimeout(function () {
          document.body.classList.remove("frenzy-on");
          active = false;
        }, 5000);
      }
    });
  }

  /* -----------------------------------------------------------------
     AUDIO AMBIENTAL (Web Audio API, generativo, sin archivos)
     ----------------------------------------------------------------- */
  function initAudio() {
    var btn = $("#audio-toggle");
    if (!btn) return;
    var ctx = null, master = null, started = false, bellTimer = null;

    function makeDrone() {
      master = ctx.createGain();
      master.gain.value = 0.0001;
      master.connect(ctx.destination);

      var tone = ctx.createGain();
      tone.gain.value = 0.6;
      tone.connect(master);

      var filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      filter.connect(tone);

      [55, 82.5, 110].forEach(function (freq, i) {
        var osc = ctx.createOscillator();
        osc.type = i === 2 ? "triangle" : "sine";
        osc.frequency.value = freq;
        var g = ctx.createGain();
        g.gain.value = i === 2 ? 0.12 : 0.25;
        osc.connect(g).connect(filter);
        osc.start();
      });

      // LFO lento sobre el tono: respiracion de las cuerdas (no afecta el gate)
      var lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06;
      var lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.28;
      lfo.connect(lfoGain).connect(tone.gain);
      lfo.start();
    }

    function bell() {
      if (!ctx) return;
      var t = ctx.currentTime;
      var osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 660;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
      osc.connect(g).connect(master);
      osc.start(t);
      osc.stop(t + 3.4);
      bellTimer = window.setTimeout(bell, 11000 + Math.random() * 9000);
    }

    function on() {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        makeDrone();
      }
      if (ctx.state === "suspended") ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.18, ctx.currentTime, 1.2);
      if (!started) { started = true; bell(); }
      btn.setAttribute("aria-pressed", "true");
      btn.setAttribute("aria-label", "Desactivar sonido ambiental");
    }

    function off() {
      if (master) master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.6);
      window.clearTimeout(bellTimer);
      started = false;
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Activar sonido ambiental");
    }

    btn.addEventListener("click", function () {
      if (btn.getAttribute("aria-pressed") === "true") off();
      else on();
    });
  }

  /* -----------------------------------------------------------------
     UTILIDADES
     ----------------------------------------------------------------- */
  function throttle(fn, wait) {
    var last = 0, t = null;
    return function () {
      var now = Date.now();
      var args = arguments;
      if (now - last >= wait) { last = now; fn.apply(this, args); }
      else {
        window.clearTimeout(t);
        t = window.setTimeout(function () { last = Date.now(); fn.apply(null, args); }, wait - (now - last));
      }
    };
  }

  /* -----------------------------------------------------------------
     INIT
     ----------------------------------------------------------------- */
  function init() {
    var year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    [initLoader, initReveal, initNav, initCursor, initParticles,
      initParallax, initScrollVial, initFrenzy, initAudio].forEach(function (fn) {
        try { fn(); } catch (err) { /* una feature no debe romper el resto */ }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
