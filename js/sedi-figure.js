/**
 * SEDI figure — review latency vs. cumulative load, langchain, 22 months.
 * Hand-drawn on a 2D canvas. No dependencies, no library.
 *
 * Integrity note: the ENDPOINTS are the values reported in the paper —
 * review latency 91h → 8.5h, load surge ~33× over eight months. The
 * curve BETWEEN endpoints is illustrative interpolation, not a claim
 * about each month; the full monthly telemetry and the SEDI computation
 * live in the paper and the repo. The caption on the page says this too.
 */
(function () {
  const canvas = document.getElementById('sedi-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const INK = '#0f0f0f', SUB = '#8a8a8a', GRID = '#ededed', ACCENT = '#7c3aed';
  const MONTHS = 22;

  // latency (hours): flat ~91 for the first stretch, collapses over the
  // eight-month surge window to 8.5, then holds. Endpoints are real.
  const latency = [];
  for (let i = 0; i < MONTHS; i++) {
    let v;
    if (i <= 10) v = 91 - i * 1.1;                       // slow drift
    else if (i <= 18) {                                   // 8-month surge
      const t = (i - 10) / 8;
      v = 79 * Math.pow(1 - t, 1.7) + 8.5;
    } else v = 8.5;
    latency.push(v);
  }
  latency[0] = 91; latency[MONTHS - 1] = 8.5;

  let W, H, DPR, plot;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    plot = { l: 52, r: 18, t: 24, b: 40 };
  }

  const x = i => plot.l + (i / (MONTHS - 1)) * (W - plot.l - plot.r);
  const y = v => plot.t + (1 - (v - 0) / 100) * (H - plot.t - plot.b);

  function frame(p) { // p = 0..1 draw progress
    ctx.clearRect(0, 0, W, H);
    ctx.font = '11px "Roboto Mono", monospace';
    ctx.textBaseline = 'middle';

    // y grid + labels (hours)
    ctx.strokeStyle = GRID; ctx.fillStyle = SUB; ctx.lineWidth = 1;
    [0, 25, 50, 75, 100].forEach(v => {
      const yy = y(v);
      ctx.beginPath(); ctx.moveTo(plot.l, yy); ctx.lineTo(W - plot.r, yy); ctx.stroke();
      ctx.textAlign = 'right'; ctx.fillText(v + 'h', plot.l - 8, yy);
    });

    // x axis labels (edge-aligned so they don't clip)
    ctx.textAlign = 'left';
    ctx.fillText('month 0', x(0), H - plot.b + 20);
    ctx.textAlign = 'right';
    ctx.fillText('month 22', x(MONTHS - 1), H - plot.b + 20);

    // surge window shading (months 10–18)
    ctx.fillStyle = 'rgba(124,58,237,0.05)';
    ctx.fillRect(x(10), plot.t, x(18) - x(10), H - plot.t - plot.b);
    ctx.fillStyle = ACCENT; ctx.textAlign = 'center';
    ctx.fillText('33× load surge', (x(10) + x(18)) / 2, plot.t + 10);

    // the latency line, drawn to progress p
    const upto = 1 + Math.floor(p * (MONTHS - 1));
    ctx.strokeStyle = ACCENT; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i < upto; i++) {
      const px = x(i), py = y(latency[i]);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    if (p >= 1) {
      // endpoint dots + real values
      ctx.fillStyle = INK;
      [[0, '91h'], [MONTHS - 1, '8.5h']].forEach(([i, lab]) => {
        ctx.beginPath(); ctx.arc(x(i), y(latency[i]), 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = INK; ctx.textAlign = i === 0 ? 'left' : 'right';
        ctx.font = '600 12px "Roboto Mono", monospace';
        ctx.fillText(lab, x(i) + (i === 0 ? 8 : -8), y(latency[i]) - 12);
        ctx.font = '11px "Roboto Mono", monospace';
      });
    }
  }

  resize();
  window.addEventListener('resize', () => { resize(); frame(1); });

  function run() {
    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      frame(p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (reduce) { frame(1); return; }
  // draw once the figure scrolls into view
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { run(); io.disconnect(); } });
  }, { threshold: 0.4 });
  io.observe(canvas);
})();
