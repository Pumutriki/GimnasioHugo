/* =========================================================================
   figures.js — motor de dibujo de ejercicios (SVG, sin imágenes externas)
   Cada ejercicio se define con dos posturas (inicio / final) de un muñeco
   articulado. La app interpola entre ambas para "animar" el movimiento.
   ========================================================================= */

const SVGNS = 'http://www.w3.org/2000/svg';
const VIEW_W = 220, VIEW_H = 160, GROUND_Y = 152;

function svgEl(name, attrs) {
  const e = document.createElementNS(SVGNS, name);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

/* --- Postura -------------------------------------------------------------
   pose(head, neck, hip, brazoCerca, brazoLejos, piernaCerca, piernaLejos)
   brazo  = [codo, muñeca]
   pierna = [rodilla, tobillo, punta]
------------------------------------------------------------------------- */
function pose(head, neck, hip, armN, armF, legN, legF, headR) {
  return {
    head, neck, hip,
    elbowN: armN[0], wristN: armN[1],
    elbowF: armF[0], wristF: armF[1],
    kneeN: legN[0], ankleN: legN[1], toeN: legN[2],
    kneeF: legF[0], ankleF: legF[1], toeF: legF[2],
    hr: headR || 9
  };
}

const POSE_KEYS = ['head', 'neck', 'hip', 'elbowN', 'wristN', 'elbowF', 'wristF',
  'kneeN', 'ankleN', 'toeN', 'kneeF', 'ankleF', 'toeF'];

function lerpPose(a, b, t) {
  const out = { hr: a.hr + (b.hr - a.hr) * t };
  for (const k of POSE_KEYS) {
    out[k] = [a[k][0] + (b[k][0] - a[k][0]) * t, a[k][1] + (b[k][1] - a[k][1]) * t];
  }
  return out;
}

/* --- Utilidades de dibujo ---------------------------------------------- */
function line(pts, cls, w) {
  return svgEl('polyline', {
    points: pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '),
    class: cls, 'stroke-width': w, fill: 'none',
    'stroke-linecap': 'round', 'stroke-linejoin': 'round'
  });
}

function dirPerp(a, b, len) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const m = Math.hypot(dx, dy) || 1;
  return [-dy / m * len, dx / m * len];
}

/* Mancuerna dibujada en la muñeca, perpendicular al antebrazo */
function dumbbell(g, elbow, wrist, size) {
  const s = size || 1;
  const [px, py] = dirPerp(elbow, wrist, 9 * s);
  const a = [wrist[0] - px, wrist[1] - py], b = [wrist[0] + px, wrist[1] + py];
  g.appendChild(line([a, b], 'gear', 3));
  for (const p of [a, b]) {
    const [qx, qy] = dirPerp(elbow, wrist, 4.5 * s);
    g.appendChild(line([[p[0] - qx * 0.0 + (p[0] - wrist[0]) * 0.05, p[1]], [p[0], p[1]]], 'gear', 3));
    g.appendChild(svgEl('circle', { cx: p[0], cy: p[1], r: 4.6 * s, class: 'gear-fill' }));
  }
}

/* Barra recta entre las dos muñecas (o de longitud fija si sólo hay una) */
function barbell(g, w1, w2, extend) {
  const ex = extend == null ? 26 : extend;
  const dx = w2[0] - w1[0], dy = w2[1] - w1[1];
  const m = Math.hypot(dx, dy) || 1;
  const ux = dx / m, uy = dy / m;
  const a = [w1[0] - ux * ex, w1[1] - uy * ex];
  const b = [w2[0] + ux * ex, w2[1] + uy * ex];
  g.appendChild(line([a, b], 'gear', 3.5));
  g.appendChild(svgEl('circle', { cx: a[0], cy: a[1], r: 7, class: 'gear-fill' }));
  g.appendChild(svgEl('circle', { cx: b[0], cy: b[1], r: 7, class: 'gear-fill' }));
}

