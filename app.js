/* =========================================================================
   app.js — Gimnasio de Hugo · programa de pretemporada de balonmano
   ========================================================================= */
const KEY = 'gimnasioHugo.v2';

const DEF = {
  inicio: INICIO_PLAN,      // primer día del programa
  descanso: 120,            // segundos por defecto entre series
  sonido: true,
  sesiones: [],             // histórico
  activa: null              // sesión de fuerza en curso
};

let S = cargar();

function cargar() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    const s = Object.assign({}, DEF, raw);
    s.sesiones.sort((a, b) => (a.dia || 0) - (b.dia || 0));
    return s;
  } catch (e) { return Object.assign({}, DEF); }
}
function guardar() {
  S.sesiones.sort((a, b) => (a.dia || 0) - (b.dia || 0));
  localStorage.setItem(KEY, JSON.stringify(S));
}

/* ---------- fechas ---------- */
/* Ojo: nada de toISOString() para fechas locales — en España devuelve el día
   anterior, porque la medianoche local es el día de antes en horario UTC. */
const iso = (f) => f.getFullYear() + '-' + String(f.getMonth() + 1).padStart(2, '0') + '-' + String(f.getDate()).padStart(2, '0');
const hoyISO = () => iso(new Date());
const dias = (a, b) => Math.round((new Date(b + 'T00:00') - new Date(a + 'T00:00')) / 86400000);

function fechaDeDia(d) {
  const f = new Date(S.inicio + 'T00:00');
  f.setDate(f.getDate() + d - 1);
  return iso(f);
}
function diaDeHoy() { return dias(S.inicio, hoyISO()) + 1; }

function fechaCorta(iso) {
  return new Date(iso + 'T00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}
function diaSemana(iso) {
  const d = new Date(iso + 'T00:00').toLocaleDateString('es-ES', { weekday: 'long' });
  return d.charAt(0).toUpperCase() + d.slice(1);
}
function fechaLarga(iso) {
  return new Date(iso + 'T00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}

/* ---------- utilidades ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const num = (v) => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : null; };
const fmtKg = (n) => (n % 1 === 0 ? String(n) : String(n).replace('.', ','));
const llenas = (arr) => (arr || []).filter(x => x && (x.kg != null || x.reps != null));

function toast(msg) {
  let t = $('.toast');
  if (!t) { t = h('<div class="toast"></div>'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2400);
}

const diaDelPlan = (d) => CALENDARIO.find(c => c.d === d);
const sesionDeDia = (d) => { const c = diaDelPlan(d); return c ? SESIONES[c.s] : null; };
const hecho = (d) => S.sesiones.some(s => s.dia === d);
const primerNumero = (txt) => { const m = String(txt).match(/\d+/); return m ? m[0] : ''; };

function totalSeries(s) {
  return Object.values(s.ejercicios || {}).reduce((a, v) => a + llenas(v).length, 0);
}
function limpiarSesion(s) {
  const out = {};
  for (const id in s.ejercicios) {
    const ll = llenas(s.ejercicios[id]);
    if (ll.length) out[id] = ll;
  }
  s.ejercicios = out;
  return s;
}
function ultimaVez(ejId) {
  for (let i = S.sesiones.length - 1; i >= 0; i--) {
    const s = S.sesiones[i];
    if (s.ejercicios && s.ejercicios[ejId] && s.ejercicios[ejId].length)
      return { fecha: s.fecha, series: s.ejercicios[ejId] };
  }
  return null;
}

/* ========================= SONIDO Y VIBRACIÓN ========================= */
let AC = null;
function beep(freq, ms, vol) {
  if (!S.sonido) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === 'suspended') AC.resume();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(vol || .25, AC.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, AC.currentTime + ms / 1000);
    o.connect(g); g.connect(AC.destination);
    o.start(); o.stop(AC.currentTime + ms / 1000);
  } catch (e) { }
}
const vibra = (p) => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) { } };
const tic = () => { beep(760, 120); vibra(60); };
const gong = () => { beep(520, 180); setTimeout(() => beep(880, 380, .3), 190); vibra([120, 70, 220]); };

let wakeLock = null;
async function mantenerPantalla(on) {
  try {
    if (on && 'wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen');
    else if (wakeLock) { wakeLock.release(); wakeLock = null; }
  } catch (e) { }
}

/* ========================= NAVEGACIÓN ========================= */
let vista = { n: 'hoy', p: {} };

function go(n, p, reemplazar) {
  vista = { n, p: p || {} };
  const st = { n, p: vista.p };
  if (reemplazar) history.replaceState(st, ''); else history.pushState(st, '');
  pintar();
  window.scrollTo(0, 0);
}
window.addEventListener('popstate', (e) => { vista = e.state || { n: 'hoy', p: {} }; pintar(); });

/* ========================= PINTADO ========================= */
function pintar() {
  const app = $('#app');
  pararFiguras();
  if (vista.n !== 'intervalos' && intTimer) { clearInterval(intTimer); intTimer = null; intEstado = null; mantenerPantalla(false); }
  app.innerHTML = '';
  const V = {
    hoy: vHoy, plan: vPlan, sesion: vSesion, ejercicio: vEjercicio, ficha: vFicha,
    intervalos: vIntervalos, progreso: vProgreso, ejHist: vEjHist, ajustes: vAjustes
  };
  (V[vista.n] || vHoy)(app, vista.p);
  marcarNav();
}

