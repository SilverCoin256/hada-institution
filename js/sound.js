/**
 * sound.js v2 — layered WebAudio sound engine for every site version.
 * No audio files; everything is synthesised live. Muted until first
 * gesture (browser policy), persistent toggle.
 *
 * Signal path:  voices → [dry] ─┐
 *                        → [wet]→ convolver(reverb) ─┐
 *                                                    ├→ master → out
 *   ambient pad (own bus, very low) ─────────────────┘
 *
 * Back-compatible API (unchanged names):
 *   click hover key stamp boot jump open error attach toggle on
 * New in v2:
 *   whoosh(dir) travel confirm land select ambient(onOrOff)
 */
window.SND = (function () {
  let ctx = null, master, reverb, wetGain, dryGain, padBus, padOsc = [], padOn = false;
  let enabled = localStorage.getItem('snd') !== 'off';
  let started = false;

  function ac() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      buildGraph();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /* generated impulse response → a small plate-ish reverb */
  function makeIR(seconds, decay) {
    const rate = ctx.sampleRate, len = rate * seconds;
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++)
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  function buildGraph() {
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
    reverb = ctx.createConvolver(); reverb.buffer = makeIR(1.7, 3.2);
    wetGain = ctx.createGain(); wetGain.gain.value = 0.22;
    dryGain = ctx.createGain(); dryGain.gain.value = 1.0;
    reverb.connect(wetGain); wetGain.connect(master); dryGain.connect(master);
    padBus = ctx.createGain(); padBus.gain.value = 0.0; padBus.connect(dryGain); padBus.connect(reverb);
  }

  /* one enveloped oscillator voice */
  function voice(freq, dur, type, vol, slideTo, sendWet) {
    if (!enabled) return;
    try {
      const a = ac(), o = a.createOscillator(), g = a.createGain();
      o.type = type || 'square';
      o.frequency.setValueAtTime(freq, a.currentTime);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, a.currentTime + dur);
      g.gain.setValueAtTime(0.0001, a.currentTime);
      g.gain.exponentialRampToValueAtTime(vol || 0.04, a.currentTime + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
      o.connect(g); g.connect(dryGain); if (sendWet) g.connect(reverb);
      o.start(); o.stop(a.currentTime + dur + 0.02);
    } catch (e) {}
  }

  /* filtered noise burst (whooshes, stamps, transitions) */
  function noise(dur, vol, f0, f1, q) {
    if (!enabled) return;
    try {
      const a = ac(), n = a.sampleRate * dur, buf = a.createBuffer(1, n, a.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1);
      const src = a.createBufferSource(); src.buffer = buf;
      const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = q || 1.2;
      bp.frequency.setValueAtTime(f0 || 800, a.currentTime);
      if (f1) bp.frequency.exponentialRampToValueAtTime(f1, a.currentTime + dur);
      const g = a.createGain();
      g.gain.setValueAtTime(0.0001, a.currentTime);
      g.gain.exponentialRampToValueAtTime(vol || 0.05, a.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
      src.connect(bp); bp.connect(g); g.connect(dryGain); g.connect(reverb);
      src.start(); src.stop(a.currentTime + dur + 0.02);
    } catch (e) {}
  }

  /* ambient pad: 3 detuned saws through a slow lowpass LFO */
  function startPad() {
    if (padOn || !enabled) return; padOn = true; const a = ac();
    const base = 110; // A2
    const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = 0.7;
    lp.connect(padBus);
    const lfo = a.createOscillator(), lfoG = a.createGain();
    lfo.frequency.value = 0.06; lfoG.gain.value = 240; lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
    padOsc = [];
    [0, 7, 12].forEach((semi, i) => {           // root, fifth, octave
      const o = a.createOscillator(); o.type = 'sawtooth';
      o.frequency.value = base * Math.pow(2, semi / 12);
      o.detune.value = (i - 1) * 6;
      const g = a.createGain(); g.gain.value = 0.16;
      o.connect(g); g.connect(lp); o.start(); padOsc.push(o, lfo);
    });
    padBus.gain.setTargetAtTime(0.09, a.currentTime, 1.4);   // fade in slowly
  }
  function stopPad() {
    if (!padOn) return; padOn = false;
    try { padBus.gain.setTargetAtTime(0.0, ctx.currentTime, 0.6);
      setTimeout(() => padOsc.forEach(o => { try { o.stop(); } catch (e) {} }), 900); } catch (e) {}
  }

  const api = {
    /* --- back-compatible --- */
    click:  () => { voice(680, 0.05, 'square', 0.03); },
    hover:  () => { voice(1180, 0.02, 'sine', 0.012); },
    key:    () => { voice(300 + Math.random() * 80, 0.028, 'square', 0.018); },
    stamp:  () => { voice(150, 0.09, 'square', 0.06, null, true); noise(0.07, 0.05, 400, 120, 0.8); },
    jump:   () => { voice(330, 0.14, 'square', 0.045, 720); },
    open:   () => { voice(520, 0.06, 'triangle', 0.03, null, true); setTimeout(() => voice(880, 0.09, 'triangle', 0.03, null, true), 55); },
    error:  () => { voice(200, 0.16, 'sawtooth', 0.05, 90); },
    boot:   () => { [[392,0],[523,110],[659,220],[784,340],[1046,480]].forEach(([f,t]) => setTimeout(() => voice(f, 0.16, 'triangle', 0.05, null, true), t)); startPad(); },
    /* --- new v2 --- */
    whoosh: (dir) => { noise(0.5, 0.06, dir === 'down' ? 1400 : 300, dir === 'down' ? 200 : 1600, 0.9); },
    travel: () => { voice(520 + Math.random() * 140, 0.045, 'sine', 0.02, null, true); },
    confirm:() => { voice(660, 0.08, 'triangle', 0.045, null, true); setTimeout(() => voice(990, 0.12, 'triangle', 0.04, null, true), 70); },
    land:   () => { voice(180, 0.09, 'sine', 0.05, 90); noise(0.05, 0.03, 300, 120, 0.7); },
    select: () => { voice(780, 0.05, 'square', 0.03, null, true); },
    ambient(on) { if (on === false) stopPad(); else startPad(); },

    get on() { return enabled; },
    toggle() {
      enabled = !enabled;
      localStorage.setItem('snd', enabled ? 'on' : 'off');
      if (enabled) { api.click(); startPad(); } else stopPad();
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
