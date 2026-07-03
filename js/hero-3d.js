/**
 * Hero 3D — a slowly rotating institutional lattice.
 * Custom perspective projection on a 2D canvas: zero dependencies,
 * depth-scaled nodes and edges, mouse-tilt parallax, scroll fade.
 * Respects prefers-reduced-motion (renders a single static frame).
 */

(function () {
  const canvas = document.getElementById('hero-3d');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ACCENT = [124, 58, 237];   // violet nodes
  const INK = [15, 15, 15];        // near-black edges

  let W, H, DPR, CX, CY;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    // lattice sits right-of-center on desktop, centered on mobile
    CX = W > 768 ? W * 0.68 : W * 0.5;
    CY = H * 0.48;
  }

  // ── Build the lattice: points on a fibonacci sphere + a few
  //    interior points, edges between near neighbours ─────────
  const N = 110;
  const R = 300;
  const points = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    // two shells + slight radial jitter → structured but organic
    const shell = i % 3 === 0 ? 0.62 : 1;
    const jitter = 0.92 + ((i * 2654435761) % 100) / 100 * 0.16;
    const r = R * shell * jitter;
    points.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
      s: 1.4 + ((i * 40503) % 100) / 100 * 2.2
    });
  }

  const edges = [];
  const MAX_D = R * 0.52;
  for (let i = 0; i < N; i++) {
    let linked = 0;
    for (let j = i + 1; j < N && linked < 3; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dz = points[i].z - points[j].z;
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < MAX_D) {
        edges.push([i, j]);
        linked++;
      }
    }
  }

  // ── Interaction state ──────────────────────────────────────
  let rotY = 0.4, rotX = -0.18;
  let targetTiltX = 0, targetTiltY = 0, tiltX = 0, tiltY = 0;
  let scrollFade = 1;

  document.addEventListener('mousemove', (e) => {
    targetTiltY = (e.clientX / window.innerWidth - 0.5) * 0.35;
    targetTiltX = (e.clientY / window.innerHeight - 0.5) * 0.25;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const h = canvas.clientHeight || 1;
    scrollFade = Math.max(0, 1 - window.scrollY / (h * 0.9));
  }, { passive: true });

  // ── Projection + draw ──────────────────────────────────────
  const FOV = 720;

  function project(p, sy, cy_, sx, cx_) {
    // rotate around Y, then X
    const x1 = p.x * cy_ - p.z * sy;
    const z1 = p.x * sy + p.z * cy_;
    const y1 = p.y * cx_ - z1 * sx;
    const z2 = p.y * sx + z1 * cx_;
    const scale = FOV / (FOV + z2);
    return { x: CX + x1 * scale, y: CY + y1 * scale, scale, z: z2 };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    if (scrollFade <= 0.01) return;

    const sy = Math.sin(rotY + tiltY), cy_ = Math.cos(rotY + tiltY);
    const sx = Math.sin(rotX + tiltX), cx_ = Math.cos(rotX + tiltX);

    const proj = points.map(p => project(p, sy, cy_, sx, cx_));

    // edges first, faint, fading with depth
    for (const [a, b] of edges) {
      const pa = proj[a], pb = proj[b];
      const depth = (pa.scale + pb.scale) / 2;           // ~0.7..1.4
      const alpha = Math.max(0, (depth - 0.75) * 0.32) * scrollFade;
      if (alpha <= 0.004) continue;
      ctx.strokeStyle = `rgba(${INK[0]},${INK[1]},${INK[2]},${alpha})`;
      ctx.lineWidth = 0.7 * depth;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }

    // nodes, violet, size and alpha by depth
    for (let i = 0; i < N; i++) {
      const p = proj[i];
      const alpha = Math.max(0, (p.scale - 0.72) * 1.15) * scrollFade;
      if (alpha <= 0.01) continue;
      ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${Math.min(alpha, 0.92)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, points[i].s * p.scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function tick() {
    rotY += 0.0016;
    rotX += 0.0004;
    tiltX += (targetTiltX - tiltX) * 0.04;
    tiltY += (targetTiltY - tiltY) * 0.04;
    draw();
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);

  if (reduceMotion) {
    draw(); // one static frame, no loop
  } else {
    tick();
  }
})();