let figurasVivas = [];
function pararFiguras() { figurasVivas.forEach(f => f.stop && f.stop()); figurasVivas = []; }
function figura(ex, opts) { const f = makeFigure(ex, opts); if (f.stop) figurasVivas.push(f); return f; }

function marcarNav() {
  const mapa = { hoy: 'hoy', plan: 'plan', sesion: 'plan', ejercicio: 'plan', ficha: 'plan', progreso: 'progreso', ejHist: 'progreso' };
  document.querySelectorAll('nav.bottom button').forEach(b => b.classList.toggle('on', b.dataset.t === mapa[vista.n]));
  $('nav.bottom').style.display = vista.n === 'intervalos' ? 'none' : 'flex';
}

function cabecera(titulo, sub, atras) {
  return `<header class="top">
    ${atras ? `<button class="back" id="btnAtras">‹ Atrás</button>` : ''}
    <h1>${titulo}${sub ? `<span class="sub">${sub}</span>` : ''}</h1>
    <button class="iconbtn" id="btnAjustes">⚙️</button>
  </header>`;
}
function montar(app, cab, cuerpo) {
  app.appendChild(h(cab));
  const m = h('<main></main>');
  m.innerHTML = cuerpo;
  app.appendChild(m);
  const b = $('#btnAtras'); if (b) b.onclick = () => history.back();
  const a = $('#btnAjustes'); if (a) a.onclick = () => go('ajustes');
  return m;
}

const ICONO = { fuerza: '💪', resistencia: '🏃', descanso: '😴' };

/* ========================= HOY ========================= */
function vHoy(app) {
  const d = diaDeHoy();
  const total = CALENDARIO.length;
  const completados = S.sesiones.length;

  let hero;
  if (d < 1) {
    hero = `<div class="hero">
      <div class="semana">Empieza el ${fechaLarga(S.inicio)}</div>
      <h2>Todo listo</h2>
      <p>${1 - d === 1 ? 'Empiezas mañana' : 'Quedan ' + (1 - d) + ' días para arrancar'}. Mira el plan para ver lo que viene.</p>
      <button class="btn sec" id="verPlan">Ver el plan de ${total} días</button>
    </div>`;
  } else if (d > total) {
    hero = `<div class="hero">
      <div class="semana">Programa terminado</div>
      <h2>¡Los ${total} días, hechos!</h2>
      <p>Has completado ${completados} sesiones. A por la temporada.</p>
      <button class="btn sec" id="verPlan">Ver todo lo que hiciste</button>
    </div>`;
  } else {
    const ses = sesionDeDia(d), bl = bloqueDeDia(d), ya = hecho(d);
    hero = `<div class="hero">
      <div class="semana">Día ${d} de ${total} · Bloque ${bl.n}: ${bl.nombre}</div>
      <h2>${ICONO[ses.tipo]} ${ses.nombre}</h2>
      <p>${ses.foco}</p>
      <button class="btn ${ya ? 'sec' : ''}" id="empezar">${ya ? '✓ Hecho hoy · volver a abrir' : (ses.tipo === 'descanso' ? 'Ver qué hacer hoy' : '▶ Empezar')}</button>
    </div>`;
  }

  const prox = [];
  for (let i = Math.max(1, d + 1); i < Math.min(CALENDARIO.length, Math.max(1, d) + 4); i++) prox.push(i);

  const cuerpo = `
    ${hero}

    <div class="metas">
      <div class="meta"><div class="n">${Math.min(Math.max(d, 0), total)}<span>/${total}</span></div><div class="l">Día del plan</div></div>
      <div class="meta"><div class="n">${completados}</div><div class="l">Sesiones hechas</div></div>
      <div class="meta"><div class="n">${S.sesiones.filter(s => s.tipo === 'fuerza').length}</div><div class="l">De fuerza</div></div>
    </div>

    ${prox.length ? `<div class="section-title">Lo que viene</div>
      ${prox.map(n => {
    const s = sesionDeDia(n);
    return `<button class="item" data-d="${n}">
          <div class="bar ${bloqueDeDia(n).color}"></div>
          <div class="letra">${ICONO[s.tipo]}</div>
          <div class="txt"><b>${s.nombre}</b><small>${diaSemana(fechaDeDia(n))} ${fechaCorta(fechaDeDia(n))} · ${s.foco}</small></div>
          <div class="go">›</div>
        </button>`;
  }).join('')}` : ''}

    <div class="section-title">Cómo va el bloque</div>
    <div class="card">
      <h2>Bloque ${bloqueDeDia(Math.min(Math.max(d, 1), total)).n} · ${bloqueDeDia(Math.min(Math.max(d, 1), total)).nombre}</h2>
      <p>${bloqueDeDia(Math.min(Math.max(d, 1), total)).objetivo}</p>
    </div>`;

  montar(app, cabecera('Gimnasio de Hugo', 'Pretemporada de balonmano'), cuerpo);

  const e = $('#empezar'); if (e) e.onclick = () => go('sesion', { d });
  const v = $('#verPlan'); if (v) v.onclick = () => go('plan');
  document.querySelectorAll('.item[data-d]').forEach(b => b.onclick = () => go('sesion', { d: +b.dataset.d }));
}

