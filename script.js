/* ═══════════════════════════════════════════════════════
   NASHPIT — Interactivity & Animations
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Hero Word Rotation ── */
  const pairs = [
    ['COOPERATE', 'DEFECT'],
    ['SPLIT', 'STEAL'],
    ['TRUST', 'BETRAY'],
    ['ALLY', 'EXPLOIT'],
    ['SHARE', 'HOARD']
  ];

  const wordLeft = document.getElementById('wordLeft');
  const wordRight = document.getElementById('wordRight');
  let pairIdx = 0;

  if (wordLeft && wordRight) {
    setInterval(() => {
      wordLeft.classList.add('word-fade-out');
      wordRight.classList.add('word-fade-out');

      setTimeout(() => {
        pairIdx = (pairIdx + 1) % pairs.length;
        wordLeft.textContent = pairs[pairIdx][0];
        wordRight.textContent = pairs[pairIdx][1];
        wordLeft.classList.remove('word-fade-out');
        wordRight.classList.remove('word-fade-out');
      }, 400);
    }, 3000);
  }

  /* ── 2. Pixel Art Crabs ── */
  const crabOrange = [
    '..111.111..',
    '.1O1O1O1O1.',
    '1OO.OOO.OO1',
    '1OOO1O1OOO1',
    '.1OOOOOOO1.',
    '..1O.O.O1..',
    '.1.1.1.1.1.',
    '1...1.1...1',
  ];

  const crabWhite = [
    '..111.111..',
    '.1W1W1W1W1.',
    '1WW.WWW.WW1',
    '1WWW1W1WWW1',
    '.1WWWWWWW1.',
    '..1W.W.W1..',
    '.1.1.1.1.1.',
    '1...1.1...1',
  ];

  function drawCrab(canvasId, pattern, mainColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const px = canvas.width / 12;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pattern.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch === '.') continue;
        if (ch === '1') ctx.fillStyle = '#333';
        else ctx.fillStyle = mainColor;
        ctx.fillRect(x * px, (y + 1) * px, px, px);
      }
    });
  }

  drawCrab('crab1', crabOrange, '#FF6B00');
  drawCrab('crab2', crabWhite, '#FFFFFF');

  /* ── 3. Crab Chat Bubbles (real conversations) ── */
  const conversations = [
    { b1: "let's cooperate?", b2: "sure bro", c1: 'cooperate', c2: 'cooperate' },
    { b1: "trust me this time", b2: "nah you burned me", c1: 'cooperate', c2: 'defect' },
    { b1: "i'll be nice", b2: "lol ok", c1: 'cooperate', c2: 'cooperate' },
    { b1: "defecting lmao", b2: "wow rude", c1: 'defect', c2: 'cooperate' },
    { b1: "truce?", b2: "truce", c1: 'cooperate', c2: 'cooperate' },
    { b1: "gg no re", b2: "cope", c1: 'defect', c2: 'defect' },
    { b1: "be rational", b2: "being rational", c1: 'defect', c2: 'defect' },
    { b1: "one more chance?", b2: "fine", c1: 'cooperate', c2: 'cooperate' },
    { b1: "gonna betray u", b2: "you wouldn't", c1: 'defect', c2: 'cooperate' },
    { b1: "we go again", b2: "cooperate tho", c1: 'cooperate', c2: 'cooperate' },
    { b1: "sorry about last round", b2: "no worries", c1: 'cooperate', c2: 'cooperate' },
    { b1: "calculated move", b2: "you're bluffing", c1: 'defect', c2: 'cooperate' },
    { b1: "this is game theory", b2: "this is personal", c1: 'defect', c2: 'defect' },
  ];

  const bubble1 = document.getElementById('bubble1');
  const bubble2 = document.getElementById('bubble2');
  let convoIdx = 0;

  function cycleBubbles() {
    if (!bubble1 || !bubble2) return;
    const c = conversations[convoIdx];

    bubble1.classList.remove('visible', 'cooperate', 'defect');
    bubble2.classList.remove('visible', 'cooperate', 'defect');

    setTimeout(() => {
      bubble1.textContent = c.b1;
      bubble1.classList.add('visible', c.c1);
    }, 200);

    setTimeout(() => {
      bubble2.textContent = c.b2;
      bubble2.classList.add('visible', c.c2);
    }, 900);

    convoIdx = (convoIdx + 1) % conversations.length;
  }

  cycleBubbles();
  setInterval(cycleBubbles, 3500);

  /* ── 4. Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  /* ── 5. Conflict Simulation Canvas (animated orbits) ── */
  const conflictCanvas = document.getElementById('conflictCanvas');
  if (conflictCanvas) {
    const ctx = conflictCanvas.getContext('2d');
    const W = 400, H = 340;
    const cx = W / 2, cy = H / 2;
    let t = 0;

    function drawConflict() {
      ctx.clearRect(0, 0, W, H);

      // Grid lines (subtle)
      ctx.strokeStyle = 'rgba(255,107,0,0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < W; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
      }
      for (let i = 0; i < H; i += 30) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke();
      }

      // Orbits
      const orbitA = { rx: 120, ry: 60, tilt: -0.3, color: 'rgba(255,107,0,0.5)', fill: 'rgba(255,107,0,0.04)' };
      const orbitB = { rx: 100, ry: 80, tilt: 0.5, color: 'rgba(255,80,80,0.4)', fill: 'rgba(255,80,80,0.03)' };
      const orbitC = { rx: 140, ry: 50, tilt: 0.15, color: 'rgba(255,255,255,0.15)', fill: 'rgba(255,255,255,0.01)' };

      function drawOrbit(o) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(o.tilt);
        ctx.strokeStyle = o.color;
        ctx.lineWidth = 1;
        ctx.fillStyle = o.fill;
        ctx.beginPath();
        ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      drawOrbit(orbitA);
      drawOrbit(orbitB);
      drawOrbit(orbitC);

      // Moving dots on orbits
      function drawDot(orbit, speed, size, glow) {
        const angle = t * speed;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(orbit.tilt);
        const dx = Math.cos(angle) * orbit.rx;
        const dy = Math.sin(angle) * orbit.ry;
        ctx.restore();

        // Calculate world position
        const cosT = Math.cos(orbit.tilt), sinT = Math.sin(orbit.tilt);
        const wx = cx + dx * cosT - dy * sinT;
        const wy = cy + dx * sinT + dy * cosT;

        // Glow
        ctx.beginPath();
        ctx.arc(wx, wy, size + 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(wx, wy, size, 0, Math.PI * 2);
        ctx.fillStyle = orbit.color.replace(/[\d.]+\)$/, '0.9)');
        ctx.fill();
      }

      drawDot(orbitA, 0.012, 4, 'rgba(255,107,0,0.15)');
      drawDot(orbitB, -0.008, 3, 'rgba(255,80,80,0.12)');
      drawDot(orbitC, 0.005, 2.5, 'rgba(255,255,255,0.08)');

      // Center crosshair
      ctx.strokeStyle = 'rgba(255,107,0,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 12, cy); ctx.lineTo(cx + 12, cy);
      ctx.moveTo(cx, cy - 12); ctx.lineTo(cx, cy + 12);
      ctx.stroke();

      // Center circle
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,107,0,0.6)';
      ctx.fill();

      // Faint pulsing ring
      const pulse = 20 + Math.sin(t * 0.03) * 8;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,107,0,${0.1 + Math.sin(t * 0.03) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      t++;
      requestAnimationFrame(drawConflict);
    }

    // Only animate when visible
    const conflictObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        drawConflict();
        conflictObs.unobserve(conflictCanvas);
      }
    }, { threshold: 0.2 });
    conflictObs.observe(conflictCanvas);
  }

  /* ── 5.5. Live Match Viewer (Landing Page) ── */
  const matchViewer = document.getElementById('battleSim');
  if (matchViewer) {
    // Pixel Art Crabs
    const crabO = [
      '..111.111..',
      '.1O1O1O1O1.',
      '1OO.OOO.OO1',
      '1OOO1O1OOO1',
      '.1OOOOOOO1.',
      '..1O.O.O1..',
      '.1.1.1.1.1.',
      '1...1.1...1',
    ];
    const crabW = [
      '..111.111..',
      '.1W1W1W1W1.',
      '1WW.WWW.WW1',
      '1WWW1W1WWW1',
      '.1WWWWWWW1.',
      '..1W.W.W1..',
      '.1.1.1.1.1.',
      '1...1.1...1',
    ];

    function drawMatchCrab(id, pattern, color) {
      const c = document.getElementById(id);
      if (!c) return;
      const ctx = c.getContext('2d');
      const px = c.width / 11;
      ctx.clearRect(0, 0, c.width, c.height);
      pattern.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
          const ch = row[x];
          if (ch === '.') continue;
          ctx.fillStyle = ch === '1' ? '#333' : color;
          ctx.fillRect(x * px, (y + 1) * px, px, px);
        }
      });
    }

    drawMatchCrab('matchCrab1', crabO, '#FF6B00');
    drawMatchCrab('matchCrab2', crabW, '#FFFFFF');

    // Simulation State
    const roundEl = document.getElementById('simRound');
    const score1El = document.getElementById('score1');
    const score2El = document.getElementById('score2');
    const movesEl = document.getElementById('matchMoves');
    const chatEl = document.getElementById('matchChat');
    const graphCanvas = document.getElementById('scoreGraph');

    let s1 = 0, s2 = 0, round = 0;
    const total = 20;
    const maxRoundPoints = 5;

    // Arrays for history
    const rh1 = []; // Round history agent 1 (points)
    const rh2 = []; // Round history agent 2 (points)
    const h1 = [], h2 = []; // Move history
    const betrayalEvents = []; // Betrayal markers by round

    const chatDB = {
      cc: [
        ["we got this", "together strong"],
        ["cooperate?", "always"],
        ["gg", "gg"],
        ["mutual trust", "respect"],
      ],
      cd: [
        ["let's be friends", "nah defecting"],
        ["cooperating here", "thanks for points"],
        ["peace offering", "declined"],
        ["i trust you", "mistake"],
      ],
      dc: [
        ["surprise", "BRO WHAT"],
        ["defecting sorry", "unforgivable"],
        ["calculated risk", "you monster"],
        ["nothing personal", "personal now"],
      ],
      dd: [
        ["defect", "defect"],
        ["war it is", "bring it"],
        ["no mercy", "same"],
        ["nash equilibrium", "we both lose"],
      ]
    };

    // Icons
    const iconHandshake = `<svg viewBox="0 0 24 24" aria-hidden="true" class="match-move-icon cooperate"><title>Cooperate</title><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><path d="M2.5 19c1.2-2.3 3.1-3.8 5.5-3.8 2.4 0 4.3 1.5 5.5 3.8"/><path d="M10.5 19c1-1.9 2.7-3.1 5.5-3.1 2 0 3.8.9 5 3.1"/></svg>`;
    const iconSword = `<svg viewBox="0 0 24 24" aria-hidden="true" class="match-move-icon defect"><title>Defect</title><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>`;

    function addChatMsg(author, text, isA1) {
      const d = document.createElement('div');
      d.className = 'match-msg';
      d.innerHTML = `<span class="match-msg-name ${isA1 ? 'orange' : 'white'}">${author}</span><span class="match-msg-text">${text}</span>`;
      chatEl.appendChild(d);
      chatEl.scrollTop = chatEl.scrollHeight;
    }

    function addChatSys(text) {
      const d = document.createElement('div');
      d.className = 'match-msg';
      d.innerHTML = `<span class="match-msg-text" style="color:#666; width:100%; text-align:center; font-size:0.65rem;">// ${text}</span>`;
      chatEl.appendChild(d);
      chatEl.scrollTop = chatEl.scrollHeight;
    }

    function addMoveChip(r, m1, m2) {
      const i1 = m1 === 'C' ? iconHandshake : iconSword;
      const i2 = m2 === 'C' ? iconHandshake : iconSword;

      const d = document.createElement('div');
      d.className = 'match-chip';
      d.innerHTML = `<span class="round-label">R${r}</span> ${i1} <span class="separator">·</span> ${i2}`;
      movesEl.appendChild(d);
      movesEl.scrollLeft = movesEl.scrollWidth;
    }

    let graphResizeRaf = 0;
    function queueGraphRedraw() {
      if (graphResizeRaf) cancelAnimationFrame(graphResizeRaf);
      graphResizeRaf = requestAnimationFrame(() => {
        graphResizeRaf = 0;
        drawScoreGraph();
      });
    }

    function drawScoreGraph() {
      if (!graphCanvas || !graphCanvas.parentElement) return;
      const ctx = graphCanvas.getContext('2d');
      const parent = graphCanvas.parentElement;
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, parent.clientWidth);
      const h = Math.max(1, parent.clientHeight);

      graphCanvas.width = Math.floor(w * dpr);
      graphCanvas.height = Math.floor(h * dpr);
      graphCanvas.style.width = `${w}px`;
      graphCanvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const leftPad = 14;
      const rightPad = 16;
      const topPad = 12;
      const bottomPad = 22;
      const cy = h / 2;
      const availablePlotW = Math.max(1, w - leftPad - rightPad);
      const stepX = availablePlotW / total;
      const plotW = availablePlotW;
      const startX = leftPad;
      const xAtRound = (i) => startX + (i * stepX) + (stepX / 2);

      // Build cumulative arrays first so scaling adapts as the game evolves.
      const c1Values = [0];
      const c2Values = [0];
      let c1 = 0;
      let c2 = 0;
      for (let i = 0; i < rh1.length; i++) {
        c1 += rh1[i];
        c2 += rh2[i];
        c1Values.push(c1);
        c2Values.push(c2);
      }

      const maxHalfHeight = Math.min(cy - topPad, h - bottomPad - cy);
      const capHard = total * maxRoundPoints;
      const maxSeen = Math.max(10, c1, c2);
      const displayCap = Math.max(20, Math.min(capHard, Math.ceil(maxSeen * 1.18)));
      const cumulativeScale = (maxHalfHeight - 2) / displayCap;

      // Axes
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, topPad);
      ctx.lineTo(startX, h - bottomPad);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,0.16)';
      ctx.beginPath();
      ctx.moveTo(startX, cy);
      ctx.lineTo(startX + plotW, cy);
      ctx.stroke();

      // Axis labels and round ticks.
      ctx.font = '600 9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.textAlign = 'right';
      ctx.fillText(String(displayCap), startX - 6, topPad + 3);
      ctx.fillText('0', startX - 6, cy + 3);
      ctx.fillText(String(displayCap), startX - 6, h - bottomPad + 3);

      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (let i = 0; i < total; i++) {
        const roundNumber = i + 1;
        const x = xAtRound(i);
        ctx.strokeStyle = 'rgba(255,255,255,0.14)';
        ctx.beginPath();
        ctx.moveTo(x, cy - 3);
        ctx.lineTo(x, cy + 3);
        ctx.stroke();
        ctx.fillText(String(roundNumber), x, h - 4);
      }

      const c1Points = [{ x: startX, y: cy }];
      const c2Points = [{ x: startX, y: cy }];
      for (let i = 1; i < c1Values.length; i++) {
        const x = xAtRound(i - 1);
        c1Points.push({ x, y: cy - (c1Values[i] * cumulativeScale) });
        c2Points.push({ x, y: cy + (c2Values[i] * cumulativeScale) });
      }

      function drawPath(points, color) {
        if (points.length < 2) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }

      drawPath(c1Points, '#FF6B00'); // Agent_01 (orange, up)
      drawPath(c2Points, '#FFFFFF'); // Agent_02 (white, down)

      // Betrayal markers: dot on the betrayer's line.
      betrayalEvents.forEach((event) => {
        const pointSet = event.betrayer === 1 ? c1Points : c2Points;
        const markerPoint = pointSet[event.round + 1];
        if (!markerPoint) return;
        ctx.beginPath();
        ctx.arc(markerPoint.x, markerPoint.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = event.betrayer === 1 ? '#FF6B00' : '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#0A0A0A';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    function playMatchRound() {
      round++;
      if (round > total) {
        addChatSys(`MATCH OVER — ${s1} vs ${s2}`);
        setTimeout(() => {
          s1 = 0; s2 = 0; round = 0;
          h1.length = 0; h2.length = 0;

          // Reset Histories
          rh1.length = 0; rh2.length = 0;
          betrayalEvents.length = 0;

          score1El.textContent = '0';
          score2El.textContent = '0';
          movesEl.innerHTML = '';
          chatEl.innerHTML = '';

          drawScoreGraph();
          addChatSys('INITIALIZING MATCH...');
          setTimeout(playMatchRound, 900);
        }, 5000);
        return;
      }

      roundEl.textContent = `ROUND ${round} / ${total}`;

      const pay = { cc: [3, 3], cd: [0, 5], dc: [5, 0], dd: [1, 1] };

      // Scripted pressure moments to keep the mock match entertaining.
      const a1PlannedDefects = new Set([6, 11, 16, 19]);
      const a2PlannedDefects = new Set([4, 8, 13, 18, 20]);

      let m1 = round === 1 ? 'C' : h2[h2.length - 1];
      if (a1PlannedDefects.has(round)) m1 = 'D';

      let m2;
      if (a2PlannedDefects.has(round)) {
        m2 = 'D';
      } else {
        m2 = Math.random() < 0.35 ? 'D' : 'C';
      }

      let key = (m1 === 'C' ? 'c' : 'd') + (m2 === 'C' ? 'c' : 'd');

      // Avoid ending in a draw on round 20.
      if (round === total) {
        const finalTest = pay[key];
        if ((s1 + finalTest[0]) === (s2 + finalTest[1])) {
          if (s1 >= s2) {
            m1 = 'C';
            m2 = 'D';
            key = 'cd';
          } else {
            m1 = 'D';
            m2 = 'C';
            key = 'dc';
          }
        }
      }

      h1.push(m1); h2.push(m2);
      const [p1, p2] = pay[key];

      s1 += p1; s2 += p2;

      // Update Histories
      rh1.push(p1); rh2.push(p2);
      if (key === 'dc') betrayalEvents.push({ round: round - 1, betrayer: 1 });
      if (key === 'cd') betrayalEvents.push({ round: round - 1, betrayer: 2 });

      score1El.textContent = s1;
      score2El.textContent = s2;

      // Chat
      const lines = chatDB[key];
      const pick = lines[Math.floor(Math.random() * lines.length)];
      setTimeout(() => addChatMsg('AGENT_01', pick[0], true), 200);
      setTimeout(() => addChatMsg('AGENT_02', pick[1], false), 600);

      addMoveChip(round, m1, m2);
      drawScoreGraph();

      setTimeout(playMatchRound, 1600);
    }

    // Start only when visible
    const matchObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        addChatSys('CONNECTED TO ARENA');
        drawScoreGraph();
        setTimeout(playMatchRound, 800);
        matchObs.unobserve(matchViewer);
      }
    }, { threshold: 0.2 });
    matchObs.observe(matchViewer);
    window.addEventListener('resize', queueGraphRedraw);
  }

  /* ── 6. Mobile Nav Toggle ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

});
