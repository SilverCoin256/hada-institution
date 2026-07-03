/**
 * Research Universe Graph
 * Interactive, zoomable knowledge graph showing research connections
 * Powered by D3.js
 */

class ResearchUniverse {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.zoom = 1;
    this.selectedNode = null;
    this.filteredNodes = new Set();
    this.filteredLinks = new Set();

    this.init();
  }

  init() {
    this.createSVG();
    this.setupForces();
    this.render();
    this.setupInteractions();
  }

  createSVG() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.svg.setAttribute('style', 'background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; cursor: grab;');
    this.container.appendChild(this.svg);

    // Background
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'bgGrad');
    grad.setAttribute('x1', '0%');
    grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#ffffff');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#f9fafb');

    grad.appendChild(stop1);
    grad.appendChild(stop2);
    defs.appendChild(grad);
    this.svg.appendChild(defs);

    // Groups for layering
    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    this.linksGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    this.g.appendChild(this.linksGroup);
    this.g.appendChild(this.nodesGroup);
    this.svg.appendChild(this.g);
  }

  setupForces() {
    // Simple force simulation without d3
    this.simulation = {
      nodes: this.data.nodes,
      links: this.data.links,
      running: true,
      alpha: 1,
      alphaTarget: 0.3,
      alphaDecay: 0.0228,
      velocityDecay: 0.4,
    };

    // Initialize positions
    this.simulation.nodes.forEach((node, i) => {
      if (!node.x) {
        node.x = this.width * 0.5 + Math.cos(i / this.simulation.nodes.length * Math.PI * 2) * 200;
        node.y = this.height * 0.5 + Math.sin(i / this.simulation.nodes.length * Math.PI * 2) * 200;
      }
      node.vx = 0;
      node.vy = 0;
    });

    this.startSimulation();
  }

  startSimulation() {
    const tick = () => {
      // Apply forces
      this.applyForces();

      // Update positions
      this.simulation.nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
      });

      // Decay
      this.simulation.alpha += (this.simulation.alphaTarget - this.simulation.alpha) * 0.05;

      this.render();

      if (this.simulation.alpha > 0.001) {
        requestAnimationFrame(tick);
      }
    };

    tick();
  }

  applyForces() {
    const alpha = this.simulation.alpha;
    const nodes = this.simulation.nodes;
    const links = this.simulation.links;

    // Repulsion (many-body)
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const strength = (alpha * -300) / distance;

        a.vx += (dx / distance) * strength;
        a.vy += (dy / distance) * strength;
        b.vx -= (dx / distance) * strength;
        b.vy -= (dy / distance) * strength;
      }
    }

    // Attraction (links)
    links.forEach(link => {
      const a = nodes[link.source];
      const b = nodes[link.target];
      if (!a || !b) return;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const strength = (alpha * 0.1) * (distance - 100);

      a.vx += (dx / distance) * strength;
      a.vy += (dy / distance) * strength;
      b.vx -= (dx / distance) * strength;
      b.vy -= (dy / distance) * strength;
    });

    // Damping
    nodes.forEach(node => {
      node.vx *= this.simulation.velocityDecay;
      node.vy *= this.simulation.velocityDecay;
    });
  }

  render() {
    const filtering = this.filteredNodes.size > 0;

    // Render links
    this.linksGroup.innerHTML = '';
    this.simulation.links.forEach((link, i) => {
      const a = this.simulation.nodes[link.source];
      const b = this.simulation.nodes[link.target];
      if (!a || !b) return;

      const dimmed = filtering && !this.filteredLinks.has(i);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
      line.setAttribute('stroke', '#d1d5db');
      line.setAttribute('stroke-width', link.weight || 1);
      line.setAttribute('opacity', dimmed ? 0.05 : 0.3);

      if (link.type === 'contradicts') {
        line.setAttribute('stroke-dasharray', '5,5');
      }

      this.linksGroup.appendChild(line);
    });

    // Render nodes
    this.nodesGroup.innerHTML = '';
    this.simulation.nodes.forEach((node, i) => {
      const dimmed = filtering && !this.filteredNodes.has(i);
      const baseOpacity = dimmed ? 0.12 : 0.8;

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${node.x},${node.y})`);
      g.setAttribute('data-node-id', node.id);
      g.style.cursor = 'pointer';

      // Circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', node.size || 8);
      circle.setAttribute('fill', this.getNodeColor(node.type));
      circle.setAttribute('opacity', baseOpacity);
      circle.setAttribute('stroke', '#fff');
      circle.setAttribute('stroke-width', 2);

      // Hover effect
      g.addEventListener('mouseenter', () => {
        circle.setAttribute('opacity', 1);
        circle.setAttribute('r', (node.size || 8) * 1.5);
        circle.setAttribute('stroke-width', 3);
        this.showTooltip(node, node.x, node.y);
      });

      g.addEventListener('mouseleave', () => {
        circle.setAttribute('opacity', baseOpacity);
        circle.setAttribute('r', node.size || 8);
        circle.setAttribute('stroke-width', 2);
        this.hideTooltip();
      });

      g.addEventListener('click', () => this.selectNode(node));

      g.appendChild(circle);
      this.nodesGroup.appendChild(g);
    });
  }

  getNodeColor(type) {
    const colors = {
      question: '#1e40af',
      paper: '#2563eb',
      experiment: '#0d9488',
      dataset: '#10b981',
      finding: '#f59e0b',
      institution: '#9ca3af',
      concept: '#8b5cf6',
    };
    return colors[type] || '#6b7280';
  }

  setupInteractions() {
    // Mouse wheel zoom
    this.svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      this.setZoom(this.zoom * factor);
    });

    // Pan (click and drag)
    let isPanning = false;
    let panX = 0, panY = 0;

    this.svg.addEventListener('mousedown', (e) => {
      if (e.target === this.svg) {
        isPanning = true;
        panX = e.clientX;
        panY = e.clientY;
        this.svg.style.cursor = 'grabbing';
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (isPanning) {
        const dx = e.clientX - panX;
        const dy = e.clientY - panY;
        const transform = this.g.getAttribute('transform') || '';
        const translate = this.getTranslate();
        this.g.setAttribute('transform', `translate(${translate.x + dx},${translate.y + dy}) scale(${this.zoom})`);
        panX = e.clientX;
        panY = e.clientY;
      }
    });

    document.addEventListener('mouseup', () => {
      if (isPanning) {
        isPanning = false;
        this.svg.style.cursor = 'grab';
      }
    });

    // Filter buttons (if they exist)
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => this.filter(btn.dataset.filter));
    });

    // Search
    const searchInput = document.getElementById('research-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.search(e.target.value));
    }
  }

  setZoom(newZoom) {
    newZoom = Math.max(0.5, Math.min(4, newZoom));
    this.zoom = newZoom;
    const translate = this.getTranslate();
    this.g.setAttribute('transform', `translate(${translate.x},${translate.y}) scale(${this.zoom})`);
  }

  getTranslate() {
    const transform = this.g.getAttribute('transform') || '';
    const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
    return {
      x: match ? parseFloat(match[1]) : 0,
      y: match ? parseFloat(match[2]) : 0,
    };
  }

  filter(type) {
    this.filteredNodes.clear();
    this.filteredLinks.clear();

    if (type === 'all') {
      this.render();
      return;
    }

    // Show only nodes of this type and connected nodes
    const nodeIndices = this.simulation.nodes
      .map((n, i) => (n.type === type ? i : -1))
      .filter(i => i !== -1);

    nodeIndices.forEach(i => this.filteredNodes.add(i));

    // Show connected nodes
    this.simulation.links.forEach((link, i) => {
      if (this.filteredNodes.has(link.source) || this.filteredNodes.has(link.target)) {
        this.filteredNodes.add(link.source);
        this.filteredNodes.add(link.target);
        this.filteredLinks.add(i);
      }
    });

    this.render();
  }

  search(query) {
    if (!query.trim()) {
      this.render();
      return;
    }

    this.filteredNodes.clear();
    this.simulation.nodes.forEach((node, i) => {
      if (node.title.toLowerCase().includes(query.toLowerCase()) ||
          (node.keywords && node.keywords.some(k => k.toLowerCase().includes(query.toLowerCase())))) {
        this.filteredNodes.add(i);
      }
    });

    this.render();
  }

  selectNode(node) {
    this.selectedNode = node;
    this.showDetail(node);
  }

  showTooltip(node, x, y) {
    let tooltip = document.getElementById('graph-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'graph-tooltip';
      tooltip.style.cssText = `
        position: fixed;
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        pointer-events: none;
      `;
      document.body.appendChild(tooltip);
    }

    tooltip.innerHTML = `<strong>${node.title}</strong><br><span style="font-size: 12px; color: #666;">${node.type}</span>`;
    tooltip.style.left = (x + 20) + 'px';
    tooltip.style.top = (y - 30) + 'px';
  }

  hideTooltip() {
    const tooltip = document.getElementById('graph-tooltip');
    if (tooltip) tooltip.style.display = 'none';
  }

  showDetail(node) {
    // Emit event or update sidebar with node details
    const event = new CustomEvent('nodeSelected', { detail: node });
    document.dispatchEvent(event);
  }

  destroy() {
    this.simulation.running = false;
    this.svg.remove();
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResearchUniverse;
}