/* ========================= PLAN COMPLETO ========================= */
function vPlan(app) {
  const hoy = diaDeHoy();
  let cuerpo = '';
  BLOQUES.forEach(bl => {
    cuerpo += `<div class="section-title">Bloque ${bl.n} · ${bl.nombre}</div>
      <div class="card" style="background:var(--card2);margin-bottom:12px"><p>${bl.objetivo}</p></div>`;
    CALENDARIO.filter(c => c.d >= bl.dias[0] && c.d <= bl.dias[1]).forEach(c => {
      const s = SESIONES[c.s], f = fechaDeDia(c.d), ya = hecho(c.d);
      cuerpo += `<button class="item ${ya ? 'done' : ''}" data-d="${c.d}" style="${c.d === hoy ? 'border-color:var(--acc)' : ''}">
        <div class="bar ${bl.color}"></div>
        <div class="letra">${ya ? '✓' : ICONO[s.tipo]}</div>
        <div class="txt">
          <b>Día ${c.d} · ${s.nombre}${c.d === hoy ? ' · HOY' : ''}</b>
          <small>${diaSemana(f)} ${fechaCorta(f)} · ${s.foco}</small>
        </div>
        <div class="go">›</div>
      </button>`;
    });
  });

  montar(app, cabecera('Plan de ' + CALENDARIO.length + ' días', 'Balonmano · cadete 2º año', true), cuerpo);
  document.querySelectorAll('.item[data-d]').forEach(b => b.onclick = () => go('sesion', { d: +b.dataset.d }));
}

/* ========================= SESIÓN DEL DÍA ========================= */
function vSesion(app, p) {
  const d = p.d, ses = sesionDeDia(d), bl = bloqueDeDia(d), f = fechaDeDia(d);
  const sub = `Día ${d} · ${diaSemana(f)} ${fechaCorta(f)}`;

  if (ses.tipo === 'descanso') return vDescanso(app, d, ses, sub);
  if (ses.tipo === 'resistencia') return vResistencia(app, d, ses, sub);

  /* --- sesión de fuerza --- */
  if (!S.activa || S.activa.dia !== d) {
    if (S.activa && totalSeries(S.activa) > 0 && S.activa.dia !== d) {
      // guarda lo que hubiera de otro día antes de cambiar
      S.sesiones.push(limpiarSesion(S.activa));
    }
    S.activa = { tipo: 'fuerza', dia: d, sesionId: diaDelPlan(d).s, fecha: hoyISO(), ini: Date.now(), ejercicios: {} };
    guardar();
  }
  const a = S.activa;

  const cuerpo = `
    <div class="card" style="background:var(--card2)">
      <div class="chips" style="margin-bottom:9px">
        <span class="chip acc">${ses.foco}</span>
        <span class="chip">Bloque ${bl.n}</span>
        <span class="chip">${ses.ejercicios.length} ejercicios</span>
      </div>
      <p>${ses.nota}</p>
    </div>

    <div class="section-title">Calentamiento (no te lo saltes)</div>
    <div class="card"><ol class="pasos">${ses.calentamiento.map(x => `<li>${x}</li>`).join('')}</ol></div>

    <div class="section-title">Ejercicios</div>
    ${ses.ejercicios.map((it, i) => {
    const ex = EJERCICIOS[it.ej];
    const hechas = llenas(a.ejercicios[ex.id]).length;
    return `<button class="item ${hechas ? 'done' : ''}" data-i="${i}">
        <div class="letra">${i + 1}</div>
        <div class="thumb" data-fig="${ex.id}"></div>
        <div class="txt">
          <b>${ex.nombre}</b>
          <small>${it.series} series × ${it.reps}</small>
          ${hechas ? `<small style="color:var(--ok);margin-top:3px">✓ ${hechas} serie${hechas > 1 ? 's' : ''} apuntada${hechas > 1 ? 's' : ''}</small>` : ''}
        </div>
        <div class="go">${hechas ? '✓' : '›'}</div>
      </button>`;
  }).join('')}

    <div class="row" style="margin-top:18px"><button class="btn ok" id="terminar">Terminar y guardar</button></div>
    <button class="btn ghost" id="descartar" style="margin-top:6px">Descartar</button>`;

  montar(app, cabecera(ses.nombre, sub, true), cuerpo);
  document.querySelectorAll('.thumb[data-fig]').forEach(t => t.appendChild(makeFigure(EJERCICIOS[t.dataset.fig], { small: true })));
  document.querySelectorAll('.item[data-i]').forEach(b => b.onclick = () => go('ejercicio', { d, i: +b.dataset.i }));

  $('#terminar').onclick = () => {
    if (totalSeries(a) === 0) { toast('Apunta al menos una serie'); return; }
    a.min = Math.round((Date.now() - a.ini) / 60000);
    S.sesiones.push(limpiarSesion(a)); S.activa = null; guardar();
    toast('¡Sesión guardada! 💪');
    go('hoy', {}, true);
  };
  $('#descartar').onclick = () => {
    if (!confirm('¿Borrar lo apuntado en esta sesión?')) return;
    S.activa = null; guardar(); go('hoy', {}, true);
  };
}

/* ========================= DÍA DE DESCANSO ========================= */
function vDescanso(app, d, ses, sub) {
  const ya = hecho(d);
  const cuerpo = `
    <div class="card" style="border-color:var(--ok);background:var(--ok-soft)">
      <h2 style="color:var(--ok)">${ses.nombre}</h2>
      <p style="color:var(--txt)">${ses.foco}</p>
    </div>
    <div class="section-title">Qué hacer hoy</div>
    <div class="card"><ol class="pasos">${ses.consejos.map(x => `<li>${x}</li>`).join('')}</ol></div>
    <button class="btn ${ya ? 'sec' : 'ok'}" id="marcar" style="margin-top:8px">${ya ? '✓ Ya marcado como hecho' : 'Marcar el día como hecho'}</button>`;

  montar(app, cabecera(ses.nombre, sub, true), cuerpo);
  $('#marcar').onclick = () => {
    if (ya) return;
    S.sesiones.push({ tipo: 'descanso', dia: d, sesionId: diaDelPlan(d).s, fecha: hoyISO() });
    guardar(); toast('Día marcado'); go('hoy', {}, true);
  };
}

