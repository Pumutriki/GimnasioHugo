/* =========================================================================
   data.js — Plan "Trabajo físico de verano: categoría cadete (1er y 2º año)"
   Contenido fiel al PDF del entrenador + fichas técnicas de cada ejercicio.
   ========================================================================= */

const P = pose; // atajo

/* -------------------------------------------------------------------------
   EJERCICIOS
   lugar:    dónde se hace  → 'Gimnasio' | 'Gimnasio o casa' | 'En casa'
   material: qué necesitas
   registro: 'peso' (kg × reps) | 'reps' (sólo repeticiones) | 'tiempo' (seg)
------------------------------------------------------------------------- */
const EJERCICIOS = {

  /* ===================== AUTOCARGAS (peso corporal) ===================== */
  flexiones: {
    id: 'flexiones', nombre: 'Flexiones', lugar: 'En casa', material: 'Nada',
    musculos: 'Pecho, tríceps y hombro', registro: 'reps', tempo: 1200,
    pasos: [
      'Manos en el suelo un poco más abiertas que los hombros, a la altura del pecho.',
      'Cuerpo recto como una tabla: cabeza, cadera y talones en línea. Aprieta abdomen y glúteos.',
      'Baja controlado en 2 segundos hasta que el pecho quede a un puño del suelo. Codos a unos 45°, no abiertos del todo.',
      'Empuja el suelo con fuerza para subir y estira los brazos del todo arriba.'
    ],
    errores: [
      'Sacar la cadera hacia arriba o dejarla caer: pierdes toda la tensión del core.',
      'Bajar sólo la cabeza y no el pecho.',
      'Abrir los codos a 90°: castiga el hombro.'
    ],
    progresion: 'Si te salen menos de 8: apoya las manos en un banco o en el borde de la cama. Si te sobran las 12: pon los pies elevados en una silla.',
    scene: [],
    poseA: P([54, 92], [70, 96], [128, 108], [[70, 120], [62, 146]], [[78, 120], [70, 146]], [[160, 122], [192, 142], [200, 148]], [[158, 126], [188, 146], [196, 150]], 8),
    poseB: P([52, 112], [68, 116], [126, 120], [[92, 128], [62, 146]], [[98, 128], [70, 146]], [[160, 130], [192, 144], [200, 150]], [[158, 132], [188, 148], [196, 152]], 8)
  },

  remoMesa: {
    id: 'remoMesa', nombre: 'Remo en mesa', lugar: 'En casa', material: 'Una mesa firme',
    musculos: 'Espalda (dorsal), bíceps', registro: 'reps', tempo: 1300,
    pasos: [
      'Túmbate boca arriba debajo de una mesa sólida (que no se vuelque).',
      'Agarra el borde con las manos a la anchura de los hombros, brazos estirados.',
      'Cuerpo recto desde los hombros hasta los talones, sin sacar la cadera.',
      'Tira con los codos hacia atrás hasta tocar el borde con el pecho. Aprieta las escápulas y baja despacio.'
    ],
    errores: [
      'Tirar sólo con los brazos: piensa en llevar los codos hacia el bolsillo.',
      'Doblar la cadera para llegar más arriba.',
      'Usar una mesa ligera: comprueba antes que aguanta tu peso.'
    ],
    progresion: 'Más fácil: dobla las rodillas y apoya los pies. Más difícil: pon los talones en una silla.',
    scene: [{ t: 'mesa', x: 34, y: 60, w: 116 }],
    poseA: P([50, 106], [64, 108], [126, 118], [[72, 88], [80, 68]], [[70, 92], [80, 68]], [[160, 126], [194, 136], [204, 128]], [[158, 130], [192, 140], [202, 132]], 8),
    poseB: P([50, 90], [64, 92], [126, 106], [[90, 88], [80, 68]], [[88, 94], [80, 68]], [[160, 116], [194, 128], [204, 120]], [[158, 120], [192, 132], [202, 124]], 8)
  },

  remoTRX: {
    id: 'remoTRX', nombre: 'Remo en TRX', lugar: 'Gimnasio o casa', material: 'TRX o anillas',
    musculos: 'Espalda (dorsal), bíceps', registro: 'reps', tempo: 1300,
    pasos: [
      'Agarra las cintas y camina con los pies hacia delante hasta quedar inclinado hacia atrás.',
      'Brazos estirados, cuerpo recto y firme, mirada al frente.',
      'Tira llevando los codos pegados al cuerpo hasta que las manos lleguen al pecho.',
      'Baja frenando 2 segundos hasta estirar del todo.'
    ],
    errores: [
      'Doblar la cadera (quedarte "sentado" en el aire).',
      'Encoger los hombros hacia las orejas.',
      'Dejarte caer sin frenar en la bajada.'
    ],
    progresion: 'Cuanto más adelantes los pies (más tumbado), más difícil. Para bajar la dificultad, ponte más de pie.',
    scene: [{ t: 'trx', ax: 150, ay: 12, hx: 112, hy: 66 }],
    poseA: P([48, 70], [62, 76], [106, 104], [[84, 68], [112, 66]], [[82, 74], [106, 70]], [[138, 124], [170, 146], [180, 150]], [[134, 128], [166, 148], [176, 152]], 8),
    poseB: P([56, 56], [70, 62], [112, 94], [[94, 78], [112, 66]], [[92, 84], [106, 70]], [[142, 116], [170, 146], [180, 150]], [[138, 120], [166, 148], [176, 152]], 8)
  },

  elevacionCadera: {
    id: 'elevacionCadera', nombre: 'Elevación de cadera a una pierna', lugar: 'En casa', material: 'Nada',
    musculos: 'Glúteo e isquiotibiales', registro: 'reps', tempo: 1200,
    pasos: [
      'Túmbate boca arriba con una rodilla doblada y el pie plano en el suelo, cerca del glúteo.',
      'Estira la otra pierna hacia arriba y mantenla así todo el ejercicio.',
      'Empuja el suelo con el talón y sube la cadera hasta que el cuerpo quede en línea recta.',
      'Aprieta el glúteo 1 segundo arriba y baja despacio sin tocar el suelo.'
    ],
    errores: [
      'Arquear la zona lumbar en vez de apretar el glúteo.',
      'Empujar con la punta del pie en vez de con el talón.',
      'Ir rápido: el glúteo trabaja cuando aprietas arriba.'
    ],
    progresion: 'Cuenta las repeticiones de cada pierna por separado. Para más intensidad, apoya el pie en una silla baja.',
    scene: [],
    poseA: P([38, 132], [56, 134], [116, 140], [[74, 144], [96, 150]], [[74, 146], [96, 152]], [[142, 112], [166, 88], [176, 82]], [[140, 118], [156, 148], [168, 150]], 8),
    poseB: P([38, 132], [56, 134], [116, 110], [[74, 144], [96, 150]], [[74, 146], [96, 152]], [[146, 92], [170, 70], [180, 64]], [[140, 112], [156, 148], [168, 150]], 8)
  },

  puenteDeslizando: {
    id: 'puenteDeslizando', nombre: 'Puente deslizando', lugar: 'En casa', material: 'Suelo liso y dos trapos (o calcetines)',
    musculos: 'Isquiotibiales y glúteo', registro: 'reps', tempo: 1400,
    pasos: [
      'Boca arriba, rodillas dobladas y talones sobre dos trapos en suelo liso.',
      'Sube la cadera hasta hacer el puente y mantenla arriba todo el rato.',
      'Desliza los talones hacia delante hasta casi estirar las piernas, sin que la cadera caiga.',
      'Vuelve arrastrando los talones hacia el glúteo.'
    ],
    errores: [
      'Dejar caer la cadera cuando estiras las piernas (es el error más común).',
      'Ir demasiado lejos y perder el control.',
      'Hacerlo sobre moqueta: no desliza.'
    ],
    progresion: 'Si notas mucho los isquios y te dan calambres, reduce el recorrido y haz menos repeticiones.',
    scene: [],
    poseA: P([38, 130], [56, 132], [112, 112], [[74, 142], [96, 148]], [[74, 144], [96, 150]], [[140, 110], [154, 146], [166, 148]], [[136, 114], [150, 148], [162, 150]], 8),
    poseB: P([38, 130], [56, 132], [110, 122], [[74, 142], [96, 148]], [[74, 144], [96, 150]], [[152, 124], [188, 142], [196, 134]], [[148, 128], [184, 146], [192, 138]], 8)
  },

  subidaCajon: {
    id: 'subidaCajon', nombre: 'Subida a cajón', lugar: 'Gimnasio o casa', material: 'Cajón, banco o silla firme',
    musculos: 'Cuádriceps y glúteo', registro: 'peso',
    pasos: [
      'Ponte de frente a un cajón que te deje la rodilla más o menos a 90° al apoyar el pie.',
      'Apoya todo el pie encima (no sólo la punta).',
      'Sube empujando con la pierna de arriba, sin dar impulso con la de abajo.',
      'Baja controlado con la misma pierna. Termina todas las repeticiones antes de cambiar.'
    ],
    errores: [
      'Impulsarte con el pie del suelo o dar saltitos.',
      'Tirar del cuerpo hacia delante en vez de empujar con la pierna.',
      'Bajar de golpe.'
    ],
    progresion: 'Cuando te salgan fáciles, sujeta una mancuerna en cada mano o sube a un cajón más alto.',
    scene: [{ t: 'cajon', x: 140, y: 118, w: 62 }],
    poseA: P([86, 36], [86, 50], [88, 92], [[92, 70], [94, 92]], [[80, 70], [82, 92]], [[88, 120], [88, 148], [76, 152]], [[120, 100], [146, 114], [158, 116]], 9),
    poseB: P([144, 22], [144, 36], [146, 76], [[152, 54], [154, 76]], [[138, 54], [136, 76]], [[124, 92], [116, 114], [104, 118]], [[148, 100], [150, 116], [162, 118]], 9)
  },

  planchaDeslizando: {
    id: 'planchaDeslizando', nombre: 'Plancha con deslizamiento', lugar: 'En casa', material: 'Suelo liso y dos trapos',
    musculos: 'Core (abdomen profundo)', registro: 'tiempo', objetivoSeg: 40, tempo: 1600,
    pasos: [
      'Plancha apoyada en los antebrazos, codos justo debajo de los hombros.',
      'Cuerpo recto: mete la cadera (retroversión) y aprieta glúteos y abdomen.',
      'Desliza los antebrazos un poco hacia delante y vuelve, sin que la cadera se mueva.',
      'Aguanta 40 segundos respirando (no aguantes la respiración).'
    ],
    errores: [
      'Subir la cadera para descansar.',
      'Hundir la zona lumbar.',
      'Alejar tanto los brazos que pierdes la postura: mejor poco recorrido y bien.'
    ],
    progresion: 'Si aguantas los 40 s sin temblar, aleja un poco más los brazos o apoya los pies más juntos.',
    scene: [],
    poseA: P([58, 98], [72, 102], [128, 114], [[76, 142], [48, 144]], [[80, 144], [52, 146]], [[162, 126], [194, 144], [202, 150]], [[160, 130], [190, 148], [198, 152]], 8),
    poseB: P([46, 104], [60, 108], [126, 120], [[58, 144], [28, 146]], [[62, 146], [32, 148]], [[160, 130], [194, 146], [202, 152]], [[158, 134], [190, 150], [198, 154]], 8)
  },

  /* ===================== BLOQUE 1 ===================== */
  pressBanca: {
    id: 'pressBanca', nombre: 'Press banca con mancuernas', lugar: 'Gimnasio', material: 'Banco plano + 2 mancuernas',
    musculos: 'Pecho, hombro y tríceps', registro: 'peso', gear: 'mancuernas', tempo: 1300,
    pasos: [
      'Túmbate en el banco con los pies bien apoyados en el suelo y las mancuernas a la altura del pecho.',
      'Escápulas apretadas hacia abajo y atrás, pecho alto.',
      'Baja las mancuernas en 2 segundos hasta la altura del pecho, con los codos a unos 45° del cuerpo.',
      'Empuja hacia arriba y ligeramente hacia dentro, sin llegar a chocar las mancuernas.'
    ],
    errores: [
      'Abrir los codos del todo (en cruz): riesgo de hombro.',
      'Rebotar las mancuernas en el pecho.',
      'Despegar la cadera del banco para levantar más peso.'
    ],
    progresion: 'Sube de peso sólo cuando hagas todas las series en la parte alta del rango (10 reps) con técnica perfecta.',
    scene: [{ t: 'banco', x: 44, y: 106, w: 128 }],
    poseA: P([58, 94], [74, 98], [132, 102], [[90, 114], [86, 86]], [[84, 118], [78, 90]], [[160, 112], [166, 146], [178, 150]], [[156, 116], [162, 148], [174, 152]], 8),
    poseB: P([58, 94], [74, 98], [132, 102], [[84, 74], [88, 46]], [[78, 78], [80, 50]], [[160, 112], [166, 146], [178, 150]], [[156, 116], [162, 148], [174, 152]], 8)
  },

  jalonPecho: {
    id: 'jalonPecho', nombre: 'Jalón al pecho, agarre prono', lugar: 'Gimnasio', material: 'Máquina de polea alta',
    musculos: 'Dorsal (espalda) y bíceps', registro: 'peso', gear: 'jalon', tempo: 1300,
    pasos: [
      'Ajusta la almohadilla de los muslos para que no te despegue del asiento.',
      'Agarra la barra con las palmas hacia delante, un poco más abiertas que los hombros.',
      'Pecho arriba, ligera inclinación atrás (unos 15°, no más).',
      'Tira de la barra al pecho llevando los codos hacia abajo y atrás. Sube controlando hasta estirar los brazos.'
    ],
    errores: [
      'Tirar detrás de la nuca: nunca lo hagas.',
      'Balancear el tronco para ayudarte con el peso.',
      'Soltar la barra de golpe arriba.'
    ],
    progresion: 'Piensa "codos al bolsillo trasero", no "manos abajo". Así trabaja la espalda y no sólo el bíceps.',
    scene: [{ t: 'polea', x: 198, cx: 118, sx: 92, sy: 104, sw: 48 }],
    poseA: P([118, 46], [116, 60], [112, 104], [[126, 40], [122, 20]], [[112, 40], [114, 20]], [[78, 106], [76, 142], [62, 146]], [[74, 110], [72, 144], [58, 148]], 9),
    poseB: P([118, 46], [116, 60], [112, 104], [[138, 62], [120, 72]], [[128, 66], [112, 74]], [[78, 106], [76, 142], [62, 146]], [[74, 110], [72, 144], [58, 148]], 9)
  },

  hipThrust: {
    id: 'hipThrust', nombre: 'Hip thrust', lugar: 'Gimnasio', material: 'Banco + barra (con almohadilla)',
    musculos: 'Glúteo', registro: 'peso', gear: 'barra-cadera', tempo: 1200,
    pasos: [
      'Apoya la parte de abajo de las escápulas en el borde del banco, barra sobre la cadera con almohadilla.',
      'Pies a la anchura de la cadera, tibias verticales cuando estés arriba.',
      'Mete la barbilla al pecho y empuja el suelo con los talones subiendo la cadera.',
      'Arriba: cuerpo en línea recta hombros-cadera-rodillas. Aprieta el glúteo 1 segundo y baja controlado.'
    ],
    errores: [
      'Arquear la lumbar para "subir más": el recorrido lo da el glúteo, no la espalda.',
      'Poner los pies demasiado cerca (trabaja el cuádriceps) o demasiado lejos (trabajan los isquios).',
      'Mirar al techo estirando el cuello.'
    ],
    progresion: 'Es el ejercicio donde más peso vas a mover. Sube de kilos en cuanto llegues a 10 repeticiones cómodas.',
    scene: [{ t: 'banco', x: 24, y: 100, w: 74 }],
    poseA: P([50, 92], [66, 98], [126, 140], [[84, 118], [104, 132]], [[80, 122], [100, 136]], [[158, 120], [174, 148], [186, 150]], [[154, 124], [170, 150], [182, 152]], 8),
    poseB: P([50, 92], [66, 98], [128, 102], [[86, 104], [108, 100]], [[82, 108], [104, 104]], [[162, 102], [174, 148], [186, 150]], [[158, 106], [170, 150], [182, 152]], 8)
  },

  zancadas: {
    id: 'zancadas', nombre: 'Zancadas', lugar: 'Gimnasio o casa', material: '2 mancuernas (o sin peso)',
    musculos: 'Cuádriceps, glúteo y equilibrio', registro: 'peso', gear: 'mancuernas', tempo: 1300,
    pasos: [
      'De pie, mancuernas a los lados, tronco erguido y mirada al frente.',
      'Da un paso largo hacia delante y baja vertical, sin lanzar el cuerpo hacia delante.',
      'Abajo: rodilla de delante sobre el tobillo (no pasada del pie) y rodilla de atrás casi rozando el suelo.',
      'Empuja con el talón de la pierna adelantada para volver. Alterna piernas.'
    ],
    errores: [
      'Paso corto: la rodilla se va muy por delante del pie.',
      'Inclinar el tronco hacia delante.',
      'Meter la rodilla hacia dentro al subir.'
    ],
    progresion: 'Cuenta las repeticiones por pierna. Si te cuesta el equilibrio, hazlas fijas (sin avanzar) antes de hacerlas caminando.',
    scene: [],
    poseA: P([106, 34], [106, 48], [106, 92], [[126, 68], [130, 92]], [[86, 68], [82, 92]], [[108, 120], [108, 148], [96, 152]], [[104, 120], [104, 148], [92, 152]], 9),
    poseB: P([100, 52], [100, 66], [102, 106], [[122, 84], [126, 108]], [[82, 84], [78, 108]], [[140, 122], [142, 150], [154, 152]], [[76, 138], [62, 150], [52, 146]], 9)
  },

  pressPallof: {
    id: 'pressPallof', nombre: 'Press pallof con rotación', lugar: 'Gimnasio', material: 'Polea o goma elástica',
    musculos: 'Core (antirrotación)', registro: 'peso', gear: 'goma', tempo: 1500,
    pasos: [
      'Colócate de lado a la polea, con la goma a la altura del pecho, y sepárate hasta notar tensión.',
      'Pies a la anchura de los hombros, rodillas algo flexionadas, glúteo apretado.',
      'Junta las manos en el pecho y estira los brazos al frente sin dejar que el cuerpo gire hacia la polea.',
      'Cuando estés estirado, gira el tronco despacio hacia el lado contrario y vuelve.'
    ],
    errores: [
      'Dejar que la goma te gire el tronco: la gracia es aguantar sin girar.',
      'Usar demasiada tensión y compensar con la espalda.',
      'Aguantar la respiración: suelta el aire al estirar.'
    ],
    progresion: 'No busques kilos: busca aguantar firme. Si tiemblas o te giras, baja la carga.',
    scene: [{ t: 'cable', ax: 200, ay: 74, hx: 200, hy: 74 }],
    poseA: P([98, 34], [98, 48], [100, 92], [[118, 68], [104, 74]], [[80, 68], [96, 76]], [[110, 120], [112, 148], [124, 152]], [[90, 120], [88, 148], [76, 152]], 9),
    poseB: P([98, 34], [98, 48], [100, 92], [[80, 72], [52, 74]], [[78, 78], [50, 80]], [[110, 120], [112, 148], [124, 152]], [[90, 120], [88, 148], [76, 152]], 9)
  },

  /* ===================== BLOQUE 2 ===================== */
  pressMilitar: {
    id: 'pressMilitar', nombre: 'Press militar unilateral', lugar: 'Gimnasio', material: '1 mancuerna',
    musculos: 'Hombro, tríceps y core', registro: 'peso', gear: 'mancuerna1', tempo: 1300,
    pasos: [
      'De pie, pies a la anchura de la cadera, una mancuerna apoyada en el hombro.',
      'Aprieta glúteo y abdomen: el cuerpo no se debe inclinar hacia el lado libre.',
      'Empuja la mancuerna hacia arriba hasta estirar el brazo del todo, con la mano acabando encima de la cabeza.',
      'Baja controlado hasta el hombro. Termina el lado y cambia.'
    ],
    errores: [
      'Arquear la lumbar y sacar las costillas para empujar.',
      'Inclinarte hacia el lado contrario.',
      'Quedarte a medio recorrido arriba.'
    ],
    progresion: 'Al ser unilateral notarás mucho el core. Si te inclinas, baja el peso.',
    scene: [],
    poseA: P([106, 34], [106, 48], [106, 92], [[124, 66], [116, 50]], [[94, 68], [92, 90]], [[110, 120], [110, 148], [98, 152]], [[102, 120], [102, 148], [90, 152]], 9),
    poseB: P([106, 34], [106, 48], [106, 92], [[116, 40], [114, 16]], [[94, 68], [92, 90]], [[110, 120], [110, 148], [98, 152]], [[102, 120], [102, 148], [90, 152]], 9)
  },

  sealRow: {
    id: 'sealRow', nombre: 'Seal row', lugar: 'Gimnasio', material: 'Banco alto + 2 mancuernas',
    musculos: 'Espalda alta y dorsal', registro: 'peso', gear: 'mancuernas', tempo: 1300,
    pasos: [
      'Túmbate boca abajo en un banco alto, con el pecho apoyado y las mancuernas colgando.',
      'Cabeza en línea con la espalda, sin levantarla para mirar al frente.',
      'Rema llevando los codos hacia el techo y hacia atrás, apretando las escápulas arriba.',
      'Baja despacio hasta estirar los brazos del todo.'
    ],
    errores: [
      'Despegar el pecho del banco para ayudarte (ahí está la gracia del ejercicio: no puedes hacer trampa).',
      'Tirar sólo con los bíceps.',
      'Poner el banco tan bajo que las mancuernas tocan el suelo.'
    ],
    progresion: 'Es un remo muy estricto: usarás menos peso que en el remo con mancuerna. Es normal.',
    scene: [{ t: 'banco', x: 36, y: 92, w: 136 }],
    poseA: P([46, 82], [62, 88], [124, 92], [[74, 114], [78, 138]], [[70, 116], [74, 140]], [[156, 96], [188, 100], [196, 108]], [[154, 100], [186, 104], [194, 112]], 8),
    poseB: P([46, 82], [62, 88], [124, 92], [[92, 110], [78, 102]], [[88, 112], [74, 104]], [[156, 96], [188, 100], [196, 108]], [[154, 100], [186, 104], [194, 112]], 8)
  },

  curlFemoral: {
    id: 'curlFemoral', nombre: 'Flexión de rodilla en máquina', lugar: 'Gimnasio', material: 'Máquina de femoral',
    musculos: 'Isquiotibiales (parte de atrás del muslo)', registro: 'peso', gear: 'rodillo', tempo: 1200,
    pasos: [
      'Ajusta el rodillo justo encima de los talones, no sobre los gemelos.',
      'La rodilla debe quedar alineada con el eje de giro de la máquina.',
      'Flexiona llevando los talones hacia el glúteo tan lejos como puedas.',
      'Baja frenando 3 segundos hasta casi estirar del todo.'
    ],
    errores: [
      'Despegar la cadera del asiento o del respaldo para hacer más fuerza.',
      'Dejar caer el peso en la bajada (la bajada es la parte que más protege el isquio).',
      'Recorrido corto.'
    ],
    progresion: 'Este ejercicio previene lesiones de isquios. Prioriza la bajada lenta sobre los kilos.',
    scene: [{ t: 'maquinaCurl', x: 34, y: 104, w: 118 }],
    poseA: P([42, 94], [58, 98], [122, 102], [[80, 118], [96, 130]], [[76, 120], [92, 132]], [[152, 104], [188, 108], [196, 116]], [[150, 108], [186, 112], [194, 120]], 8),
    poseB: P([42, 94], [58, 98], [122, 102], [[80, 118], [96, 130]], [[76, 120], [92, 132]], [[152, 104], [170, 74], [178, 66]], [[150, 108], [166, 78], [174, 70]], 8)
  },

  zancadaLateral: {
    id: 'zancadaLateral', nombre: 'Zancada lateral', lugar: 'Gimnasio o casa', material: '1 mancuerna (o sin peso)',
    musculos: 'Aductores, glúteo y cuádriceps', registro: 'peso', tempo: 1300,
    pasos: [
      'De pie, pies juntos y puntas al frente.',
      'Da un paso amplio hacia el lado y siéntate sobre esa pierna, doblando esa rodilla.',
      'La otra pierna se queda estirada, con el pie plano y la punta al frente.',
      'Pecho arriba y espalda recta. Empuja con el pie de la pierna doblada para volver al centro.'
    ],
    errores: [
      'Girar la punta del pie de la pierna estirada.',
      'Doblarte hacia delante como si recogieras algo del suelo.',
      'Meter la rodilla hacia dentro.'
    ],
    progresion: 'Muy útil para cambios de dirección. Empieza sin peso hasta que la cadera te permita bajar cómodo.',
    scene: [],
    poseA: P([110, 34], [110, 50], [110, 94], [[128, 72], [134, 94]], [[92, 72], [86, 94]], [[124, 120], [126, 148], [136, 152]], [[96, 120], [94, 148], [84, 152]], 9),
    poseB: P([98, 50], [98, 64], [96, 106], [[116, 84], [124, 104]], [[80, 84], [74, 104]], [[136, 124], [140, 148], [150, 152]], [[70, 128], [46, 148], [36, 150]], 9)
  },

  paseoGranjero: {
    id: 'paseoGranjero', nombre: 'Paseo del granjero (10 m)', lugar: 'Gimnasio', material: '2 mancuernas pesadas',
    musculos: 'Agarre, core, trapecio y piernas', registro: 'peso', gear: 'mancuernas-pesadas', tempo: 700,
    pasos: [
      'Coge una mancuerna pesada en cada mano, de pie y bien erguido.',
      'Hombros atrás y abajo, abdomen apretado, mirada al frente.',
      'Camina 10 metros con pasos normales y firmes, sin correr ni balancear los brazos.',
      'Deja el peso en el suelo con la espalda recta (agachándote, no doblando la espalda).'
    ],
    errores: [
      'Encoger los hombros hacia las orejas.',
      'Inclinarte hacia un lado si un peso es mayor que el otro.',
      'Soltar las mancuernas de golpe al acabar.'
    ],
    progresion: 'Apunta el peso de UNA mancuerna. Cuando termines los 10 m sin que se te abra la mano, sube kilos.',
    scene: [],
    poseA: P([108, 32], [108, 46], [108, 90], [[130, 68], [134, 94]], [[86, 68], [82, 94]], [[116, 118], [122, 148], [134, 150]], [[100, 118], [94, 148], [82, 150]], 9),
    poseB: P([108, 32], [108, 46], [108, 90], [[130, 68], [134, 94]], [[86, 68], [82, 94]], [[100, 118], [94, 148], [82, 150]], [[116, 118], [122, 148], [134, 150]], 9)
  },

  /* ===================== BLOQUE 3 ===================== */
  pressBancaUni: {
    id: 'pressBancaUni', nombre: 'Press banca con mancuerna unilateral', lugar: 'Gimnasio', material: 'Banco plano + 1 mancuerna',
    musculos: 'Pecho, tríceps y core (antirrotación)', registro: 'peso', gear: 'mancuerna1', tempo: 1300,
    pasos: [
      'Túmbate en el banco con UNA mancuerna. El otro brazo, apoyado en el pecho o estirado al lado.',
      'Aprieta glúteo y abdomen: el cuerpo tenderá a girar hacia el lado con peso y no debe hacerlo.',
      'Baja la mancuerna en 2 segundos hasta la altura del pecho.',
      'Empuja arriba sin girar el tronco. Termina el lado y cambia.'
    ],
    errores: [
      'Girar el hombro contrario despegándolo del banco.',
      'Coger el mismo peso que en el press a dos manos: aquí toca menos.',
      'Sacar la cadera para empujar.'
    ],
    progresion: 'Si notas que giras, baja el peso: la clave es aguantar cuadrado en el banco.',
    scene: [{ t: 'banco', x: 44, y: 106, w: 128 }],
    poseA: P([58, 94], [74, 98], [132, 102], [[90, 114], [86, 86]], [[88, 110], [106, 106]], [[160, 112], [166, 146], [178, 150]], [[156, 116], [162, 148], [174, 152]], 8),
    poseB: P([58, 94], [74, 98], [132, 102], [[84, 74], [88, 46]], [[88, 110], [106, 106]], [[160, 112], [166, 146], [178, 150]], [[156, 116], [162, 148], [174, 152]], 8)
  },

  remoMancuerna: {
    id: 'remoMancuerna', nombre: 'Remo con mancuerna', lugar: 'Gimnasio', material: 'Banco + 1 mancuerna',
    musculos: 'Dorsal, espalda media y bíceps', registro: 'peso', gear: 'mancuerna1', tempo: 1300,
    pasos: [
      'Apoya una mano y la rodilla del mismo lado en el banco. El otro pie firme en el suelo.',
      'Espalda plana y paralela al suelo, cuello en línea (mirando al suelo).',
      'Deja el brazo colgando estirado y rema llevando el codo hacia la cadera.',
      'Aprieta arriba 1 segundo y baja hasta estirar del todo, notando el estiramiento de la espalda.'
    ],
    errores: [
      'Girar el tronco para subir más la mancuerna.',
      'Redondear la espalda.',
      'Llevar el codo hacia fuera en vez de pegado al cuerpo.'
    ],
    progresion: 'Suele ser el ejercicio de espalda donde más peso mueves. Si no puedes bajar del todo, es que pesa demasiado.',
    scene: [{ t: 'banco', x: 96, y: 108, w: 104 }],
    poseA: P([44, 76], [58, 82], [116, 92], [[62, 112], [58, 140]], [[88, 96], [110, 106]], [[124, 120], [126, 148], [138, 150]], [[120, 122], [120, 148], [132, 152]], 8),
    poseB: P([44, 76], [58, 82], [116, 92], [[78, 100], [58, 100]], [[88, 96], [110, 106]], [[124, 120], [126, 148], [138, 150]], [[120, 122], [120, 148], [132, 152]], 8)
  },

  pesoMuerto: {
    id: 'pesoMuerto', nombre: 'Peso muerto con mancuernas', lugar: 'Gimnasio', material: '2 mancuernas',
    musculos: 'Isquiotibiales, glúteo y espalda baja', registro: 'peso', gear: 'mancuernas', tempo: 1400,
    pasos: [
      'De pie, mancuernas delante de los muslos, rodillas ligeramente flexionadas (y así se quedan).',
      'Saca el pecho y mantén la espalda recta todo el movimiento.',
      'Lleva la cadera hacia atrás como si empujaras una puerta con el culo, bajando las mancuernas pegadas a la pierna.',
      'Baja hasta notar tirón en la parte de atrás del muslo y sube apretando el glúteo.'
    ],
    errores: [
      'Redondear la espalda: es el error que puede lesionarte.',
      'Bajar doblando las rodillas como en una sentadilla.',
      'Separar las mancuernas de las piernas.'
    ],
    progresion: 'El recorrido lo marca tu flexibilidad: baja sólo hasta donde la espalda siga recta.',
    scene: [],
    poseA: P([106, 34], [106, 48], [106, 92], [[110, 70], [110, 94]], [[100, 70], [100, 94]], [[108, 120], [108, 148], [96, 152]], [[102, 120], [102, 148], [90, 152]], 9),
    poseB: P([76, 62], [88, 70], [128, 90], [[96, 92], [98, 118]], [[88, 94], [90, 120]], [[124, 118], [120, 148], [108, 152]], [[120, 120], [116, 150], [104, 152]], 9)
  },

  planchaMovimiento: {
    id: 'planchaMovimiento', nombre: 'Plancha con movimiento', lugar: 'En casa', material: 'Nada',
    musculos: 'Core (antirrotación) y hombro', registro: 'tiempo', objetivoSeg: 40, tempo: 1200,
    pasos: [
      'Plancha alta, con las manos bajo los hombros y los pies un poco separados.',
      'Cuerpo recto y cadera metida, sin que se mueva ni un centímetro.',
      'Levanta una mano y toca el hombro contrario, apóyala y cambia de mano.',
      'Alterna durante 40 segundos, lo más despacio y estable que puedas.'
    ],
    errores: [
      'Balancear la cadera de lado a lado al cambiar de mano (pon los pies más separados para evitarlo).',
      'Ir rápido: cuanto más lento, más trabaja el core.',
      'Hundir la zona lumbar.'
    ],
    progresion: 'Si la cadera se mueve mucho, junta menos los pies o toca el hombro más despacio.',
    scene: [],
    poseA: P([54, 88], [70, 94], [128, 110], [[74, 118], [70, 146]], [[64, 120], [60, 148]], [[162, 124], [194, 142], [202, 148]], [[160, 128], [190, 146], [198, 152]], 8),
    poseB: P([54, 86], [70, 92], [128, 110], [[92, 104], [76, 84]], [[64, 120], [60, 148]], [[162, 124], [194, 142], [202, 148]], [[158, 130], [186, 148], [194, 152]], 8)
  },

  sentadillaBulgara: {
    id: 'sentadillaBulgara', nombre: 'Sentadilla búlgara', lugar: 'Gimnasio o casa', material: 'Banco o silla + mancuernas (opcional)',
    musculos: 'Cuádriceps, glúteo y equilibrio', registro: 'peso', gear: 'mancuernas', tempo: 1300,
    pasos: [
      'Apoya el empeine del pie de atrás en un banco o silla, a la altura de la rodilla.',
      'El pie de delante debe quedar lo bastante adelantado para que la rodilla no se pase mucho del pie.',
      'Baja vertical en 2 segundos, con el tronco ligeramente inclinado hacia delante.',
      'Baja hasta que el muslo esté casi paralelo al suelo y sube empujando con el talón de delante.'
    ],
    errores: [
      'Poner el pie de delante demasiado cerca del banco.',
      'Perder el equilibrio por mirar al suelo: fija la vista en un punto al frente.',
      'Dejar caer la rodilla hacia dentro.'
    ],
    progresion: 'Primero domínalo sin peso. Después, mancuerna en cada mano. Cuenta las repeticiones por pierna.',
    scene: [{ t: 'cajon', x: 150, y: 116, w: 54 }],
    poseA: P([94, 34], [94, 48], [96, 92], [[104, 68], [106, 92]], [[86, 68], [84, 92]], [[96, 120], [94, 148], [82, 152]], [[128, 108], [154, 114], [166, 116]], 9),
    poseB: P([88, 58], [90, 72], [96, 112], [[100, 88], [102, 112]], [[82, 88], [80, 112]], [[100, 130], [94, 148], [82, 152]], [[128, 132], [154, 116], [166, 116]], 9)
  }
};

