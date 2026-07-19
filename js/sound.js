/**
 * sound.js v3 — the estate's sound identity. No audio files; everything
 * is synthesised and hand-tuned. Muted until first gesture (browser
 * policy), persistent toggle.
 *
 * IDENTITY — one key for the whole estate: D major. The signature motif
 * is D → A → E (rising fifths: open, confident). Boot plays it whole,
 * confirm plays its tail, travel walks its pentatonic scale, and the
 * ambient room occasionally chimes a distant note of it. Everything you
 * hear belongs to the same piece of music.
 *
 * CRAFT — no raw square-wave beeps anywhere:
 *   bells   = 2-operator FM (glass, inharmonic sparkle on the attack)
 *   clicks  = "thocks": a 5 ms noise transient + a tuned, pitch-dropping
 *             sine body — a key on a good keyboard, not a buzzer
 *   whoosh  = stereo-decorrelated noise through swept bandpasses
 * Every note is humanised (±6 cents, ±18 % velocity, random stereo seat)
 * so no two clicks are ever identical.
 *
 * Signal path: voices → [dry] ──────────────┐
 *                     → [send] → convolver ─┼→ compressor → master → out
 *              ambient bus ─────────────────┘
 *
 * Public API (unchanged since v1/v2):
 *   click hover key stamp boot jump open error attach toggle on
 *   whoosh(dir) travel confirm land select ambient(onOrOff)
 */