/* --- Escenografía (banco, cajón, máquina...) ---------------------------- */
const SCENE = {
  suelo: (g) => g.appendChild(line([[6, GROUND_Y], [214, GROUND_Y]], 'scene', 3)),

  banco: (g, o) => {                       // banco plano
    const x = o.x, y = o.y, w = o.w;
    g.appendChild(svgEl('rect', { x, y, width: w, height: 8, rx: 3, class: 'scene-fill' }));
    g.appendChild(line([[x + 10, y + 8], [x + 10, GROUND_Y]], 'scene', 4));
    g.appendChild(line([[x + w - 10, y + 8], [x + w - 10, GROUND_Y]], 'scene', 4));
  },

  cajon: (g, o) => {                       // cajón / step / silla
    g.appendChild(svgEl('rect', { x: o.x, y: o.y, width: o.w, height: GROUND_Y - o.y, rx: 3, class: 'scene-fill' }));
  },

  mesa: (g, o) => {                        // mesa firme para remo invertido
    g.appendChild(svgEl('rect', { x: o.x, y: o.y, width: o.w, height: 7, rx: 2, class: 'scene-fill' }));
    g.appendChild(line([[o.x + 6, o.y + 7], [o.x + 6, GROUND_Y]], 'scene', 4));
    g.appendChild(line([[o.x + o.w - 6, o.y + 7], [o.x + o.w - 6, GROUND_Y]], 'scene', 4));
  },

  trx: (g, o) => {                         // anclaje alto + dos cintas
    g.appendChild(line([[o.ax - 16, o.ay], [o.ax + 16, o.ay]], 'scene', 4));
    g.appendChild(line([[o.ax, o.ay], [o.hx, o.hy]], 'gear', 2.5));
    g.appendChild(line([[o.ax, o.ay], [o.hx - 6, o.hy + 4]], 'gear', 2.5));
  },

  polea: (g, o) => {                       // torre de poleas (jalón) + asiento
    g.appendChild(line([[o.x, 8], [o.x, GROUND_Y]], 'scene', 5));
    g.appendChild(line([[o.x, 10], [o.cx, 10]], 'scene', 4));
    g.appendChild(svgEl('rect', { x: o.sx, y: o.sy, width: o.sw, height: 9, rx: 3, class: 'scene-fill' }));
    g.appendChild(line([[o.sx + o.sw / 2, o.sy + 9], [o.sx + o.sw / 2, GROUND_Y]], 'scene', 5));
  },

  cable: (g, o) => {                       // anclaje lateral de polea/goma
    g.appendChild(line([[o.ax, o.ay - 22], [o.ax, o.ay + 34]], 'scene', 5));
    g.appendChild(line([[o.ax, o.ay], [o.hx, o.hy]], 'gear', 2.5));
  },

  maquinaCurl: (g, o) => {                 // camilla de femoral + rodillo
    g.appendChild(svgEl('rect', { x: o.x, y: o.y, width: o.w, height: 9, rx: 3, class: 'scene-fill' }));
    g.appendChild(line([[o.x + 12, o.y + 9], [o.x + 12, GROUND_Y]], 'scene', 4));
    g.appendChild(line([[o.x + o.w - 12, o.y + 9], [o.x + o.w - 12, GROUND_Y]], 'scene', 4));
  },

  pared: (g, o) => g.appendChild(line([[o.x, 10], [o.x, GROUND_Y]], 'scene', 4)),

  barraFija: (g, o) => {                   // barra de dominadas
    g.appendChild(line([[o.x1, o.y], [o.x2, o.y]], 'scene', 5));
    g.appendChild(line([[o.x1 + 4, o.y], [o.x1 + 4, GROUND_Y]], 'scene', 4));
    g.appendChild(line([[o.x2 - 4, o.y], [o.x2 - 4, GROUND_Y]], 'scene', 4));
  },

  anclaje: (g, o) => {                     // sujeción de tobillos (curl nórdico)
    g.appendChild(svgEl('rect', { x: o.x, y: o.y, width: o.w, height: 9, rx: 4, class: 'scene-fill' }));
  },

  colchoneta: (g, o) => {                  // colchoneta / esterilla
    g.appendChild(svgEl('rect', { x: o.x, y: GROUND_Y - 5, width: o.w, height: 6, rx: 3, class: 'scene-fill' }));
  }
};