/* -------------------------------------------------------------------------
   RUTINAS DE FUERZA
   Los ejercicios A-E se hacen en circuito: A→B→C→D→E, descansas, y repites.
------------------------------------------------------------------------- */
const RUTINAS = [
  {
    id: 'autocargas', nivel: 1, nombre: 'Autocargas', subtitulo: 'Peso corporal · 1er año / en casa',
    series: '4 a 6', reps: '8 a 12', color: 'verde',
    nota: 'Puedes hacerlo en casa entero. Llega a las últimas repeticiones con esfuerzo alto, pero sin llegar al fallo.',
    ejercicios: [
      { letra: 'A', ej: 'flexiones' },
      { letra: 'B', ej: 'remoMesa', alt: 'remoTRX' },
      { letra: 'C', ej: 'elevacionCadera', alt: 'puenteDeslizando' },
      { letra: 'D', ej: 'sentadillaBulgara', alt: 'subidaCajon' },
      { letra: 'E', ej: 'planchaDeslizando' }
    ]
  },
  {
    id: 'bloque1', nivel: 2, nombre: 'Bloque 1', subtitulo: 'Cargas externas · 2º año',
    series: '3 a 5', reps: '6 a 10', color: 'azul',
    nota: 'Llega a las últimas repeticiones con esfuerzo alto, pero sin llegar al fallo.',
    ejercicios: [
      { letra: 'A', ej: 'pressBanca' },
      { letra: 'B', ej: 'jalonPecho' },
      { letra: 'C', ej: 'hipThrust' },
      { letra: 'D', ej: 'zancadas' },
      { letra: 'E', ej: 'pressPallof' }
    ]
  },
  {
    id: 'bloque2', nivel: 2, nombre: 'Bloque 2', subtitulo: 'Cargas externas · 2º año',
    series: '3 a 5', reps: '6 a 10', color: 'morado',
    nota: 'Llega a las últimas repeticiones con esfuerzo alto, pero sin llegar al fallo.',
    ejercicios: [
      { letra: 'A', ej: 'pressMilitar' },
      { letra: 'B', ej: 'sealRow' },
      { letra: 'C', ej: 'curlFemoral' },
      { letra: 'D', ej: 'zancadaLateral' },
      { letra: 'E', ej: 'paseoGranjero' }
    ]
  },
  {
    id: 'bloque3', nivel: 2, nombre: 'Bloque 3', subtitulo: 'Cargas externas · 2º año',
    series: '3 a 5', reps: '6 a 10', color: 'naranja',
    nota: 'Llega a las últimas repeticiones con esfuerzo alto, pero sin llegar al fallo.',
    ejercicios: [
      { letra: 'A', ej: 'pressBancaUni' },
      { letra: 'B', ej: 'remoMancuerna' },
      { letra: 'C', ej: 'pesoMuerto' },
      { letra: 'D', ej: 'sentadillaBulgara' },
      { letra: 'E', ej: 'planchaMovimiento' }
    ]
  }
];

