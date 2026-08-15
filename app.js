/* =========================================================================
   app.js — Gimnasio Hugo
   ========================================================================= */
const KEY = 'gimnasioHugo.v1';

const DEF = {
  nivel: null,             // 1 = autocargas · 2 = cargas externas
  frecuencia: 'optimo',
  inicio: null,            // fecha de inicio del plan (ISO)
  alts: {},                // variantes elegidas: {'autocargas-B': 'remoTRX'}
  descanso: 120,           // segundos de descanso entre series
  sonido: true,
  sesiones: [],            // histórico
  activa: null             // sesión en curso
};

let S = cargar();

function cargar() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    const s = Object.assign({}, DEF, raw);
    s.sesiones.sort((a, b) => a.fecha < b.fecha ? -1 : (a.fecha > b.fecha ? 1 : 0));
    return s;
  } catch (e) { return Object.assign({}, DEF); }
}
function guardar() {
  S.sesiones.sort((a, b) => a.fecha < b.fecha ? -1 : (a.fecha > b.fecha ? 1 : 0));
  localStorage.setItem(KEY, JSON.stringify(S));
}

/* ---------- fechas ---------- */
const hoyISO = () => new Date().toISOString().slice(0, 10);
const dias = (a, b) => Math.floor((new Date(b + 'T00:00') - new Date(a + 'T00:00')) / 86400000);