/* --- Dibujo del muñeco -------------------------------------------------- */
function drawPose(g, p, ex) {
  // material que va POR DETRÁS del cuerpo
  if (ex.gear === 'goma') g.appendChild(line([[200, 74], p.wristN], 'gear', 2.5));
  if (ex.gear === 'goma-alta') g.appendChild(line([[204, 30], p.wristN], 'gear', 2.5));
  if (ex.gear === 'goma-izq') g.appendChild(line([[16, 78], p.wristN], 'gear', 2.5));
  if (ex.gear === 'jalon') {
    const mx = (p.wristN[0] + p.wristF[0]) / 2, my = (p.wristN[1] + p.wristF[1]) / 2;
    g.appendChild(line([[118, 10], [mx, my]], 'gear', 2));
  }
  // extremidades lejanas (tono apagado, dan sensación de profundidad)
  g.appendChild(line([p.neck, p.elbowF, p.wristF], 'limb-far', 6));
  g.appendChild(line([p.hip, p.kneeF, p.ankleF, p.toeF], 'limb-far', 6));
  // tronco
  g.appendChild(line([p.neck, p.hip], 'limb', 8));
  // cabeza
  const hn = [p.neck[0] - p.head[0], p.neck[1] - p.head[1]];
  const hm = Math.hypot(hn[0], hn[1]) || 1;
  g.appendChild(line([[p.head[0] + hn[0] / hm * p.hr, p.head[1] + hn[1] / hm * p.hr], p.neck], 'limb', 6));
  g.appendChild(svgEl('circle', { cx: p.head[0], cy: p.head[1], r: p.hr, class: 'head' }));
  // extremidades cercanas
  g.appendChild(line([p.hip, p.kneeN, p.ankleN, p.toeN], 'limb', 7));
  g.appendChild(line([p.neck, p.elbowN, p.wristN], 'limb', 7));

  // material que sigue a las manos
  switch (ex.gear) {
    case 'mancuernas':
      dumbbell(g, p.elbowN, p.wristN); dumbbell(g, p.elbowF, p.wristF); break;
    case 'mancuerna1':
      dumbbell(g, p.elbowN, p.wristN); break;
    case 'mancuernas-pesadas':
      dumbbell(g, p.elbowN, p.wristN, 1.25); dumbbell(g, p.elbowF, p.wristF, 1.25); break;
    case 'barra':
      barbell(g, p.wristF, p.wristN, 24); break;
    case 'barra-cadera':
      barbell(g, [p.hip[0] - 4, p.hip[1] - 6], [p.hip[0] + 4, p.hip[1] - 6], 20); break;
    case 'jalon':
      barbell(g, p.wristF, p.wristN, 22); break;
    case 'rodillo':
      g.appendChild(svgEl('circle', { cx: p.ankleN[0], cy: p.ankleN[1], r: 10, class: 'gear-fill' })); break;
    case 'balon': {                               // balón medicinal entre las manos
      const bx = (p.wristN[0] + p.wristF[0]) / 2, by = (p.wristN[1] + p.wristF[1]) / 2;
      g.appendChild(svgEl('circle', { cx: bx, cy: by, r: 12, class: 'gear-fill' })); break;
    }
    case 'barra-espalda':                         // barra sobre los hombros (sentadilla)
      barbell(g, p.wristF, p.wristN, 30); break;
  }
}

/* --- API pública -------------------------------------------------------- */
/* Crea el SVG de un ejercicio. anim=true → alterna entre las dos posturas. */
function makeFigure(ex, opts) {
  opts = opts || {};
  const svg = svgEl('svg', {
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    class: 'fig' + (opts.small ? ' fig-small' : ''),
    role: 'img', 'aria-label': ex.nombre
  });

  const scene = svgEl('g', {});
  svg.appendChild(scene);
  SCENE.suelo(scene);
  (ex.scene || []).forEach(s => { if (SCENE[s.t]) SCENE[s.t](scene, s); });

  const body = svgEl('g', {});
  svg.appendChild(body);

  const A = ex.poseA, B = ex.poseB || ex.poseA;

  const render = (t) => {
    while (body.firstChild) body.removeChild(body.firstChild);
    drawPose(body, lerpPose(A, B, t), ex);
  };

  render(0);                                   // primer fotograma siempre dibujado
  if (!opts.anim || !ex.poseB) return svg;

  // ciclo: baja (0→1), pausa, sube (1→0), pausa
  const dur = ex.tempo || 1500, hold = 380;
  let start = null, raf = 0;
  const ease = x => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const loop = (ts) => {
    if (start === null) start = ts;
    const total = (dur + hold) * 2;
    const e = (ts - start) % total;
    let t;
    if (e < dur) t = ease(e / dur);
    else if (e < dur + hold) t = 1;
    else if (e < dur * 2 + hold) t = ease(1 - (e - dur - hold) / dur);
    else t = 0;
    render(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  svg.stop = () => cancelAnimationFrame(raf);
  return svg;
}
