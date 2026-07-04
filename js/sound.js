/**
 * sound.js — tiny WebAudio synth for UI sound across site versions.
 * No audio files; everything is generated. Muted until first gesture
 * (browser policy) and toggleable via a persistent button.
 * API: SND.click(), SND.hover(), SND.stamp(), SND.boot(), SND.key(),
 *      SND.jump(), SND.open(), SND.error(), SND.attach()
 */
window.SND = (function () {
  let ctx = null, enabled = localStorage.getItem('snd') !== 'off';

  function ac() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, dur, type, vol, slideTo) {
    if (!enabled) return;
    try {
      const a = ac(), o = a.createOscillator(), g = a.createGain();
      o.type = type || 'square';
      o.frequency.setValueAtTime(freq, a.currentTime);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, a.currentTime + dur);
      g.gain.setValueAtTime(vol || 0.04, a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
      o.connect(g); g.connect(a.destination);
      o.start(); o.stop(a.currentTime + dur);
    } catch (e) { /* audio unavailable */ }
  }

  function noise(dur, vol) {
    if (!enabled) return;
    try {
      const a = ac(), n = a.sampleRate * dur, buf = a.createBuffer(1, n, a.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const s = a.createBufferSource(), g = a.createGain();
      s.buffer = buf; g.gain.value = vol || 0.05;
      s.connect(g); g.connect(a.destination); s.start();
    } catch (e) { /* audio unavailable */ }
  }

  const api = {
    click:  () => tone(660, 0.05, 'square', 0.035),
    hover:  () => tone(880, 0.025, 'sine', 0.015),
    key:    () => tone(220 + Math.random() * 60, 0.03, 'square', 0.02),
    stamp:  () => { tone(140, 0.09, 'square', 0.06); noise(0.06, 0.04); },
    jump:   () => tone(330, 0.12, 'square', 0.04, 660),
    open:   () => { tone(520, 0.06, 'square', 0.03); setTimeout(() => tone(780, 0.08, 'square', 0.03), 60); },
    error:  () => { tone(200, 0.15, 'sawtooth', 0.05, 90); },
    boot:   () => {
      [ [440, 0], [554, 120], [659, 240], [880, 380] ]
        .forEach(([f, t]) => setTimeout(() => tone(f, 0.12, 'square', 0.045), t));
    },
    get on() { return enabled; },
    toggle() {
      enabled = !enabled;
      localStorage.setItem('snd', enabled ? 'on' : 'off');
      if (enabled) api.click();
      document.querySelectorAll('[data-snd-toggle]').forEach(b => b.textContent = enabled ? 'SND ON' : 'SND OFF');
      return enabled;
    },
    /* wire default sounds to interactive elements + create toggle button */
    attach() {
      document.addEventListener('click', e => {
        if (e.target.closest('[data-snd-toggle]')) return;
        if (e.target.closest('a, button, .tab, .filter-btn')) api.click();
      });
      document.addEventListener('mouseover', e => {
        if (e.target.closest('a, button')) api.hover();
      }, { passive: true });
      const b = document.createElement('button');
      b.setAttribute('data-snd-toggle', '');
      b.textContent = enabled ? 'SND ON' : 'SND OFF';
      b.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:9999;font-family:"Roboto Mono",monospace;font-size:11px;letter-spacing:.08em;padding:8px 12px;background:transparent;border:1px solid currentColor;color:inherit;cursor:pointer;opacity:.65;';
      b.addEventListener('click', () => api.toggle());
      document.body.appendChild(b);
    }
  };
  return api;
})();