function semanaPlan() {
  if (!S.inicio) return 1;
  const d = Math.max(0, dias(S.inicio, hoyISO()));
  return Math.floor(d / 7) + 1;
}
function faseSemana() {
  const w = ((semanaPlan() - 1) % 6) + 1;
  return RESISTENCIA.find(f => f.semanas.includes(w)) || RESISTENCIA[0];
}
function lunesDe(iso) {
  const d = new Date(iso + 'T00:00');
  const n = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
function sesionesSemana() {
  const l = lunesDe(hoyISO());
  return S.sesiones.filter(s => s.fecha >= l);
}
function fechaCorta(iso) {
  const d = new Date(iso + 'T00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}
function fechaLarga(iso) {
  const d = new Date(iso + 'T00:00');
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}

/* ---------- utilidades ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const num = (v) => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : null; };
const fmtKg = (n) => (n % 1 === 0 ? String(n) : String(n).replace('.', ','));

function toast(msg) {
  let t = $('.toast');
  if (!t) { t = h('<div class="toast"></div>'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2200);
}

function rutinaPorId(id) { return RUTINAS.find(r => r.id === id); }
function ejDeSlot(rutina, slot) {
  const k = rutina.id + '-' + slot.letra;
  const id = (slot.alt && S.alts[k]) ? S.alts[k] : slot.ej;
  return EJERCICIOS[id];
}
/* Rutina sugerida: la siguiente a la última que hizo (rotando 1→2→3) */
function rutinaSugerida() {
  const lista = S.nivel === 1 ? ['autocargas'] : ['bloque1', 'bloque2', 'bloque3'];
  const ult = [...S.sesiones].reverse().find(s => s.tipo === 'fuerza' && lista.includes(s.rutina));
  if (!ult) return lista[0];
  return lista[(lista.indexOf(ult.rutina) + 1) % lista.length];
}

/* Última vez que hizo un ejercicio (series guardadas) */
function ultimaVez(ejId) {
  for (let i = S.sesiones.length - 1; i >= 0; i--) {
    const s = S.sesiones[i];
    if (s.tipo === 'fuerza' && s.ejercicios && s.ejercicios[ejId] && s.ejercicios[ejId].length)
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
window.addEventListener('popstate', (e) => {
  vista = e.state || { n: 'hoy', p: {} };
  pintar();
});

/* ========================= PINTADO ========================= */
function pintar() {
  const app = $('#app');
  pararFiguras();
  if (vista.n !== 'intervalos' && intTimer) { clearInterval(intTimer); intTimer = null; intEstado = null; mantenerPantalla(false); }
  app.innerHTML = '';
  if (!S.nivel) { vAlta(app); return; }

  const V = {
    hoy: vHoy, fuerza: vFuerza, sesion: vSesion, ejercicio: vEjercicio,
    resistencia: vResistencia, preparar: vPreparar, intervalos: vIntervalos, progreso: vProgreso,
    ejHist: vEjHist, ajustes: vAjustes
  };
  (V[vista.n] || vHoy)(app, vista.p);
  marcarNav();
}

let figurasVivas = [];
function pararFiguras() { figurasVivas.forEach(f => f.stop && f.stop()); figurasVivas = []; }
function figura(ex, opts) { const f = makeFigure(ex, opts); if (f.stop) figurasVivas.push(f); return f; }

function marcarNav() {
  const mapa = { hoy: 'hoy', fuerza: 'fuerza', sesion: 'fuerza', ejercicio: 'fuerza', resistencia: 'cardio', intervalos: 'cardio', progreso: 'progreso', ejHist: 'progreso' };
  document.querySelectorAll('nav.bottom button').forEach(b => b.classList.toggle('on', b.dataset.t === mapa[vista.n]));
  $('nav.bottom').style.display = (vista.n === 'intervalos' || !S.nivel) ? 'none' : 'flex';
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

/* ========================= ALTA (primera vez) ========================= */
function vAlta(app) {
  $('nav.bottom').style.display = 'none';
  app.innerHTML = `<main style="padding-top:34px">
    <div style="text-align:center;margin-bottom:26px">
      <div style="font-size:52px">🏋️</div>
      <h1 style="margin:10px 0 6px;font-size:26px;letter-spacing:-.6px">Entrenamiento de verano</h1>
      <p style="color:var(--dim);margin:0;font-size:15px">Plan físico de pretemporada · categoría cadete</p>
    </div>
    <div class="card">
      <h2>¿En qué año estás?</h2>
      <p style="margin-bottom:14px">Esto decide tu rutina de fuerza. Podrás cambiarlo cuando quieras en ajustes.</p>
      <button class="btn sec" id="n2" style="margin-bottom:10px;flex-direction:column;align-items:flex-start;text-align:left;padding:16px">
        <b style="font-size:16px">Cadete 2º año</b>
        <small style="color:var(--dim);font-weight:500">Cargas externas · 3 bloques de gimnasio</small>
      </button>
      <button class="btn sec" id="n1" style="flex-direction:column;align-items:flex-start;text-align:left;padding:16px">
        <b style="font-size:16px">Cadete 1er año</b>
        <small style="color:var(--dim);font-weight:500">Autocargas · se puede hacer en casa</small>
      </button>
    </div>
  </main>`;
  const elegir = (n) => { S.nivel = n; S.inicio = S.inicio || hoyISO(); guardar(); go('hoy', {}, true); };
  $('#n1').onclick = () => elegir(1);
  $('#n2').onclick = () => elegir(2);
}

/* ========================= HOY ========================= */
function vHoy(app) {
  const frec = FRECUENCIAS.find(f => f.id === S.frecuencia);
  const ses = sesionesSemana();
  const nf = ses.filter(s => s.tipo === 'fuerza').length;
  const nr = ses.filter(s => s.tipo === 'resistencia').length;
  const fase = faseSemana();
  const sug = rutinaPorId(rutinaSugerida());
  const act = S.activa;

  const dots = (n, total) => Array.from({ length: total }, (_, i) => `<i class="dot ${i < n ? 'on' : ''}"></i>`).join('');

  let cuerpo = `
    <div class="hero">
      <div class="semana">Semana ${semanaPlan()} del plan</div>
      <h2>${act ? 'Entrenamiento en curso' : 'Hoy toca entrenar'}</h2>
      <p>${act ? rutinaPorId(act.rutina).nombre + ' · empezado ' + (act.fecha === hoyISO() ? 'hoy' : fechaCorta(act.fecha)) : 'Objetivo de la semana: ' + frec.texto.toLowerCase() + '.'}</p>
      <button class="btn" id="empezar">${act ? '▶ Seguir con el entrenamiento' : '💪 Empezar ' + sug.nombre}</button>
      ${act ? '' : `<button class="btn ghost" id="otraRutina" style="margin-top:8px">Elegir otra rutina</button>`}
    </div>

    <div class="metas">
      <div class="meta"><div class="n">${nf}<span>/${frec.fuerza}</span></div><div class="l">Fuerza</div><div class="dots">${dots(nf, frec.fuerza)}</div></div>
      <div class="meta"><div class="n">${nr}<span>/${frec.resistencia}</span></div><div class="l">Resistencia</div><div class="dots">${dots(nr, frec.resistencia)}</div></div>
    </div>

    <div class="section-title">Resistencia de esta semana</div>
    <button class="item" id="irCardio">
      <div class="bar azul"></div>
      <div class="txt">
        <b>${fase.resumen}</b>
        <small>${fase.detalle}</small>
      </div>
      <div class="go">›</div>
    </button>

    <div class="section-title">Tu semana</div>
    <div class="card">
      <div class="seg" id="segFrec">
        ${FRECUENCIAS.map(f => `<button data-f="${f.id}" class="${f.id === S.frecuencia ? 'on' : ''}">${f.nombre}</button>`).join('')}
      </div>
      <p style="margin-top:11px">${frec.texto}. Deja al menos un día entre sesiones de fuerza del mismo tipo.</p>
    </div>`;

  const ult = S.sesiones.slice(-3).reverse();
  if (ult.length) {
    cuerpo += `<div class="section-title">Últimos entrenamientos</div>` + ult.map(s => `
      <div class="item" style="cursor:default">
        <div class="letra" style="color:var(--ok)">${s.tipo === 'fuerza' ? '💪' : '🏃'}</div>
        <div class="txt"><b>${s.tipo === 'fuerza' ? rutinaPorId(s.rutina).nombre : 'Resistencia'}</b>
        <small>${fechaLarga(s.fecha)}${s.tipo === 'fuerza' ? ' · ' + totalSeries(s) + ' series' : ' · ' + s.minutos + ' min'}</small></div>
      </div>`).join('');
  }

  montar(app, cabecera('Gimnasio de Hugo', 'Pretemporada cadete'), cuerpo);

  $('#empezar').onclick = () => {
    if (!S.activa) crearSesion(sug.id);
    go('sesion', { r: S.activa.rutina });
  };
  const o = $('#otraRutina'); if (o) o.onclick = () => go('fuerza');
  $('#irCardio').onclick = () => go('resistencia');
  document.querySelectorAll('#segFrec button').forEach(b => b.onclick = () => {
    S.frecuencia = b.dataset.f; guardar(); pintar();
  });
}

const llenas = (arr) => (arr || []).filter(x => x && (x.kg != null || x.reps != null));

function totalSeries(s) {
  return Object.values(s.ejercicios || {}).reduce((a, v) => a + llenas(v).length, 0);
}

/* Quita las series vacías antes de guardar la sesión en el histórico */
function limpiarSesion(s) {
  const out = {};
  for (const id in s.ejercicios) {
    const ll = llenas(s.ejercicios[id]);
    if (ll.length) out[id] = ll;
  }
  s.ejercicios = out;
  return s;
}

function crearSesion(rutinaId) {
  S.activa = { tipo: 'fuerza', rutina: rutinaId, fecha: hoyISO(), ini: Date.now(), ejercicios: {} };
  guardar();
}

/* ========================= LISTA DE RUTINAS ========================= */
function vFuerza(app) {
  const lista = S.nivel === 1
    ? RUTINAS.filter(r => r.id === 'autocargas').concat(RUTINAS.filter(r => r.nivel === 2))
    : RUTINAS.filter(r => r.nivel === 2).concat(RUTINAS.filter(r => r.id === 'autocargas'));

  const cuerpo = `
    <div class="section-title">Elige el entrenamiento</div>
    ${lista.map(r => `
      <button class="item" data-r="${r.id}">
        <div class="bar ${r.color}"></div>
        <div class="txt">
          <b>${r.nombre}</b>
          <small>${r.subtitulo} · ${r.series} series × ${r.reps} reps</small>
          <small style="margin-top:3px;color:#6d7a8c">${r.ejercicios.map(s => ejDeSlot(r, s).nombre).join(' · ')}</small>
        </div>
        <div class="go">›</div>
      </button>`).join('')}
    <p class="vacio" style="padding:18px 6px">Los ejercicios A, B, C, D y E se hacen en circuito: uno detrás de otro, y al terminar la E vuelves a la A. Descansa 2 o 3 minutos entre vueltas.</p>`;

  montar(app, cabecera('Fuerza', null, true), cuerpo);
  document.querySelectorAll('.item[data-r]').forEach(b => b.onclick = () => {
    const id = b.dataset.r;
    if (!S.activa) crearSesion(id);
    else if (S.activa.rutina !== id) {
      if (totalSeries(S.activa) > 0 && !confirm('Tienes un entrenamiento a medias de ' + rutinaPorId(S.activa.rutina).nombre + '. ¿Lo descartas y empiezas ' + rutinaPorId(id).nombre + '?')) return;
      crearSesion(id);
    }
    go('sesion', { r: id });
  });
}

/* ========================= SESIÓN (lista de ejercicios) ========================= */
function vSesion(app, p) {
  const r = rutinaPorId(p.r);
  if (!S.activa || S.activa.rutina !== r.id) crearSesion(r.id);
  const a = S.activa;

  const cuerpo = `
    <div class="card" style="background:var(--card2)">
      <div class="chips" style="margin-bottom:9px">
        <span class="chip acc">${r.series} series</span>
        <span class="chip acc">${r.reps} repeticiones</span>
        <span class="chip">En circuito A → E</span>
      </div>
      <p>${r.nota}</p>
    </div>

    ${r.ejercicios.map((slot, i) => {
    const ex = ejDeSlot(r, slot);
    const hechas = llenas(a.ejercicios[ex.id]).length;
    return `<button class="item ${hechas ? 'done' : ''}" data-i="${i}">
        <div class="letra">${slot.letra}</div>
        <div class="thumb" data-fig="${ex.id}"></div>
        <div class="txt">
          <b>${ex.nombre}</b>
          <small>${ex.registro === 'tiempo' ? ex.objetivoSeg + ' segundos' : (ex.lugar === 'En casa' ? 'Sin material' : ex.material)}</small>
          ${hechas ? `<small style="color:var(--ok);margin-top:3px">✓ ${hechas} serie${hechas > 1 ? 's' : ''} apuntada${hechas > 1 ? 's' : ''}</small>` : ''}
        </div>
        <div class="go">${hechas ? '✓' : '›'}</div>
      </button>`;
  }).join('')}

    <div class="row" style="margin-top:18px">
      <button class="btn ok" id="terminar">Terminar y guardar</button>
    </div>
    <button class="btn ghost" id="descartar" style="margin-top:6px">Descartar entrenamiento</button>`;

  montar(app, cabecera(r.nombre, r.subtitulo, true), cuerpo);

  document.querySelectorAll('.thumb[data-fig]').forEach(t => {
    t.appendChild(makeFigure(EJERCICIOS[t.dataset.fig], { small: true }));
  });
  document.querySelectorAll('.item[data-i]').forEach(b => b.onclick = () => go('ejercicio', { r: r.id, i: +b.dataset.i }));

  $('#terminar').onclick = () => {
    if (totalSeries(a) === 0) { toast('Apunta al menos una serie'); return; }
    a.min = Math.round((Date.now() - a.ini) / 60000);
    S.sesiones.push(limpiarSesion(a)); S.activa = null; guardar();
    toast('¡Entrenamiento guardado! 💪');
    go('hoy', {}, true);
  };
  $('#descartar').onclick = () => {
    if (!confirm('¿Seguro que quieres borrar lo apuntado en este entrenamiento?')) return;
    S.activa = null; guardar(); go('hoy', {}, true);
  };
}

/* ========================= FICHA DE EJERCICIO ========================= */
function vEjercicio(app, p) {
  const r = rutinaPorId(p.r), slot = r.ejercicios[p.i], ex = ejDeSlot(r, slot);
  if (!S.activa || S.activa.rutina !== r.id) crearSesion(r.id);
  const a = S.activa;
  a.ejercicios[ex.id] = a.ejercicios[ex.id] || [];

  const ult = ultimaVez(ex.id);
  const esTiempo = ex.registro === 'tiempo';
  const objetivo = esTiempo ? `${ex.objetivoSeg} segundos` : `${r.series} series × ${r.reps} reps`;

  const cuerpo = `
    <div class="figbox" id="figbox"></div>

    <div class="chips" style="margin-bottom:14px">
      <span class="chip ${ex.lugar === 'En casa' ? 'ok' : 'acc'}">${ex.lugar === 'En casa' ? '🏠 Sin gimnasio' : (ex.lugar === 'Gimnasio' ? '🏋️ Gimnasio' : '🏠🏋️ Gimnasio o casa')}</span>
      <span class="chip">${ex.material}</span>
      <span class="chip">${ex.musculos}</span>
    </div>

    <div class="card" style="border-color:var(--acc);background:var(--acc-soft)">
      <h2 style="color:var(--acc)">Objetivo de hoy: ${objetivo}</h2>
      <p style="color:var(--txt)">${esTiempo ? 'Aguanta la posición sin perder la postura.' : 'Las últimas repeticiones deben costar, pero sin llegar al fallo.'}</p>
    </div>

    <div class="section-title">Apunta lo que haces</div>
    <div class="card" id="registro">
      ${ult ? `<p class="ultima">Última vez (${fechaCorta(ult.fecha)}): <b>${resumenSeries(ult.series, esTiempo)}</b></p>` : `<p class="ultima">Primera vez que lo haces. ¡Apunta el peso para saber por dónde vas!</p>`}
      <div id="series"></div>
      <button class="btn sec sm" id="addSerie" style="width:100%;margin-top:12px">+ Añadir serie</button>
    </div>

    <div class="section-title">Cómo se hace</div>
    <div class="card"><ol class="pasos">${ex.pasos.map(x => `<li>${x}</li>`).join('')}</ol></div>

    <div class="section-title">Errores que debes evitar</div>
    <div class="card"><ul class="avisos">${ex.errores.map(x => `<li>${x}</li>`).join('')}</ul></div>

    ${ex.progresion ? `<div class="card" style="background:var(--card2)"><h2>💡 Consejo</h2><p>${ex.progresion}</p></div>` : ''}

    ${slot.alt ? `<div class="section-title">Variante</div>
      <div class="card">
        <p style="margin-bottom:11px">Si no tienes el material, cambia por:</p>
        <div class="seg" id="segAlt">
          <button data-e="${slot.ej}" class="${ex.id === slot.ej ? 'on' : ''}">${EJERCICIOS[slot.ej].nombre}</button>
          <button data-e="${slot.alt}" class="${ex.id === slot.alt ? 'on' : ''}">${EJERCICIOS[slot.alt].nombre}</button>
        </div>
      </div>` : ''}

    <div class="row" style="margin-top:16px">
      ${p.i > 0 ? `<button class="btn sec" id="prev">‹ Anterior</button>` : ''}
      ${p.i < r.ejercicios.length - 1 ? `<button class="btn" id="next">Siguiente ›</button>` : `<button class="btn ok" id="finEj">Ir a terminar</button>`}
    </div>`;

  montar(app, cabecera(ex.nombre, r.nombre + ' · ' + slot.letra, true), cuerpo);
  $('#figbox').appendChild(figura(ex, { anim: true }));

  pintarSeries(ex, r, esTiempo);
  $('#addSerie').onclick = () => { a.ejercicios[ex.id].push({ kg: null, reps: null, ok: false }); guardar(); pintarSeries(ex, r, esTiempo); };

  const alt = $('#segAlt');
  if (alt) alt.querySelectorAll('button').forEach(b => b.onclick = () => {
    S.alts[r.id + '-' + slot.letra] = b.dataset.e; guardar(); go('ejercicio', p, true);
  });
  const pv = $('#prev'); if (pv) pv.onclick = () => go('ejercicio', { r: r.id, i: p.i - 1 }, true);
  const nx = $('#next'); if (nx) nx.onclick = () => go('ejercicio', { r: r.id, i: p.i + 1 }, true);
  const fe = $('#finEj'); if (fe) fe.onclick = () => history.back();
}

function resumenSeries(series, esTiempo) {
  return series.map(s => esTiempo
    ? (s.reps || 0) + ' s'
    : (s.kg ? fmtKg(s.kg) + ' kg × ' + (s.reps || '?') : (s.reps || '?') + ' reps')).join('  ·  ');
}

function pintarSeries(ex, r, esTiempo) {
  const cont = $('#series');
  const arr = S.activa.ejercicios[ex.id];
  const ult = ultimaVez(ex.id);

  if (!arr.length) {
    const nSug = parseInt(String(r.series).match(/\d+/)[0], 10) || 3;
    for (let i = 0; i < nSug; i++) arr.push({ kg: null, reps: null, ok: false });
    guardar();
  }

  cont.innerHTML = arr.map((s, i) => {
    const sug = ult && ult.series[i] ? ult.series[i] : null;
    const phKg = sug && sug.kg ? fmtKg(sug.kg) : 'kg';
    const phRp = sug && sug.reps ? sug.reps : (esTiempo ? ex.objetivoSeg : String(r.reps).match(/\d+/)[0]);
    return `<div class="serie ${s.ok ? 'hecha' : ''}" data-i="${i}">
      <div class="num">${i + 1}</div>
      ${esTiempo ? '' : `<div class="fld"><input type="number" inputmode="decimal" step="0.5" min="0" data-c="kg" value="${s.kg == null ? '' : s.kg}" placeholder="${phKg}"><span class="u">kg</span></div>`}
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
        if (arr[i].reps == null) { arr[i].reps = num(inp.placeholder) || null; inp.value = arr[i].reps ?? ''; }
        const kIn = row.querySelector('[data-c="kg"]');
        if (kIn && arr[i].kg == null && kIn.placeholder !== 'kg') { arr[i].kg = num(kIn.placeholder); kIn.value = arr[i].kg; }
        arr[i].ok = true; guardar();
        row.classList.add('hecha');
        vibra(40);
        if (i < arr.length - 1) descanso(S.descanso);
      } else { arr[i].ok = false; guardar(); row.classList.remove('hecha'); }
    };
    row.querySelector('[data-a="del"]').onclick = () => { arr.splice(i, 1); guardar(); pintarSeries(ex, r, esTiempo); };
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

/* ========================= RESISTENCIA ========================= */
function vResistencia(app) {
  const auto = faseSemana();
  const cuerpo = `
    <div class="card" style="background:var(--card2)">
      <h2>Semana ${semanaPlan()} del plan</h2>
      <p>Te toca la fase de <b style="color:var(--acc)">${auto.titulo.toLowerCase()}</b>. Puedes hacerlo corriendo, en bici o en la bici estática.</p>
    </div>

    <div class="section-title">Elige la fase</div>
    ${RESISTENCIA.map(f => `
      <button class="item ${f.id === auto.id ? 'done' : ''}" data-f="${f.id}">
        <div class="bar ${f.id === auto.id ? 'verde' : 'azul'}"></div>
        <div class="txt">
          <b>${f.titulo}${f.id === auto.id ? ' · te toca esta' : ''}</b>
          <small>${f.resumen}</small>
          <small style="margin-top:3px;color:#6d7a8c">${f.detalle}</small>
        </div>
        <div class="go">›</div>
      </button>`).join('')}

    <div class="card" style="margin-top:16px">
      <h2>Cómo saber tu intensidad</h2>
      <p><b style="color:var(--txt)">80-90 %:</b> vas fuerte, puedes decir 3 o 4 palabras seguidas y no más.<br>
      <b style="color:var(--txt)">90-95 %:</b> casi al máximo, no puedes hablar.<br>
      <b style="color:var(--txt)">50-60 %:</b> suave, puedes hablar sin problema, pero sin parar.</p>
    </div>`;

  montar(app, cabecera('Resistencia', 'Semana ' + semanaPlan(), true), cuerpo);
  document.querySelectorAll('.item[data-f]').forEach(b => b.onclick = () => go('preparar', { f: b.dataset.f }));
}

function vPreparar(app, p) {
  const f = RESISTENCIA.find(x => x.id === p.f);
  let v = f.repsDef;

  const cuerpo = `
    <div class="card">
      <h2>${f.titulo}</h2>
      <p>${f.resumen}</p>
    </div>
    <div class="section-title">¿Cuántas repeticiones?</div>
    <div class="card">
      <div class="stepper">
        <button id="menos">−</button>
        <div class="v" id="vv">${v}</div>
        <button id="mas">+</button>
      </div>
      <p style="text-align:center;margin-top:10px" id="totalTxt"></p>
    </div>
    ${f.dosSeries ? `<div class="card" style="background:var(--card2)"><p>Harás <b style="color:var(--txt)">2 series</b> con 2 minutos de descanso entre ellas, como pone en el plan.</p></div>` : ''}
    <button class="btn" id="empezarInt" style="margin-top:8px">▶ Empezar</button>
    <p class="vacio">Sonará un aviso en cada cambio de ritmo. Deja el móvil en el bolsillo, ya vibra.</p>`;

  montar(app, cabecera(f.titulo, 'Resistencia', true), cuerpo);

  const dur = () => {
    const ciclo = f.bloque.reduce((a, b) => a + b.seg, 0);
    let t = ciclo * v * (f.dosSeries ? 2 : 1) + (f.dosSeries ? f.descansoSerie : 0);
    return Math.round(t / 60);
  };
  const refrescar = () => { $('#vv').textContent = v; $('#totalTxt').innerHTML = `Duración total: <b style="color:var(--txt)">${dur()} minutos</b>`; };
  refrescar();
  $('#menos').onclick = () => { v = Math.max(f.repsMin, v - 1); refrescar(); };
  $('#mas').onclick = () => { v = Math.min(f.repsMax, v + 1); refrescar(); };
  $('#empezarInt').onclick = () => { beep(660, 60, .1); go('intervalos', { f: f.id, v }); };
}

/* --- temporizador de intervalos --- */
let intTimer = null, intEstado = null;

function construirCola(f, v) {
  const cola = [];
  const series = f.dosSeries ? 2 : 1;
  for (let s = 0; s < series; s++) {
    for (let i = 0; i < v; i++) f.bloque.forEach(b => cola.push({ nombre: b.nombre, seg: b.seg, tipo: b.tipo, vuelta: i + 1, serie: s + 1 }));
    if (f.dosSeries && s === 0) cola.push({ nombre: 'Descanso', seg: f.descansoSerie, tipo: 'baja', vuelta: 0, serie: 1 });
  }
  return cola;
}

function vIntervalos(app, p) {
  const f = RESISTENCIA.find(x => x.id === p.f);
  const cola = construirCola(f, p.v);
  const totalSeg = cola.reduce((a, b) => a + b.seg, 0);

  app.innerHTML = '';
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
      <div class="sub" id="sub">Vuelta 1 de ${p.v}</div>
      <div class="sub" id="tot" style="margin-top:5px"></div>
    </div>
    <div class="row" style="margin-top:26px">
      <button class="btn sec" id="pausa">⏸ Pausa</button>
      <button class="btn danger" id="parar">■ Terminar</button>
    </div>
    <p class="vacio" id="siguiente"></p>`;
  app.appendChild(m);

  intEstado = { f, cola, i: 0, restante: cola[0].seg * 1000, corriendo: true, ini: Date.now(), hechos: 0, v: p.v };
  mantenerPantalla(true);

  const arc = $('#arc'), ring = $('#ring');
  const CIRC = 2 * Math.PI * 44;

  const pinta = () => {
    const e = intEstado, it = e.cola[e.i];
    const q = Math.max(0, e.restante / 1000);
    $('#big').textContent = Math.floor(q / 60) + ':' + String(Math.floor(q % 60)).padStart(2, '0');
    $('#fase').textContent = it.nombre;
    $('#fase').style.color = it.tipo === 'alta' ? 'var(--rojo)' : 'var(--azul)';
    ring.className = 'ring ' + it.tipo;
    arc.setAttribute('stroke-dashoffset', String(CIRC * (1 - q / it.seg)));
    $('#sub').textContent = it.vuelta ? `Vuelta ${it.vuelta} de ${e.v}` + (e.f.dosSeries ? ` · serie ${it.serie} de 2` : '') : 'Descanso entre series';
    const restoTotal = e.cola.slice(e.i + 1).reduce((a, b) => a + b.seg, 0) + q;
    $('#tot').textContent = `Quedan ${Math.ceil(restoTotal / 60)} min de ${Math.round(totalSeg / 60)}`;
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
      if (e.i >= e.cola.length) { gong(); setTimeout(() => gong(), 500); terminarIntervalos(true); return; }
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
  $('#parar').onclick = () => {
    if (confirm('¿Terminar la sesión de resistencia?')) terminarIntervalos(false);
  };
  marcarNav();
}

function terminarIntervalos(completo) {
  clearInterval(intTimer);
  mantenerPantalla(false);
  const e = intEstado;
  if (!e) { go('hoy', {}, true); return; }
  const min = Math.max(1, Math.round((Date.now() - e.ini) / 60000));
  S.sesiones.push({ tipo: 'resistencia', fase: e.f.id, fecha: hoyISO(), minutos: min, vueltas: e.v, completo: !!completo });
  guardar();
  intEstado = null;
  toast(completo ? `¡Terminado! ${min} minutos 🏃` : `Guardado: ${min} minutos`);
  go('hoy', {}, true);
}

/* ========================= PROGRESO ========================= */
function vProgreso(app) {
  const fuerza = S.sesiones.filter(s => s.tipo === 'fuerza');
  const cardio = S.sesiones.filter(s => s.tipo === 'resistencia');

  // ejercicios entrenados, ordenados por uso reciente
  const usados = [];
  for (let i = S.sesiones.length - 1; i >= 0; i--) {
    const s = S.sesiones[i];
    if (s.tipo !== 'fuerza') continue;
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
    const m = mejorMarca(id);
    return `<button class="item" data-e="${id}">
        <div class="thumb" data-fig="${id}"></div>
        <div class="txt"><b>${ex.nombre}</b><small>${m}</small></div>
        <div class="go">›</div>
      </button>`;
  }).join('') : `<p class="vacio">Todavía no has apuntado ningún entrenamiento.<br>Cuando lo hagas, aquí verás cómo vas subiendo de peso.</p>`}

    ${S.sesiones.length ? `<div class="section-title">Historial</div>
      <div class="card hist">${S.sesiones.slice().reverse().slice(0, 25).map(s => `
        <div><span>${fechaCorta(s.fecha)} · ${s.tipo === 'fuerza' ? rutinaPorId(s.rutina).nombre : 'Resistencia'}</span>
        <b>${s.tipo === 'fuerza' ? totalSeries(s) + ' series' : s.minutos + ' min'}</b></div>`).join('')}</div>` : ''}`;

  montar(app, cabecera('Progreso', 'Semana ' + semanaPlan() + ' del plan'), cuerpo);
  document.querySelectorAll('.thumb[data-fig]').forEach(t => t.appendChild(makeFigure(EJERCICIOS[t.dataset.fig], { small: true })));
  document.querySelectorAll('.item[data-e]').forEach(b => b.onclick = () => go('ejHist', { e: b.dataset.e }));
}

function serieDe(id) {
  const out = [];
  S.sesiones.forEach(s => {
    if (s.tipo !== 'fuerza' || !s.ejercicios || !s.ejercicios[id]) return;
    const ss = s.ejercicios[id].filter(x => x.reps || x.kg);
    if (!ss.length) return;
    const maxKg = Math.max(...ss.map(x => x.kg || 0));
    const maxReps = Math.max(...ss.map(x => x.reps || 0));
    out.push({ fecha: s.fecha, maxKg, maxReps, series: ss });
  });
  return out;
}

function mejorMarca(id) {
  const d = serieDe(id);
  if (!d.length) return 'Sin datos';
  const kg = Math.max(...d.map(x => x.maxKg));
  const reps = Math.max(...d.map(x => x.maxReps));
  const ex = EJERCICIOS[id];
  if (kg > 0) return `Mejor: ${fmtKg(kg)} kg · ${d.length} ${d.length > 1 ? 'sesiones' : 'sesión'}`;
  return `Mejor: ${reps} ${ex.registro === 'tiempo' ? 'segundos' : 'reps'} · ${d.length} ${d.length > 1 ? 'sesiones' : 'sesión'}`;
}

function vEjHist(app, p) {
  const ex = EJERCICIOS[p.e];
  const d = serieDe(p.e);
  const usaKg = d.some(x => x.maxKg > 0);
  const vals = d.map(x => usaKg ? x.maxKg : x.maxReps);

  const cuerpo = `
    <div class="figbox" id="figbox"></div>
    <div class="card">
      <h2>${usaKg ? 'Peso máximo por día' : 'Mejor serie por día'}</h2>
      ${vals.length > 1 ? spark(vals) : '<p>Necesitas al menos dos entrenamientos para ver la evolución.</p>'}
      <div class="hist" style="margin-top:12px">
        ${d.slice().reverse().map(x => `<div><span>${fechaCorta(x.fecha)}</span><b>${resumenSeries(x.series, ex.registro === 'tiempo')}</b></div>`).join('')}
      </div>
    </div>`;

  montar(app, cabecera(ex.nombre, 'Progreso', true), cuerpo);
  $('#figbox').appendChild(figura(ex, { anim: true }));
}

function spark(vals) {
  const w = 300, hh = 46, max = Math.max(...vals), min = Math.min(...vals);
  const rango = (max - min) || 1;
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
    <div class="section-title">Entrenamiento</div>
    <div class="card">
      <label class="fld2"><span>Categoría</span>
        <select id="nivel">
          <option value="2" ${S.nivel === 2 ? 'selected' : ''}>Cadete 2º año (cargas externas)</option>
          <option value="1" ${S.nivel === 1 ? 'selected' : ''}>Cadete 1er año (autocargas)</option>
        </select>
      </label>
      <label class="fld2"><span>Primer día del plan</span>
        <input type="date" id="inicio" value="${S.inicio || hoyISO()}">
      </label>
      <label class="fld2" style="margin-bottom:0"><span>Descanso entre series (segundos)</span>
        <input type="number" id="descanso" step="15" min="30" max="300" value="${S.descanso}">
      </label>
    </div>

    <div class="card">
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
    <div class="card">
      <button class="btn danger" id="borrar">Borrar todos mis datos</button>
    </div>

    <p class="vacio">Plan del entrenador: 6 semanas de pretemporada.<br>Mínimo 2 días de fuerza + 2 de resistencia.</p>`;

  montar(app, cabecera('Ajustes', null, true), cuerpo);

  $('#nivel').onchange = (e) => { S.nivel = +e.target.value; guardar(); toast('Categoría cambiada'); };
  $('#inicio').onchange = (e) => { S.inicio = e.target.value; guardar(); toast('Semana ' + semanaPlan() + ' del plan'); };
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
        const d = JSON.parse(r.result);
        if (!d.sesiones) throw 0;
        S = Object.assign({}, DEF, d); guardar();
        toast('Datos importados'); go('hoy', {}, true);
      } catch (x) { toast('Ese fichero no vale'); }
    };
    r.readAsText(f);
  };
  $('#borrar').onclick = () => {
    if (!confirm('Se borrarán TODOS los entrenamientos apuntados. ¿Seguro?')) return;
    if (!confirm('De verdad, ¿seguro? Esto no se puede deshacer.')) return;
    localStorage.removeItem(KEY); S = Object.assign({}, DEF); go('hoy', {}, true);
  };
}

/* ========================= ARRANQUE ========================= */
function iniciar() {
  document.querySelectorAll('nav.bottom button').forEach(b => b.onclick = () => {
    const d = { hoy: 'hoy', fuerza: 'fuerza', cardio: 'resistencia', progreso: 'progreso' }[b.dataset.t];
    go(d);
  });
  history.replaceState({ n: 'hoy', p: {} }, '');
  pintar();

  // desbloquea el audio en el primer toque
  document.addEventListener('touchstart', () => {
    if (!AC && S.sonido) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } }
  }, { once: true, passive: true });

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
}
document.addEventListener('DOMContentLoaded', iniciar);
