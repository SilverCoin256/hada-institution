/**
 * figures.js — hand-coded motion figures. No libraries.
 * Each module activates only if its canvas exists on the page.
 *
 * Integrity rules, enforced in every caption on the pages:
 *  - Real numbers (SEDI endpoints, proxy ±%, notebook dates, timeline
 *    dates) are drawn as reported / recorded.
 *  - Everything else is labelled "schematic" on the page. Nothing here
 *    pretends to be live data.
 */
(function () {
  const ACCENT = '#7c3aed', INK = '#0f0f0f', SUB = '#8a8a8a', GRID = '#ededed';
  const MONO = '11px "Roboto Mono", monospace';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setup(canvas) {
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth, H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    return { ctx, W, H };
  }

  function onVisible(el, fn) {
    if (reduce) { fn(); return; }
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { fn(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(el);
  }

  /* ── 1. Queue-saturation mechanism (schematic) ─────────────
     Two lanes: AI outputs arrive fast (top), human review clears
     slowly (bottom gate). Past the marked threshold, items start
     passing hollow — ceremonial sign-off. */
  const qc = document.getElementById('queue-canvas');
  if (qc) {
    const { ctx, W, H } = setup(qc);
    const items = [];
    let t = 0;
    const gateX = W * 0.62, laneY = H * 0.52;
    function tick() {
      t++;
      // arrival rate ramps up over time, resets on loop
      const phase = (t % 900) / 900;               // 15s loop @60fps
      const rate = 0.02 + phase * 0.16;
      if (Math.random() < rate) items.push({ x: -6, ceremonial: false });
      const saturated = phase > 0.55;
      items.forEach(it => {
        if (it.x < gateX - 8) it.x += 1.6;
        else if (saturated || it.ceremonial) { it.ceremonial = true; it.x += 2.4; }
        else it.x += 0.35;                          // substantive review is slow
      });
      for (let i = items.length - 1; i >= 0; i--) if (items[i].x > W + 8) items.splice(i, 1);

      ctx.clearRect(0, 0, W, H);
      // lane
      ctx.strokeStyle = GRID; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, laneY + 12); ctx.lineTo(W, laneY + 12); ctx.stroke();
      // gate
      ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(gateX, laneY - 22); ctx.lineTo(gateX, laneY + 12); ctx.stroke();
      ctx.font = MONO; ctx.fillStyle = SUB; ctx.textAlign = 'center';
      ctx.fillText('review', gateX, laneY - 32);
      ctx.textAlign = 'left';
      ctx.fillStyle = saturated ? ACCENT : SUB;
      ctx.fillText(saturated ? 'saturated — ceremonial pass-through' : 'substantive review', 8, 16);
      // items
      items.forEach(it => {
        if (it.ceremonial) {
          ctx.strokeStyle = ACCENT; ctx.lineWidth = 1.5;
          ctx.strokeRect(it.x - 4, laneY - 4, 8, 10);
        } else {
          ctx.fillStyle = INK;
          ctx.fillRect(it.x - 4, laneY - 4, 8, 10);
        }
      });
      if (!reduce) requestAnimationFrame(tick);
    }
    onVisible(qc, tick);
  }

  /* ── 2. Proxy divergence — real endpoints (+186% / −20%) ──── */
  const pc = document.getElementById('proxy-canvas');
  if (pc) {
    const { ctx, W, H } = setup(pc);
    const l = 40, r = 12, top = 22, bot = 28;
    const y = v => top + (1 - (v + 40) / 260) * (H - top - bot); // -40..220 range
    function frame(p) {
      ctx.clearRect(0, 0, W, H);
      ctx.font = MONO;
      ctx.strokeStyle = GRID; ctx.lineWidth = 1;
      [0, 100, 200].forEach(v => {
        ctx.beginPath(); ctx.moveTo(l, y(v)); ctx.lineTo(W - r, y(v)); ctx.stroke();
        ctx.fillStyle = SUB; ctx.textAlign = 'right';
        ctx.fillText((v > 0 ? '+' : '') + v + '%', l - 6, y(v));
      });
      const n = 40, upto = Math.max(2, Math.floor(p * n));
      // proxy denominator +186%
      ctx.strokeStyle = ACCENT; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i < upto; i++) {
        const t = i / (n - 1), px = l + t * (W - l - r), py = y(186 * Math.pow(t, 1.4));
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
      // SEC's own count −20%
      ctx.strokeStyle = INK; ctx.beginPath();
      for (let i = 0; i < upto; i++) {
        const t = i / (n - 1), px = l + t * (W - l - r), py = y(-20 * t);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
      if (p >= 1) {
        ctx.textAlign = 'right'; ctx.fillStyle = ACCENT;
        ctx.fillText('proxy denominator +186%', W - r, y(186) - 8);
        ctx.fillStyle = INK;
        ctx.fillText('reporting issuers −20%', W - r, y(-20) + 14);
      }
    }
    onVisible(pc, () => {
      if (reduce) { frame(1); return; }
      let s = null;
      (function step(ts) {
        if (s === null) s = ts;
        const p = Math.min((ts - s) / 1500, 1);
        frame(p);
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }

  /* ── 3. Anchoring schematic — assimilation vs contrast ────── */
  const ac = document.getElementById('anchor-canvas');
  if (ac) {
    const { ctx, W, H } = setup(ac);
    const mid = W / 2;
    const dots = [];
    for (let s = 0; s < 2; s++)
      for (let i = 0; i < 14; i++)
        dots.push({ side: s, y0: 26 + (i / 14) * (H - 60), x: (s === 0 ? W * 0.25 : W * 0.75) + (Math.sin(i * 7) * 26) });
    function frame(p) {
      ctx.clearRect(0, 0, W, H);
      ctx.font = MONO; ctx.textAlign = 'center';
      // anchor lines
      [W * 0.25, W * 0.75].forEach(axx => {
        ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(axx, 22); ctx.lineTo(axx, H - 34); ctx.stroke();
      });
      ctx.strokeStyle = GRID;
      ctx.beginPath(); ctx.moveTo(mid, 12); ctx.lineTo(mid, H - 12); ctx.stroke();
      ctx.fillStyle = SUB;
      ctx.fillText('human anchor — assimilate', W * 0.25, H - 14);
      ctx.fillStyle = ACCENT;
      ctx.fillText('AI anchor (incidental) — contrast', W * 0.75, H - 14);
      dots.forEach(d => {
        const anchor = d.side === 0 ? W * 0.25 : W * 0.75;
        const dir = d.side === 0 ? -1 : 1;           // toward vs away
        const x = d.x + dir * (anchor - d.x) * (d.side === 0 ? p * 0.8 : -p * 0.6);
        ctx.fillStyle = d.side === 0 ? INK : ACCENT;
        ctx.beginPath(); ctx.arc(x, d.y0, 3, 0, Math.PI * 2); ctx.fill();
      });
    }
    onVisible(ac, () => {
      if (reduce) { frame(1); return; }
      let s = null;
      (function step(ts) {
        if (s === null) s = ts;
        const p = Math.min((ts - s) / 1600, 1);
        frame(1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }

  /* ── 4. Notebook pulse — real entry dates ─────────────────── */
  const nc = document.getElementById('pulse-canvas');
  if (nc && window.__notebookDates) {
    const { ctx, W, H } = setup(nc);
    const dates = window.__notebookDates.map(d => new Date(d + 'T00:00:00'));
    const min = Math.min(...dates), max = Math.max(...dates);
    const span = Math.max(max - min, 1);
    function frame(p) {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = GRID;
      ctx.beginPath(); ctx.moveTo(0, H - 14); ctx.lineTo(W, H - 14); ctx.stroke();
      ctx.font = MONO; ctx.fillStyle = SUB;
      ctx.textAlign = 'left'; ctx.fillText(dates[0] && new Date(min).toISOString().slice(0, 7), 0, H - 2);
      ctx.textAlign = 'right'; ctx.fillText(new Date(max).toISOString().slice(0, 7), W, H - 2);
      const shown = Math.ceil(p * dates.length);
      dates.slice(0, shown).forEach(d => {
        const x = 6 + ((d - min) / span) * (W - 12);
        ctx.strokeStyle = ACCENT; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x, H - 16); ctx.lineTo(x, H - 16 - (H - 26)); ctx.stroke();
      });
    }
    onVisible(nc, () => {
      if (reduce) { frame(1); return; }
      let s = null;
      (function step(ts) {
        if (s === null) s = ts;
        const p = Math.min((ts - s) / 1200, 1);
        frame(p);
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }

  /* ── 5. Timeline strip-chart — real event dates ───────────── */
  const tc = document.getElementById('stripchart-canvas');
  if (tc && window.__timelineDates) {
    const { ctx, W, H } = setup(tc);
    const dates = window.__timelineDates.map(d => new Date(d)).sort((a, b) => a - b);
    const min = +dates[0], max = +dates[dates.length - 1], span = Math.max(max - min, 1);
    function frame(p) {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = GRID; ctx.lineWidth = 1;
      for (let g = 0; g < 5; g++) {
        const gy = 10 + (g / 4) * (H - 34);
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }
      // pen trace: wanders, ticks up at each event
      ctx.strokeStyle = ACCENT; ctx.lineWidth = 1.5; ctx.beginPath();
      const steps = Math.floor(p * 240);
      for (let i = 0; i <= steps; i++) {
        const t = i / 240, x = t * W;
        const time = min + t * span;
        let v = 0.62;
        dates.forEach((d, k) => {
          const dt = (time - +d) / (span * 0.04);
          if (dt > 0) v -= 0.34 / dates.length * Math.exp(-dt * 0.7);
        });
        v += Math.sin(i * 0.7) * 0.008;
        const yy = 10 + v * (H - 34);
        i === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      ctx.stroke();
      // event ticks
      ctx.font = MONO; ctx.fillStyle = SUB; ctx.textAlign = 'center';
      dates.forEach(d => {
        const x = ((+d - min) / span) * W;
        if (x / W <= p) {
          ctx.strokeStyle = INK; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, H - 20); ctx.lineTo(x, H - 12); ctx.stroke();
        }
      });
      ctx.textAlign = 'left'; ctx.fillText(new Date(min).getFullYear(), 0, H - 1);
      ctx.textAlign = 'right'; ctx.fillText(new Date(max).getFullYear(), W, H - 1);
    }
    onVisible(tc, () => {
      if (reduce) { frame(1); return; }
      let s = null;
      (function step(ts) {
        if (s === null) s = ts;
        const p = Math.min((ts - s) / 2600, 1);
        frame(p);
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }

  /* ── 6. Atlas meters — labelled schematic sweeps ──────────── */
  document.querySelectorAll('.meter-canvas').forEach((mc, idx) => {
    const { ctx, W, H } = setup(mc);
    const cx = W / 2, cy = H - 8, R = Math.min(W / 2 - 6, H - 16);
    const rest = 0.25 + (idx * 0.13) % 0.55;         // deterministic per meter
    function frame(p) {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = GRID; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI); ctx.stroke();
      // ticks
      ctx.strokeStyle = SUB; ctx.lineWidth = 1;
      for (let i = 0; i <= 8; i++) {
        const a = Math.PI + (i / 8) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * (R - 4), cy + Math.sin(a) * (R - 4));
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.stroke();
      }
      // needle: overshoot then settle at rest
      const sweep = p < 0.6 ? p / 0.6 : 1 - (p - 0.6) / 0.4 * (1 - rest);
      const a = Math.PI + Math.min(sweep, 1) * Math.PI;
      ctx.strokeStyle = ACCENT; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * (R - 8), cy + Math.sin(a) * (R - 8));
      ctx.stroke();
      ctx.fillStyle = INK;
      ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    }
    onVisible(mc, () => {
      if (reduce) { frame(1); return; }
      let s = null;
      (function step(ts) {
        if (s === null) s = ts;
        const p = Math.min((ts - s) / 1400, 1);
        frame(p);
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  });
})();