/* ========================= DÍA DE RESISTENCIA ========================= */
function vResistencia(app, d, ses, sub) {
  const pr = ses.protocolo;
  const totalMin = Math.round((pr.bloque.reduce((x, y) => x + y.seg, 0) * pr.vueltas * pr.series + pr.descansoSerie * (pr.series - 1)) / 60);
  const ya = hecho(d);

  const cuerpo = `
    <div class="card" style="background:var(--card2)">
      <div class="chips" style="margin-bottom:9px">
        <span class="chip acc">${ses.foco}</span>
        <span class="chip">${totalMin} min</span>
        ${ya ? '<span class="chip ok">✓ Hecho</span>' : ''}
      </div>
      <p>${ses.objetivo}</p>
    </div>

    ${ses.montaje ? `<div class="section-title">Cómo montarlo</div><div class="card"><p>${ses.montaje}</p></div>` : ''}

    <div class="section-title">La sesión</div>
    <div class="card">
      <div class="hist">
        ${pr.series > 1 ? `<div><span>Series</span><b>${pr.series}, con ${pr.descansoSerie / 60} min entre ellas</b></div>` : ''}
        <div><span>Repeticiones por serie</span><b>${pr.vueltas}</b></div>
        ${pr.bloque.map(b => `<div><span>${b.nombre}</span><b>${b.seg >= 60 ? (b.seg / 60) + ' min' : b.seg + ' s'}</b></div>`).join('')}
        <div><span>Duración (sin calentar)</span><b>${totalMin} minutos</b></div>
      </div>
    </div>

    <div class="section-title">Calentamiento</div>
    <div class="card"><ol class="pasos">${ses.calentamiento.map(x => `<li>${x}</li>`).join('')}</ol></div>

    ${ses.claves ? `<div class="section-title">Claves</div>
      <div class="card"><ul class="avisos">${ses.claves.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}

    ${ses.fichas ? `<div class="section-title">Técnica</div>
      ${ses.fichas.map(id => `<button class="item" data-ficha="${id}">
        <div class="thumb" data-fig="${id}"></div>
        <div class="txt"><b>${EJERCICIOS[id].nombre}</b><small>Cómo hacerlo bien</small></div>
        <div class="go">›</div>
      </button>`).join('')}` : ''}

    <button class="btn" id="empezarInt" style="margin-top:16px">▶ Empezar con el cronómetro</button>
    <p class="vacio">Sonará un aviso en cada cambio de ritmo y en los 3 segundos previos. Puedes guardarte el móvil en el bolsillo.</p>`;

  montar(app, cabecera(ses.nombre, sub, true), cuerpo);
  document.querySelectorAll('.thumb[data-fig]').forEach(t => t.appendChild(makeFigure(EJERCICIOS[t.dataset.fig], { small: true })));
  document.querySelectorAll('.item[data-ficha]').forEach(b => b.onclick = () => go('ficha', { ej: b.dataset.ficha }));
  $('#empezarInt').onclick = () => { beep(660, 60, .1); go('intervalos', { d }); };
}

/* ========================= FICHA DE EJERCICIO (con registro) ========================= */
function vEjercicio(app, p) {
  const d = p.d, ses = sesionDeDia(d), it = ses.ejercicios[p.i], ex = EJERCICIOS[it.ej];
  const a = S.activa;
  a.ejercicios[ex.id] = a.ejercicios[ex.id] || [];

  const ult = ultimaVez(ex.id);
  const esTiempo = ex.registro === 'tiempo';

  const cuerpo = `
    <div class="figbox" id="figbox"></div>

    <div class="chips" style="margin-bottom:14px">
      <span class="chip ${ex.lugar === 'En casa' ? 'ok' : 'acc'}">${ex.lugar === 'Gimnasio' ? '🏋️ Gimnasio' : (ex.lugar === 'En casa' ? '🏠 Sin material' : ex.lugar)}</span>
      <span class="chip">${ex.material}</span>
      <span class="chip">${ex.musculos}</span>
    </div>

    <div class="card" style="border-color:var(--acc);background:var(--acc-soft)">
      <h2 style="color:var(--acc)">Hoy: ${it.series} series × ${it.reps}</h2>
      <p style="color:var(--txt)">${it.nota || (esTiempo ? 'Aguanta la posición sin perder la postura.' : 'Descansa ' + (it.descanso >= 60 ? (it.descanso / 60) + ' min' : it.descanso + ' s') + ' entre series.')}</p>
    </div>

    <div class="section-title">Apunta lo que haces</div>
    <div class="card" id="registro">
      ${ult ? `<p class="ultima">Última vez (${fechaCorta(ult.fecha)}): <b>${resumenSeries(ult.series, esTiempo)}</b></p>`
      : `<p class="ultima">Primera vez que lo haces. Apunta el peso para saber por dónde vas.</p>`}
      <div id="series"></div>
      <button class="btn sec sm" id="addSerie" style="width:100%;margin-top:12px">+ Añadir serie</button>
    </div>

    <div class="section-title">Cómo se hace</div>
    <div class="card"><ol class="pasos">${ex.pasos.map(x => `<li>${x}</li>`).join('')}</ol></div>

    <div class="section-title">Errores que debes evitar</div>
    <div class="card"><ul class="avisos">${ex.errores.map(x => `<li>${x}</li>`).join('')}</ul></div>

    ${ex.progresion ? `<div class="card" style="background:var(--card2)"><h2>💡 Consejo del entrenador</h2><p>${ex.progresion}</p></div>` : ''}

    <div class="row" style="margin-top:16px">
      ${p.i > 0 ? `<button class="btn sec" id="prev">‹ Anterior</button>` : ''}
      ${p.i < ses.ejercicios.length - 1 ? `<button class="btn" id="next">Siguiente ›</button>` : `<button class="btn ok" id="finEj">Ir a terminar</button>`}
    </div>`;

  montar(app, cabecera(ex.nombre, ses.nombre + ' · ejercicio ' + (p.i + 1), true), cuerpo);
  $('#figbox').appendChild(figura(ex, { anim: true }));

  pintarSeries(ex, it, esTiempo);
  $('#addSerie').onclick = () => { a.ejercicios[ex.id].push({ kg: null, reps: null, ok: false }); guardar(); pintarSeries(ex, it, esTiempo); };

  const pv = $('#prev'); if (pv) pv.onclick = () => go('ejercicio', { d, i: p.i - 1 }, true);
  const nx = $('#next'); if (nx) nx.onclick = () => go('ejercicio', { d, i: p.i + 1 }, true);
  const fe = $('#finEj'); if (fe) fe.onclick = () => history.back();
}

/* ========================= FICHA SÓLO LECTURA ========================= */
function vFicha(app, p) {
  const ex = EJERCICIOS[p.ej];
  const cuerpo = `
    <div class="figbox" id="figbox"></div>
    <div class="chips" style="margin-bottom:14px">
      <span class="chip acc">${ex.lugar}</span>
      <span class="chip">${ex.material}</span>
    </div>
    <div class="section-title">Cómo se hace</div>
    <div class="card"><ol class="pasos">${ex.pasos.map(x => `<li>${x}</li>`).join('')}</ol></div>
    <div class="section-title">Errores que debes evitar</div>
    <div class="card"><ul class="avisos">${ex.errores.map(x => `<li>${x}</li>`).join('')}</ul></div>
    ${ex.progresion ? `<div class="card" style="background:var(--card2)"><h2>💡 Consejo del entrenador</h2><p>${ex.progresion}</p></div>` : ''}`;
  montar(app, cabecera(ex.nombre, 'Técnica', true), cuerpo);
  $('#figbox').appendChild(figura(ex, { anim: true }));
}

/* ========================= SERIES ========================= */
function resumenSeries(series, esTiempo) {
  return series.map(s => esTiempo
    ? (s.reps || 0) + ' s'
    : (s.kg ? fmtKg(s.kg) + ' kg × ' + (s.reps || '?') : (s.reps || '?') + ' reps')).join('  ·  ');
}

function pintarSeries(ex, it, esTiempo) {
  const cont = $('#series');
  const arr = S.activa.ejercicios[ex.id];
  const ult = ultimaVez(ex.id);

  if (!arr.length) {
    for (let i = 0; i < it.series; i++) arr.push({ kg: null, reps: null, ok: false });
    guardar();
  }

  const sinPeso = ex.registro === 'reps';

  cont.innerHTML = arr.map((s, i) => {
    const sug = ult && ult.series[i] ? ult.series[i] : null;
    const phKg = sug && sug.kg ? fmtKg(sug.kg) : 'kg';
    const phRp = sug && sug.reps ? sug.reps : (esTiempo ? (ex.objetivoSeg || primerNumero(it.reps)) : primerNumero(it.reps));
    return `<div class="serie ${s.ok ? 'hecha' : ''}" data-i="${i}">
      <div class="num">${i + 1}</div>
      ${esTiempo ? '' : `<div class="fld"><input type="number" inputmode="decimal" step="0.5" min="0" data-c="kg" value="${s.kg == null ? '' : s.kg}" placeholder="${sinPeso ? '—' : phKg}"><span class="u">kg</span></div>`}
      <div class="fld"><input type="number" inputmode="numeric" step="1" min="0" data-c="reps" value="${s.reps == null ? '' : s.reps}" placeholder="${phRp}"><span class="u">${esTiempo ? 'seg' : 'reps'}</span></div>
      <button class="tick" data-a="ok">✓</button>
      <button class="del" data-a="del">×</button>
    </div>`;
  }).join('');

  cont.querySelectorAll('.serie').forEach(row => {
    const i = +row.dataset.i;
    row.querySelectorAll('input').forEach(inp => {
      inp.oninput = () => { arr[i][inp.dataset.c] = num(inp.value); guardar(); };
    });
    row.querySelector('[data-a="ok"]').onclick = () => {
      if (!arr[i].ok) {
        const inp = row.querySelector('[data-c="reps"]');
        if (arr[i].reps == null) { arr[i].reps = num(inp.placeholder) || null; inp.value = arr[i].reps == null ? '' : arr[i].reps; }
        const kIn = row.querySelector('[data-c="kg"]');
        if (kIn && arr[i].kg == null && num(kIn.placeholder) != null) { arr[i].kg = num(kIn.placeholder); kIn.value = arr[i].kg; }
        arr[i].ok = true; guardar();
        row.classList.add('hecha');
        vibra(40);
        if (i < arr.length - 1) descanso(it.descanso || S.descanso);
      } else { arr[i].ok = false; guardar(); row.classList.remove('hecha'); }
    };
    row.querySelector('[data-a="del"]').onclick = () => { arr.splice(i, 1); guardar(); pintarSeries(ex, it, esTiempo); };
  });
}

/* ========================= DESCANSO ENTRE SERIES ========================= */
let restInt = null;
function descanso(seg) {
  let box = $('#rest');
  if (!box) {
    box = h(`<div id="rest">
      <div class="t">0:00</div>
      <div class="l">Descanso entre series</div>
      <button class="btn sm sec" data-a="mas">+30 s</button>
      <button class="btn sm ghost" data-a="fin">Saltar</button>
    </div>`);
    document.body.appendChild(box);
    box.querySelector('[data-a="mas"]').onclick = () => { box._fin += 30000; };
    box.querySelector('[data-a="fin"]').onclick = () => pararDescanso();
  }
  box.classList.add('on');
  box._fin = Date.now() + seg * 1000;
  clearInterval(restInt);
  let ultimo = -1;
  restInt = setInterval(() => {
    const q = Math.max(0, Math.round((box._fin - Date.now()) / 1000));
    box.querySelector('.t').textContent = Math.floor(q / 60) + ':' + String(q % 60).padStart(2, '0');
    if (q !== ultimo) { if (q > 0 && q <= 3) tic(); ultimo = q; }
    if (q <= 0) { gong(); pararDescanso(); }
  }, 200);
}
function pararDescanso() {
  clearInterval(restInt);
  const b = $('#rest'); if (b) b.classList.remove('on');
}

/* ========================= CRONÓMETRO DE INTERVALOS ========================= */
let intTimer = null, intEstado = null;

function construirCola(pr) {
  const cola = [];
  for (let s = 0; s < pr.series; s++) {
    for (let i = 0; i < pr.vueltas; i++)
      pr.bloque.forEach(b => cola.push({ nombre: b.nombre, seg: b.seg, tipo: b.tipo, vuelta: i + 1, serie: s + 1 }));
    if (s < pr.series - 1) cola.push({ nombre: 'Descanso entre series', seg: pr.descansoSerie, tipo: 'baja', vuelta: 0, serie: s + 1 });
  }
  return cola;
}

function vIntervalos(app, p) {
  const d = p.d, ses = sesionDeDia(d), pr = ses.protocolo;
  const cola = construirCola(pr);
  const totalSeg = cola.reduce((a, b) => a + b.seg, 0);

  const m = h('<main style="padding-top:22px"></main>');
  m.innerHTML = `
    <div class="tmr">
      <div class="fase" id="fase">Preparado</div>
      <div class="ring" id="ring">
        <svg viewBox="0 0 100 100">
          <circle class="bgc" cx="50" cy="50" r="44" fill="none" stroke-width="7"></circle>
          <circle class="fgc" id="arc" cx="50" cy="50" r="44" fill="none" stroke-width="7" stroke-linecap="round"
                  stroke-dasharray="276.5" stroke-dashoffset="0"></circle>
        </svg>
        <div class="mid"><div><div class="big" id="big">0:00</div></div></div>
      </div>
      <div class="sub" id="sub"></div>
      <div class="sub" id="tot" style="margin-top:5px"></div>
    </div>
    <div class="row" style="margin-top:26px">
      <button class="btn sec" id="pausa">⏸ Pausa</button>
      <button class="btn danger" id="parar">■ Terminar</button>
    </div>
    <p class="vacio" id="siguiente"></p>`;
  app.appendChild(m);

  intEstado = { d, ses, cola, i: 0, restante: cola[0].seg * 1000, corriendo: true, ini: Date.now(), pr };
  mantenerPantalla(true);

  const arc = $('#arc'), ring = $('#ring'), CIRC = 2 * Math.PI * 44;

  const pinta = () => {
    const e = intEstado, it = e.cola[e.i];
    const q = Math.max(0, e.restante / 1000);
    $('#big').textContent = Math.floor(q / 60) + ':' + String(Math.floor(q % 60)).padStart(2, '0');
    $('#fase').textContent = it.nombre;
    $('#fase').style.color = it.tipo === 'alta' ? 'var(--rojo)' : 'var(--azul)';
    ring.className = 'ring ' + it.tipo;
    arc.setAttribute('stroke-dashoffset', String(CIRC * (1 - q / it.seg)));
    $('#sub').textContent = it.vuelta
      ? `Repetición ${it.vuelta} de ${e.pr.vueltas}` + (e.pr.series > 1 ? ` · serie ${it.serie} de ${e.pr.series}` : '')
      : 'Descanso entre series';
    const resto = e.cola.slice(e.i + 1).reduce((a, b) => a + b.seg, 0) + q;
    $('#tot').textContent = `Quedan ${Math.ceil(resto / 60)} min de ${Math.round(totalSeg / 60)}`;
    const sig = e.cola[e.i + 1];
    $('#siguiente').textContent = sig ? 'Después: ' + sig.nombre : '¡Última!';
  };
  pinta();

  let ultSeg = -1, ultimo = Date.now();
  clearInterval(intTimer);
  intTimer = setInterval(() => {
    const e = intEstado;
    const ahora = Date.now(), dt = ahora - ultimo; ultimo = ahora;
    if (!e.corriendo) return;
    e.restante -= dt;
    const s = Math.ceil(e.restante / 1000);
    if (s !== ultSeg) { if (s > 0 && s <= 3) tic(); ultSeg = s; }
    if (e.restante <= 0) {
      e.i++;
      if (e.i >= e.cola.length) { gong(); setTimeout(gong, 500); terminarIntervalos(true); return; }
      gong();
      e.restante = e.cola[e.i].seg * 1000;
    }
    pinta();
  }, 200);

  $('#pausa').onclick = (ev) => {
    intEstado.corriendo = !intEstado.corriendo;
    ev.currentTarget.textContent = intEstado.corriendo ? '⏸ Pausa' : '▶ Seguir';
    ultimo = Date.now();
  };
  $('#parar').onclick = () => { if (confirm('¿Terminar la sesión?')) terminarIntervalos(false); };
}

function terminarIntervalos(completo) {
  clearInterval(intTimer); intTimer = null;
  mantenerPantalla(false);
  const e = intEstado;
  if (!e) { go('hoy', {}, true); return; }
  const min = Math.max(1, Math.round((Date.now() - e.ini) / 60000));
  if (!hecho(e.d)) {
    S.sesiones.push({ tipo: 'resistencia', dia: e.d, sesionId: diaDelPlan(e.d).s, fecha: hoyISO(), minutos: min, completo: !!completo });
    guardar();
  }
  intEstado = null;
  toast(completo ? `¡Terminado! ${min} minutos 🏃` : `Guardado: ${min} minutos`);
  go('hoy', {}, true);
}

/* ========================= PROGRESO ========================= */
function vProgreso(app) {
  const fuerza = S.sesiones.filter(s => s.tipo === 'fuerza');
  const cardio = S.sesiones.filter(s => s.tipo === 'resistencia');

  const usados = [];
  for (let i = S.sesiones.length - 1; i >= 0; i--) {
    const s = S.sesiones[i];
    if (!s.ejercicios) continue;
    for (const id in s.ejercicios) if (s.ejercicios[id].length && !usados.includes(id)) usados.push(id);
  }

  const cuerpo = `
    <div class="metas">
      <div class="meta"><div class="n">${fuerza.length}</div><div class="l">Sesiones fuerza</div></div>
      <div class="meta"><div class="n">${cardio.length}</div><div class="l">Sesiones cardio</div></div>
      <div class="meta"><div class="n">${cardio.reduce((a, s) => a + (s.minutos || 0), 0)}</div><div class="l">Min. cardio</div></div>
    </div>

    <div class="section-title">Tus marcas por ejercicio</div>
    ${usados.length ? usados.map(id => {
    const ex = EJERCICIOS[id]; if (!ex) return '';
    return `<button class="item" data-e="${id}">
        <div class="thumb" data-fig="${id}"></div>
        <div class="txt"><b>${ex.nombre}</b><small>${mejorMarca(id)}</small></div>
        <div class="go">›</div>
      </button>`;
  }).join('') : `<p class="vacio">Todavía no has apuntado nada.<br>Cuando entrenes, aquí verás cómo vas subiendo.</p>`}

    ${S.sesiones.length ? `<div class="section-title">Historial</div>
      <div class="card hist">${S.sesiones.slice().reverse().slice(0, 30).map(s => {
    const ses = SESIONES[s.sesionId];
    return `<div><span>Día ${s.dia} · ${ses ? ses.nombre : s.tipo}</span>
        <b>${s.tipo === 'fuerza' ? totalSeries(s) + ' series' : (s.tipo === 'resistencia' ? s.minutos + ' min' : '✓')}</b></div>`;
  }).join('')}</div>` : ''}`;

  montar(app, cabecera('Progreso', `Día ${Math.max(0, Math.min(diaDeHoy(), CALENDARIO.length))} de ${CALENDARIO.length}`), cuerpo);
  document.querySelectorAll('.thumb[data-fig]').forEach(t => t.appendChild(makeFigure(EJERCICIOS[t.dataset.fig], { small: true })));
  document.querySelectorAll('.item[data-e]').forEach(b => b.onclick = () => go('ejHist', { e: b.dataset.e }));
}

function serieDe(id) {
  const out = [];
  S.sesiones.forEach(s => {
    if (!s.ejercicios || !s.ejercicios[id]) return;
    const ss = s.ejercicios[id].filter(x => x.reps || x.kg);
    if (!ss.length) return;
    out.push({
      fecha: s.fecha, dia: s.dia, series: ss,
      maxKg: Math.max(...ss.map(x => x.kg || 0)),
      maxReps: Math.max(...ss.map(x => x.reps || 0))
    });
  });
  return out;
}

function mejorMarca(id) {
  const d = serieDe(id);
  if (!d.length) return 'Sin datos';
  const kg = Math.max(...d.map(x => x.maxKg));
  const reps = Math.max(...d.map(x => x.maxReps));
  const ex = EJERCICIOS[id];
  const n = `${d.length} ${d.length > 1 ? 'sesiones' : 'sesión'}`;
  if (kg > 0) return `Mejor: ${fmtKg(kg)} kg · ${n}`;
  return `Mejor: ${reps} ${ex.registro === 'tiempo' ? 'segundos' : 'reps'} · ${n}`;
}

function vEjHist(app, p) {
  const ex = EJERCICIOS[p.e], d = serieDe(p.e);
  const usaKg = d.some(x => x.maxKg > 0);
  const vals = d.map(x => usaKg ? x.maxKg : x.maxReps);

  const cuerpo = `
    <div class="figbox" id="figbox"></div>
    <div class="card">
      <h2>${usaKg ? 'Peso máximo por día' : 'Mejor serie por día'}</h2>
      ${vals.length > 1 ? spark(vals) : '<p>Necesitas al menos dos sesiones para ver la evolución.</p>'}
      <div class="hist" style="margin-top:12px">
        ${d.slice().reverse().map(x => `<div><span>Día ${x.dia} · ${fechaCorta(x.fecha)}</span><b>${resumenSeries(x.series, ex.registro === 'tiempo')}</b></div>`).join('')}
      </div>
    </div>`;

  montar(app, cabecera(ex.nombre, 'Progreso', true), cuerpo);
  $('#figbox').appendChild(figura(ex, { anim: true }));
}

function spark(vals) {
  const w = 300, hh = 46, max = Math.max(...vals), min = Math.min(...vals), rango = (max - min) || 1;
  const pts = vals.map((v, i) => [
    vals.length === 1 ? w / 2 : (i / (vals.length - 1)) * (w - 8) + 4,
    hh - 5 - ((v - min) / rango) * (hh - 14)
  ]);
  return `<svg class="spark" viewBox="0 0 ${w} ${hh}" preserveAspectRatio="none">
    <polyline points="${pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}"></polyline>
    ${pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3"></circle>`).join('')}
  </svg>
  <p style="font-size:12px;color:var(--dim);margin-top:4px">De ${fmtKg(vals[0])} a ${fmtKg(vals[vals.length - 1])}${max > vals[0] ? ' · tope ' + fmtKg(max) : ''}</p>`;
}

/* ========================= AJUSTES ========================= */
function vAjustes(app) {
  const cuerpo = `
    <div class="section-title">El programa</div>
    <div class="card">
      <label class="fld2"><span>Primer día del plan (día 1 de ${CALENDARIO.length})</span>
        <input type="date" id="inicio" value="${S.inicio}">
      </label>
      <p style="margin-bottom:0">Si te saltas días o empiezas más tarde, cambia esta fecha y todo el calendario se mueve contigo. Ahora mismo estás en el <b style="color:var(--txt)">día ${diaDeHoy()}</b>.</p>
    </div>

    <div class="card">
      <label class="fld2"><span>Descanso por defecto entre series (segundos)</span>
        <input type="number" id="descanso" step="15" min="30" max="300" value="${S.descanso}">
      </label>
      <label class="fld2" style="margin-bottom:0;display:flex;align-items:center;justify-content:space-between;gap:12px">
        <span style="margin:0">Avisos con sonido y vibración</span>
        <input type="checkbox" id="sonido" ${S.sonido ? 'checked' : ''} style="width:auto;transform:scale(1.5)">
      </label>
    </div>

    <div class="section-title">Copia de seguridad</div>
    <div class="card">
      <p style="margin-bottom:12px">Los datos se guardan sólo en este móvil. Descarga una copia de vez en cuando.</p>
      <div class="row">
        <button class="btn sec sm" id="exportar">⬇ Exportar</button>
        <button class="btn sec sm" id="importar">⬆ Importar</button>
      </div>
      <input type="file" id="fichero" accept="application/json" style="display:none">
    </div>

    <div class="section-title">Peligro</div>
    <div class="card"><button class="btn danger" id="borrar">Borrar todos mis datos</button></div>

    <p class="vacio">Programa de ${CALENDARIO.length} días de pretemporada específica de balonmano.<br>3 sesiones de fuerza + 3 de acondicionamiento por semana.</p>`;

  montar(app, cabecera('Ajustes', null, true), cuerpo);

  $('#inicio').onchange = (e) => { S.inicio = e.target.value; guardar(); toast('Ahora estás en el día ' + diaDeHoy()); go('ajustes', {}, true); };
  $('#descanso').onchange = (e) => { S.descanso = Math.max(30, +e.target.value || 120); guardar(); };
  $('#sonido').onchange = (e) => { S.sonido = e.target.checked; guardar(); if (S.sonido) tic(); };

  $('#exportar').onclick = () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'gimnasio-hugo-' + hoyISO() + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  $('#importar').onclick = () => $('#fichero').click();
  $('#fichero').onchange = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const dd = JSON.parse(r.result);
        if (!dd.sesiones) throw 0;
        S = Object.assign({}, DEF, dd); guardar();
        toast('Datos importados'); go('hoy', {}, true);
      } catch (x) { toast('Ese fichero no vale'); }
    };
    r.readAsText(f);
  };
  $('#borrar').onclick = () => {
    if (!confirm('Se borrará TODO lo que has apuntado. ¿Seguro?')) return;
    if (!confirm('De verdad, ¿seguro? Esto no se puede deshacer.')) return;
    localStorage.removeItem(KEY); S = Object.assign({}, DEF); go('hoy', {}, true);
  };
}

/* ========================= ARRANQUE ========================= */
function iniciar() {
  document.querySelectorAll('nav.bottom button').forEach(b => b.onclick = () => go(b.dataset.t === 'plan' ? 'plan' : b.dataset.t));
  history.replaceState({ n: 'hoy', p: {} }, '');
  pintar();
  document.addEventListener('touchstart', () => {
    if (!AC && S.sonido) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } }
  }, { once: true, passive: true });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
}
document.addEventListener('DOMContentLoaded', iniciar);