/* -------------------------------------------------------------------------
   RESISTENCIA (según la semana del plan)
------------------------------------------------------------------------- */
const RESISTENCIA = [
  {
    id: 'r12', semanas: [1, 2], titulo: 'Semanas 1 y 2',
    resumen: '2 min al 80-90 % + 1 min al 50-60 %',
    detalle: 'Repetir de 6 a 10 veces = 18 a 30 minutos',
    repsMin: 6, repsMax: 10, repsDef: 8,
    bloque: [
      { nombre: 'Fuerte (80-90 %)', seg: 120, tipo: 'alta' },
      { nombre: 'Suave (50-60 %)', seg: 60, tipo: 'baja' }
    ]
  },
  {
    id: 'r34', semanas: [3, 4], titulo: 'Semanas 3 y 4',
    resumen: '4 min al 80-90 % + 2 min al 60 %',
    detalle: 'Repetir de 3 a 5 veces = 18 a 30 minutos',
    repsMin: 3, repsMax: 5, repsDef: 4,
    bloque: [
      { nombre: 'Fuerte (80-90 %)', seg: 240, tipo: 'alta' },
      { nombre: 'Suave (60 %)', seg: 120, tipo: 'baja' }
    ]
  },
  {
    id: 'r56', semanas: [5, 6], titulo: 'Semanas 5 y 6',
    resumen: '45 s al 90-95 % + 15 s andando',
    detalle: 'De 6 a 8 veces · descansar 2 min · repetir otras 6 a 8 veces',
    repsMin: 6, repsMax: 8, repsDef: 7, dosSeries: true, descansoSerie: 120,
    bloque: [
      { nombre: 'Muy fuerte (90-95 %)', seg: 45, tipo: 'alta' },
      { nombre: 'Andando', seg: 15, tipo: 'baja' }
    ]
  }
];

const FRECUENCIAS = [
  { id: 'minimo', nombre: 'Mínimo', fuerza: 2, resistencia: 2, texto: '2 días de fuerza + 2 de resistencia' },
  { id: 'optimo', nombre: 'Óptimo', fuerza: 3, resistencia: 2, texto: '3 días de fuerza + 2 de resistencia' },
  { id: 'ideal', nombre: 'Ideal', fuerza: 4, resistencia: 3, texto: '3 o 4 días de fuerza + 3 de resistencia' }
];