window.SND = (function () {
  let ctx = null, comp, master, reverb, send, dry, padBus, padNodes = [], padOn = false, chimeTimer = 0;
  let enabled = localStorage.getItem('snd') !== 'off';
  let started = false;

  /* ── the estate's pitch material (key of D) ─────────────────── */
  const NOTE = { D2: 73.42, A2: 110.00, D3: 146.83, A3: 220.00,
                 D4: 293.66, E4: 329.63, Fs4: 369.99, A4: 440.00, B4: 493.88,
                 D5: 587.33, E5: 659.26, Fs5: 739.99, A5: 880.00 };
  const MOTIF = [NOTE.D4, NOTE.A4, NOTE.E5];                       /* the signature */
  const PENTA = [NOTE.D4, NOTE.E4, NOTE.Fs4, NOTE.A4, NOTE.B4,     /* travel scale */
                 NOTE.D5, NOTE.E5, NOTE.Fs5];

  const rnd = (a, b) => a + Math.random() * (b - a);
  const human = f => f * Math.pow(2, rnd(-6, 6) / 1200);           /* ±6 cents */

  function ac() {
    if (!ctx) { ctx = new (window.AudioContext || window.webkitAudioContext)(); buildGraph(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /* generated stereo IR — exponential decay whose tail darkens over time,
     like a real room swallowing the highs */
  function makeIR(seconds, decay) {
    const rate = ctx.sampleRate, len = Math.floor(rate * seconds);
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < len; i++) {
        const k = .38 - .32 * (i / len);                /* one-pole coeff: bright → dark */
        lp += ((Math.random() * 2 - 1) - lp) * k;
        d[i] = lp * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  function buildGraph() {
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20; comp.knee.value = 14; comp.ratio.value = 3.5;
    comp.attack.value = .004; comp.release.value = .18;
    master = ctx.createGain(); master.gain.value = .85;
    comp.connect(master); master.connect(ctx.destination);
    reverb = ctx.createConvolver(); reverb.buffer = makeIR(2.4, 2.9);
    send = ctx.createGain(); send.gain.value = 1;
    const wet = ctx.createGain(); wet.gain.value = .26;
    send.connect(reverb); reverb.connect(wet); wet.connect(comp);
    dry = ctx.createGain(); dry.gain.value = 1; dry.connect(comp);
    padBus = ctx.createGain(); padBus.gain.value = 0;
    padBus.connect(dry); padBus.connect(send);
  }

  /* route a voice into the room with a random stereo seat */
  function seat(node, wetAmt, width) {
    const a = ctx;
    let out = node;
    if (a.createStereoPanner) {
      const p = a.createStereoPanner(); p.pan.value = rnd(-(width || .25), width || .25);
      node.connect(p); out = p;
    }
    out.connect(dry);
    if (wetAmt) { const w = a.createGain(); w.gain.value = wetAmt; out.connect(w); w.connect(send); }
  }

  /* ── VOICES ─────────────────────────────────────────────────── */

  /* 2-op FM bell — the glass the estate chimes in */
  function bell(freq, vel, dur, wetAmt) {
    if (!enabled) return;
    try {
      const a = ac(), t = a.currentTime, f = human(freq);
      vel = (vel || .05) * rnd(.82, 1.05); dur = dur || 1.1;
      const car = a.createOscillator(), mod = a.createOscillator();
      const mg = a.createGain(), g = a.createGain();
      car.frequency.value = f;
      mod.frequency.value = f * 2.004;                   /* slightly off 2:1 → glassy */
      mg.gain.setValueAtTime(f * 1.4, t);                /* bright strike… */
      mg.gain.exponentialRampToValueAtTime(f * .01, t + dur * .35);  /* …that clears fast */
      mod.connect(mg); mg.connect(car.frequency);
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(vel, t + .006);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      car.connect(g); seat(g, wetAmt == null ? .8 : wetAmt);
      car.start(t); mod.start(t); car.stop(t + dur + .05); mod.stop(t + dur + .05);
    } catch (e) {}
  }

  /* short pluck — a bell that lets go quickly (travel, jump) */
  const pluck = (f, vel, wet) => bell(f, vel, .34, wet == null ? .5 : wet);

  /* tactile thock — noise transient + tuned pitch-dropping body */
  function thock(vel, pitch) {
    if (!enabled) return;
    try {
      const a = ac(), t = a.currentTime;
      vel = (vel || .05) * rnd(.85, 1.1);
      /* 5 ms transient */
      const n = Math.floor(a.sampleRate * .006), buf = a.createBuffer(1, n, a.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const src = a.createBufferSource(); src.buffer = buf;
      const hp = a.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1700;
      const ng = a.createGain(); ng.gain.value = vel * .8;
      src.connect(hp); hp.connect(ng); seat(ng, .25);
      src.start(t);
      /* tuned body with a fast pitch drop */
      const o = a.createOscillator(), g = a.createGain();
      const f0 = human(pitch || 172);
      o.type = 'sine';
      o.frequency.setValueAtTime(f0 * 1.5, t);
      o.frequency.exponentialRampToValueAtTime(f0, t + .03);
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(vel, t + .004);
      g.gain.exponentialRampToValueAtTime(.0001, t + .07);
      o.connect(g); seat(g, .3);
      o.start(t); o.stop(t + .1);
    } catch (e) {}
  }

  /* stereo whoosh — two decorrelated noise beds through swept bandpasses */
  function whooshNoise(dur, vol, f0, f1, q) {
    if (!enabled) return;
    try {
      const a = ac(), t = a.currentTime;
      for (let ch = 0; ch < 2; ch++) {
        const n = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, n, a.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
        const src = a.createBufferSource(); src.buffer = buf;
        const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = q || 1.1;
        bp.frequency.setValueAtTime(f0 * rnd(.92, 1.08), t);
        bp.frequency.exponentialRampToValueAtTime(f1 * rnd(.92, 1.08), t + dur);
        const g = a.createGain();
        g.gain.setValueAtTime(.0001, t);
        g.gain.exponentialRampToValueAtTime(vol * .5, t + dur * .28);
        g.gain.exponentialRampToValueAtTime(.0001, t + dur);
        const p = a.createStereoPanner ? a.createStereoPanner() : null;
        src.connect(bp); bp.connect(g);
        if (p) { p.pan.value = ch ? .4 : -.4; g.connect(p); p.connect(dry); const w = a.createGain(); w.gain.value = .5; p.connect(w); w.connect(send); }
        else { g.connect(dry); g.connect(send); }
        src.start(t); src.stop(t + dur + .02);
      }
    } catch (e) {}
  }

  /* low swell — the weight under boot and land */
  function swell(freq, vel, dur) {
    if (!enabled) return;
    try {
      const a = ac(), t = a.currentTime;
      const o = a.createOscillator(), g = a.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(vel, t + dur * .3);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g); g.connect(dry);
      o.start(t); o.stop(t + dur + .05);
    } catch (e) {}
  }

  /* ── AMBIENT — the room hums in D and, rarely, chimes ───────── */
  function startPad() {
    if (padOn || !enabled) return; padOn = true; const a = ac();
    const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 340; lp.Q.value = .6;
    lp.connect(padBus);
    const lfo = a.createOscillator(), lfoG = a.createGain();
    lfo.frequency.value = .045; lfoG.gain.value = 150;            /* slow breathing */
    lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    padNodes = [lfo];
    [[NOTE.D2, 0], [NOTE.A2, -5], [NOTE.D3, 6]].forEach(([f, det]) => {
      const o = a.createOscillator(); o.type = 'triangle';
      o.frequency.value = f; o.detune.value = det;
      const g = a.createGain(); g.gain.value = .3;
      o.connect(g); g.connect(lp); o.start(); padNodes.push(o);
    });
    padBus.gain.setTargetAtTime(.05, a.currentTime, 2.2);         /* barely there */
    scheduleChime();
  }
  function scheduleChime() {
    clearTimeout(chimeTimer);
    chimeTimer = setTimeout(() => {
      if (padOn && enabled && document.visibilityState === 'visible')
        bell(MOTIF[Math.floor(Math.random() * MOTIF.length)] / 2, .012, 2.6, 1.6);
      if (padOn) scheduleChime();
    }, rnd(12000, 26000));
  }
  function stopPad() {
    if (!padOn) return; padOn = false; clearTimeout(chimeTimer);
    try {
      padBus.gain.setTargetAtTime(0, ctx.currentTime, .5);
      setTimeout(() => padNodes.forEach(o => { try { o.stop(); } catch (e) {} }), 900);
    } catch (e) {}
  }

  /* ── PUBLIC API ─────────────────────────────────────────────── */
  let lastHover = 0, travelStep = 0, travelDir = 1;

  const api = {
    /* interface touches — tactile, not tonal */
    click:  () => { thock(.05); },
    key:    () => { thock(.03, rnd(150, 200)); },
    hover:  () => { const n = performance.now(); if (n - lastHover < 70) return; lastHover = n; thock(.011, 320); },
    select: () => { thock(.045); pluck(NOTE.A4, .022); },
    open:   () => { thock(.04); bell(NOTE.D5, .028, .8); },
    stamp:  () => { thock(.09, 120); swell(NOTE.D2, .07, .22); },

    /* movement */
    jump:   () => { pluck(NOTE.D5, .026, .3); },
    land:   () => { swell(NOTE.D2 * 2, .05, .1); thock(.035, 130); },
    error:  () => { thock(.05, 98); setTimeout(() => thock(.045, 87), 105); },  /* a low double-knock, no buzzer */
    whoosh: dir => { whooshNoise(.62, .07, dir === 'down' ? 1500 : 260, dir === 'down' ? 190 : 1700, 1.0); },

    /* the helix plays the estate's pentatonic as you travel it */
    travel: () => {
      travelStep += travelDir;
      if (travelStep >= PENTA.length - 1 || travelStep <= 0) travelDir *= -1;
      pluck(PENTA[Math.max(0, Math.min(PENTA.length - 1, travelStep))], .02);
    },

    /* the signature moments */
    confirm:() => { bell(NOTE.A4, .035, .7); setTimeout(() => bell(NOTE.E5, .03, .9), 90); },
    boot:   () => {
      swell(NOTE.D2 / 2 * 1.5, .06, .9);                          /* low warmth under it */
      whooshNoise(.7, .03, 220, 1300, .8);
      MOTIF.forEach((f, i) => setTimeout(() => bell(f, .042, 1.3), 60 + i * 170));
      startPad();
    },

    ambient(on) { if (on === false) stopPad(); else startPad(); },

    get on() { return enabled; },
    toggle() {
      enabled = !enabled;
      localStorage.setItem('snd', enabled ? 'on' : 'off');
      if (enabled) { api.confirm(); startPad(); } else stopPad();
      document.querySelectorAll('[data-snd-toggle]').forEach(b => b.textContent = enabled ? 'SND ON' : 'SND OFF');
      return enabled;
    },

    attach(opts) {
      opts = opts || {};
      const first = () => { if (started) return; started = true; ac(); if (enabled && opts.pad !== false) startPad(); };
      ['click', 'keydown', 'pointerdown', 'wheel', 'touchstart'].forEach(ev =>
        addEventListener(ev, first, { once: true, passive: true }));
      document.addEventListener('click', e => {
        if (e.target.closest('[data-snd-toggle]')) return;
        if (e.target.closest('a, button, .tab, .filter-btn, [data-snd]')) api.click();
      });
      document.addEventListener('mouseover', e => { if (e.target.closest('a, button, [data-snd]')) api.hover(); }, { passive: true });
      if (opts.button !== false) {
        const b = document.createElement('button');
        b.setAttribute('data-snd-toggle', '');
        b.textContent = enabled ? 'SND ON' : 'SND OFF';
        b.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:99999;font-family:"Roboto Mono","IBM Plex Mono",monospace;font-size:11px;letter-spacing:.08em;padding:8px 12px;background:rgba(0,0,0,.35);border:1px solid currentColor;color:inherit;cursor:pointer;opacity:.7;border-radius:6px;';
        b.addEventListener('click', () => api.toggle());
        document.body.appendChild(b);
      }
    }
  };
  return api;
})();
