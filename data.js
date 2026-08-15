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
  },

  /* ============ FUERZA CON BARRA ============ */
  sentadillaBarra: {
    id: 'sentadillaBarra', nombre: 'Sentadilla trasera con barra', lugar: 'Gimnasio', material: 'Barra + jaula de sentadilla',
    musculos: 'Cuádriceps, glúteo y core', registro: 'peso', gear: 'barra-espalda', tempo: 1400,
    pasos: [
      'Barra apoyada sobre los trapecios (nunca sobre el cuello), manos algo más abiertas que los hombros.',
      'Pies a la anchura de los hombros con las puntas ligeramente hacia fuera. Coge aire y aprieta el abdomen.',
      'Baja en 2 segundos llevando la cadera atrás y abajo, con las rodillas siguiendo la dirección de los pies.',
      'Baja hasta que el muslo quede paralelo al suelo (o un poco más) y sube empujando el suelo con todo el pie.'
    ],
    errores: [
      'Meter las rodillas hacia dentro al subir: es el gesto que más lesiona el ligamento cruzado.',
      'Levantar los talones o cargar sólo en las puntas.',
      'Redondear la espalda baja en el punto más bajo.'
    ],
    progresion: 'Empieza con la barra sola para coger el gesto. Sube de peso sólo si mantienes la velocidad de subida: si el último repetido se te frena mucho, ese día ya está bien.',
    scene: [],
    poseA: P([104, 32], [104, 46], [104, 90], [[118, 58], [112, 44]], [[90, 58], [96, 44]], [[108, 118], [104, 148], [116, 152]], [[100, 118], [98, 148], [110, 152]], 9),
    poseB: P([90, 50], [94, 64], [98, 118], [[112, 84], [106, 70]], [[82, 84], [88, 70]], [[124, 124], [104, 148], [116, 152]], [[118, 126], [98, 148], [110, 152]], 9)
  },

  pesoMuertoBarra: {
    id: 'pesoMuertoBarra', nombre: 'Peso muerto rumano con barra', lugar: 'Gimnasio', material: 'Barra',
    musculos: 'Isquiotibiales, glúteo y espalda', registro: 'peso', gear: 'barra', tempo: 1500,
    pasos: [
      'De pie con la barra pegada a los muslos, manos a la anchura de los hombros y rodillas algo flexionadas.',
      'Saca pecho, mete las escápulas y mantén la espalda recta durante todo el movimiento.',
      'Lleva la cadera hacia atrás bajando la barra pegada a la pierna, sin doblar más las rodillas.',
      'Baja hasta notar tirón en la parte de atrás del muslo y sube apretando el glúteo con fuerza.'
    ],
    errores: [
      'Redondear la espalda: si pasa, es que bajas más de lo que te da la flexibilidad.',
      'Separar la barra de las piernas (se te va el peso hacia delante).',
      'Convertirlo en una sentadilla doblando las rodillas.'
    ],
    progresion: 'Es el mejor seguro contra las roturas de isquios, muy típicas en balonmano. Mejor bajar bien con menos peso que llegar al suelo mal.',
    scene: [],
    poseA: P([106, 34], [106, 48], [106, 92], [[110, 70], [112, 94]], [[100, 70], [98, 94]], [[108, 120], [108, 148], [96, 152]], [[102, 120], [102, 148], [90, 152]], 9),
    poseB: P([74, 62], [86, 70], [126, 90], [[98, 94], [102, 118]], [[90, 94], [94, 118]], [[122, 118], [118, 148], [106, 152]], [[118, 120], [114, 150], [102, 152]], 9)
  },

  dominadas: {
    id: 'dominadas', nombre: 'Dominadas', lugar: 'Gimnasio', material: 'Barra de dominadas',
    musculos: 'Dorsal, espalda y bíceps', registro: 'reps', tempo: 1300,
    pasos: [
      'Agarra la barra con las palmas hacia delante, un poco más abiertas que los hombros.',
      'Antes de tirar, baja los hombros (aléjalos de las orejas) y aprieta el abdomen para no balancearte.',
      'Tira llevando los codos hacia abajo y atrás hasta pasar la barbilla por encima de la barra.',
      'Baja controlado en 2 segundos hasta estirar del todo los brazos.'
    ],
    errores: [
      'Dar patadas o balancear el cuerpo para subir.',
      'Hacer medias repeticiones sin estirar abajo.',
      'Encoger los hombros al colgarte.'
    ],
    progresion: 'Si no te salen: hazlas con goma o salta arriba y baja frenando 4 segundos (3 series de 4). Cuando saques 8 limpias, empieza a ponerte lastre.',
    scene: [{ t: 'barraFija', x1: 56, x2: 156, y: 14 }],
    poseA: P([104, 54], [104, 66], [104, 102], [[116, 40], [124, 16]], [[92, 40], [84, 16]], [[106, 130], [92, 144], [80, 148]], [[102, 132], [88, 146], [76, 150]], 9),
    poseB: P([104, 30], [104, 42], [104, 86], [[128, 46], [124, 16]], [[80, 46], [84, 16]], [[106, 114], [92, 128], [80, 132]], [[102, 116], [88, 130], [76, 134]], 9)
  },

  /* ============ PLIOMETRÍA / POTENCIA ============ */
  saltoCMJ: {
    id: 'saltoCMJ', nombre: 'Salto vertical (CMJ)', lugar: 'Gimnasio o casa', material: 'Nada',
    musculos: 'Potencia de piernas', registro: 'reps', tempo: 900,
    pasos: [
      'De pie, pies a la anchura de los hombros.',
      'Baja rápido a media sentadilla llevando los brazos atrás: es un solo movimiento continuo, sin pararte abajo.',
      'Salta lo más alto que puedas lanzando los brazos hacia arriba.',
      'Cae suave, con la punta primero y las rodillas flexionadas, sin que se metan hacia dentro.'
    ],
    errores: [
      'Pararte abajo antes de saltar: pierdes el rebote elástico, que es lo que entrenamos.',
      'Caer con las piernas rígidas o con las rodillas hacia dentro.',
      'Hacer muchas repeticiones seguidas: en cuanto saltas menos, se acabó la serie.'
    ],
    progresion: 'Calidad total: cada salto al máximo, y descansa lo que necesites entre saltos. Si haces este ejercicio justo después de la sentadilla, saltarás más de lo normal (eso es lo que buscamos).',
    scene: [],
    poseA: P([100, 52], [100, 66], [102, 102], [[86, 86], [74, 104]], [[92, 90], [80, 108]], [[120, 120], [104, 148], [116, 152]], [[114, 122], [98, 148], [110, 152]], 9),
    poseB: P([104, 16], [104, 30], [104, 74], [[116, 48], [122, 22]], [[92, 48], [86, 22]], [[108, 104], [110, 132], [122, 134]], [[102, 104], [100, 132], [112, 136]], 9)
  },

  saltoCajon: {
    id: 'saltoCajon', nombre: 'Salto al cajón', lugar: 'Gimnasio', material: 'Cajón de pliometría',
    musculos: 'Potencia de piernas y aterrizaje', registro: 'reps', tempo: 900,
    pasos: [
      'Colócate a un paso del cajón, con una altura que puedas superar de sobra.',
      'Baja rápido a media sentadilla llevando los brazos atrás.',
      'Salta y cae ENCIMA del cajón con los dos pies a la vez, suave y con las rodillas flexionadas.',
      'Baja del cajón andando, nunca saltando: el objetivo es subir, no castigar las rodillas al bajar.'
    ],
    errores: [
      'Elegir un cajón demasiado alto: se acaba recogiendo mucho las piernas en el aire y no se salta más.',
      'Caer con un ruido seco: hay que aterrizar como un gato.',
      'Saltar hacia abajo desde el cajón.'
    ],
    progresion: 'Empieza con un cajón bajo y sube la altura sólo cuando caigas perfectamente estable. Anota en las repeticiones cuántos saltos buenos has hecho.',
    scene: [{ t: 'cajon', x: 140, y: 110, w: 64 }],
    poseA: P([86, 52], [86, 66], [88, 102], [[72, 86], [62, 104]], [[78, 90], [68, 108]], [[104, 120], [88, 148], [100, 152]], [[98, 122], [82, 148], [94, 152]], 9),
    poseB: P([168, 42], [168, 56], [170, 88], [[182, 66], [188, 50]], [[156, 66], [150, 50]], [[178, 96], [172, 110], [184, 112]], [[162, 96], [166, 110], [178, 112]], 9)
  },

  saltoLateral: {
    id: 'saltoLateral', nombre: 'Salto lateral (patinador)', lugar: 'Gimnasio o casa', material: 'Nada',
    musculos: 'Glúteo, aductores y estabilidad de rodilla', registro: 'reps', tempo: 800,
    pasos: [
      'Apóyate sobre una pierna, con la otra cruzada por detrás.',
      'Salta lateralmente hacia el otro lado, lo más lejos que controles.',
      'Cae sobre la pierna contraria y AGUANTA un segundo sin moverte, con la rodilla mirando hacia el pie.',
      'Cuando estés firme, salta hacia el otro lado. Un salto, una parada.'
    ],
    errores: [
      'Encadenar saltos sin frenar: lo importante aquí es aterrizar y aguantar.',
      'Que la rodilla se meta hacia dentro al caer (así se rompe el cruzado).',
      'Caer con el tronco desequilibrado hacia el lado.'
    ],
    progresion: 'Es puro balonmano: frenar y cambiar de dirección sobre una pierna. Gana distancia sólo cuando aguantes el aterrizaje completamente quieto.',
    scene: [],
    poseA: P([88, 40], [88, 54], [86, 96], [[104, 72], [116, 60]], [[70, 74], [58, 88]], [[92, 120], [92, 148], [102, 152]], [[70, 116], [56, 134], [46, 138]], 9),
    poseB: P([136, 48], [136, 62], [138, 102], [[120, 80], [108, 68]], [[154, 82], [166, 96]], [[134, 124], [130, 148], [140, 152]], [[158, 118], [172, 132], [182, 136]], 9)
  },

  lanzamientoRotacional: {
    id: 'lanzamientoRotacional', nombre: 'Lanzamiento rotacional con balón medicinal', lugar: 'Gimnasio', material: 'Balón medicinal (2-4 kg) + pared',
    musculos: 'Core rotador, cadera y hombro', registro: 'peso', gear: 'balon', tempo: 750,
    pasos: [
      'Colócate de lado a la pared, a un par de metros, con los pies a la anchura de los hombros.',
      'Coge el balón con las dos manos y llévalo atrás girando el tronco y la cadera, cargando el peso en la pierna de atrás.',
      'Lanza girando primero la cadera y después el tronco, como en un lanzamiento de balonmano, y suelta el balón contra la pared.',
      'Recoge el balón y repite. Todos los lanzamientos al máximo.'
    ],
    errores: [
      'Lanzar sólo con los brazos: la fuerza sale de la cadera.',
      'Quedarte con los pies clavados sin girar la cadera de atrás.',
      'Usar un balón demasiado pesado: pierdes velocidad y ya no entrenas potencia.'
    ],
    progresion: 'Apunta en los kilos el peso del balón. Con 2-3 kg vas sobrado: aquí manda la velocidad, no el peso. Es el ejercicio que más se parece a tu lanzamiento.',
    scene: [{ t: 'pared', x: 208 }],
    poseA: P([90, 36], [92, 50], [96, 94], [[76, 72], [66, 84]], [[80, 68], [70, 80]], [[116, 118], [124, 148], [136, 150]], [[78, 118], [70, 148], [58, 150]], 9),
    poseB: P([104, 34], [104, 48], [104, 92], [[124, 66], [156, 60]], [[120, 70], [152, 64]], [[120, 118], [128, 148], [140, 150]], [[86, 118], [80, 148], [68, 150]], 9)
  },

  lanzamientoCabeza: {
    id: 'lanzamientoCabeza', nombre: 'Lanzamiento sobre la cabeza con balón medicinal', lugar: 'Gimnasio', material: 'Balón medicinal (2-4 kg) + pared',
    musculos: 'Core, hombro y cadena de lanzamiento', registro: 'peso', gear: 'balon', tempo: 700,
    pasos: [
      'De frente a la pared, a dos o tres metros, con un pie ligeramente adelantado.',
      'Lleva el balón por detrás de la cabeza con los dos brazos, arqueando ligeramente el cuerpo.',
      'Lanza hacia delante llevando primero la cadera, luego el tronco y por último los brazos, como un saque de banda.',
      'Acompaña el lanzamiento con todo el cuerpo. Máxima velocidad en cada uno.'
    ],
    errores: [
      'Lanzar sólo de brazos, sin usar el cuerpo.',
      'Arquear demasiado la espalda baja en vez de trabajar con el abdomen.',
      'Encadenar lanzamientos con prisa: descansa entre repeticiones para lanzar siempre fuerte.'
    ],
    progresion: 'Anota el peso del balón. Este gesto transfiere directamente a la potencia de tu tiro.',
    scene: [{ t: 'pared', x: 208 }],
    poseA: P([100, 46], [102, 60], [102, 98], [[114, 32], [92, 12]], [[108, 36], [86, 16]], [[112, 122], [116, 150], [128, 152]], [[92, 122], [86, 150], [74, 152]], 9),
    poseB: P([104, 40], [104, 54], [108, 96], [[126, 60], [152, 74]], [[122, 64], [148, 78]], [[116, 120], [120, 150], [132, 152]], [[96, 120], [90, 150], [78, 152]], 9)
  },

  /* ============ PREVENCIÓN ============ */
  nordicCurl: {
    id: 'nordicCurl', nombre: 'Curl nórdico', lugar: 'Gimnasio', material: 'Colchoneta + alguien que sujete los tobillos',
    musculos: 'Isquiotibiales (excéntrico)', registro: 'reps', tempo: 1700,
    pasos: [
      'De rodillas sobre una colchoneta, con los tobillos bien sujetos (un compañero o una espaldera).',
      'Cuerpo recto desde las rodillas hasta la cabeza, glúteo apretado. Brazos cruzados en el pecho.',
      'Déjate caer hacia delante LO MÁS DESPACIO QUE PUEDAS, frenando con la parte de atrás del muslo.',
      'Cuando ya no aguantes, para la caída con las manos y vuelve arriba empujando con los brazos.'
    ],
    errores: [
      'Doblar la cadera (sacar el culo) al caer: el cuerpo va recto como una tabla.',
      'Dejarte caer de golpe: si no frenas, no entrenas nada.',
      'Hacer muchas repeticiones: es un ejercicio muy exigente, con pocas basta.'
    ],
    progresion: 'Es EL ejercicio contra las roturas de isquios. Al principio agujetas seguras, así que empieza con 3 series de 4 y ve subiendo poco a poco.',
    scene: [{ t: 'colchoneta', x: 20, w: 180 }, { t: 'anclaje', x: 120, y: 140, w: 40 }],
    poseA: P([96, 54], [96, 68], [96, 106], [[112, 84], [96, 86]], [[80, 84], [94, 88]], [[96, 144], [126, 148], [138, 148]], [[92, 146], [122, 150], [134, 150]], 9),
    poseB: P([44, 96], [58, 100], [92, 116], [[48, 118], [30, 132]], [[52, 120], [34, 136]], [[96, 144], [126, 148], [138, 148]], [[92, 146], [122, 150], [134, 150]], 9)
  },

  facePull: {
    id: 'facePull', nombre: 'Face pull', lugar: 'Gimnasio', material: 'Polea alta con cuerda (o goma)',
    musculos: 'Deltoides posterior y espalda alta', registro: 'peso', gear: 'goma-alta', tempo: 1200,
    pasos: [
      'Coloca la polea por encima de la cabeza y agarra la cuerda con las palmas mirándose.',
      'Da un paso atrás hasta notar tensión, con el pecho alto y el abdomen apretado.',
      'Tira llevando las manos hacia la cara y separándolas, con los codos altos, a la altura de los hombros.',
      'Aprieta un segundo atrás y vuelve despacio a la posición de estirado.'
    ],
    errores: [
      'Bajar los codos y convertirlo en un remo.',
      'Echar el cuerpo hacia atrás para poder con el peso.',
      'Ir con demasiado peso: es un ejercicio de salud del hombro, no de fuerza bruta.'
    ],
    progresion: 'Para un lanzador de balonmano esto es oro: compensa todo el trabajo de empuje y protege el hombro. No te lo saltes nunca.',
    scene: [{ t: 'cable', ax: 204, ay: 30, hx: 204, hy: 30 }],
    poseA: P([94, 36], [94, 50], [94, 94], [[128, 48], [158, 40]], [[126, 56], [156, 48]], [[108, 120], [110, 148], [122, 152]], [[88, 120], [86, 148], [74, 152]], 9),
    poseB: P([94, 36], [94, 50], [94, 94], [[136, 62], [106, 34]], [[134, 68], [104, 42]], [[108, 120], [110, 148], [122, 152]], [[88, 120], [86, 148], [74, 152]], 9)
  },

  rotacionExterna: {
    id: 'rotacionExterna', nombre: 'Rotación externa de hombro', lugar: 'Gimnasio o casa', material: 'Goma elástica',
    musculos: 'Manguito rotador (hombro del brazo de lanzar)', registro: 'reps', gear: 'goma-izq', tempo: 1200,
    pasos: [
      'Sujeta la goma a la altura del codo, con el anclaje al lado contrario del brazo que trabajas.',
      'Codo pegado al costado y doblado a 90°. Puedes ponerte una toalla enrollada debajo del codo.',
      'Sin despegar el codo, gira el antebrazo hacia fuera todo lo que puedas.',
      'Vuelve MUY despacio, en 3 segundos, controlando la goma.'
    ],
    errores: [
      'Despegar el codo del costado (entonces trabaja el hombro grande y no el manguito).',
      'Girar el cuerpo en vez del brazo.',
      'Usar una goma demasiado dura: aquí se va con poquísima tensión.'
    ],
    progresion: 'Trabajo invisible pero fundamental: el hombro del brazo de lanzar es la lesión número uno del balonmano. Hazlo con los dos brazos, empezando por el de lanzar.',
    scene: [{ t: 'cable', ax: 16, ay: 78, hx: 16, hy: 78 }],
    poseA: P([106, 34], [106, 48], [106, 92], [[122, 72], [102, 80]], [[92, 70], [90, 92]], [[110, 120], [110, 148], [98, 152]], [[102, 120], [102, 148], [90, 152]], 9),
    poseB: P([106, 34], [106, 48], [106, 92], [[122, 72], [148, 64]], [[92, 70], [90, 92]], [[110, 120], [110, 148], [98, 152]], [[102, 120], [102, 148], [90, 152]], 9)
  },

  /* ============ CORE ============ */
  planchaLateral: {
    id: 'planchaLateral', nombre: 'Plancha lateral con elevación', lugar: 'Gimnasio o casa', material: 'Colchoneta',
    musculos: 'Core lateral (oblicuos) y glúteo medio', registro: 'tiempo', objetivoSeg: 30, tempo: 1400,
    pasos: [
      'Túmbate de lado apoyando el antebrazo, con el codo justo debajo del hombro.',
      'Los pies uno delante del otro o uno encima del otro, y el brazo libre hacia el techo.',
      'Sube la cadera hasta que el cuerpo quede en línea recta desde la cabeza hasta los pies.',
      'Aguanta arriba respirando. Si te cuesta, baja y sube la cadera despacio en vez de mantener.'
    ],
    errores: [
      'Dejar caer la cadera hacia el suelo poco a poco sin darte cuenta.',
      'Girar el cuerpo hacia delante o hacia atrás: los dos hombros en la misma línea vertical.',
      'Apoyar el codo por delante del hombro.'
    ],
    progresion: 'El core lateral es el que aguanta los choques y los cambios de dirección. Haz los dos lados igual, empezando siempre por el más débil.',
    scene: [{ t: 'colchoneta', x: 20, w: 180 }],
    poseA: P([50, 108], [64, 112], [124, 132], [[70, 138], [46, 146]], [[74, 96], [78, 72]], [[158, 140], [192, 148], [200, 142]], [[156, 142], [190, 150], [198, 144]], 8),
    poseB: P([50, 100], [64, 104], [124, 116], [[70, 132], [46, 146]], [[76, 86], [82, 62]], [[158, 128], [192, 146], [200, 140]], [[156, 130], [190, 148], [198, 142]], 8)
  },

  deadBug: {
    id: 'deadBug', nombre: 'Bicho muerto', lugar: 'Gimnasio o casa', material: 'Colchoneta',
    musculos: 'Core profundo (antiextensión)', registro: 'reps', tempo: 1300,
    pasos: [
      'Boca arriba, brazos estirados hacia el techo y rodillas dobladas a 90°, como una mesa.',
      'Pega la zona lumbar al suelo y mantenla pegada TODO el ejercicio: eso es lo que se entrena.',
      'Estira a la vez el brazo de un lado y la pierna del otro, sin tocar el suelo.',
      'Vuelve al centro despacio y cambia de lado. Suelta el aire al estirar.'
    ],
    errores: [
      'Que se despegue la espalda baja del suelo (si pasa, no estires tanto la pierna).',
      'Ir rápido: cada repetición debe durar 3 o 4 segundos.',
      'Aguantar la respiración.'
    ],
    progresion: 'Si dominas los dos lados sin que se mueva la espalda, baja la pierna un poco más cerca del suelo.',
    scene: [{ t: 'colchoneta', x: 20, w: 180 }],
    poseA: P([46, 132], [62, 134], [122, 138], [[74, 118], [78, 96]], [[70, 120], [74, 98]], [[150, 112], [176, 116], [186, 108]], [[148, 118], [174, 122], [184, 114]], 8),
    poseB: P([46, 132], [62, 134], [122, 138], [[56, 116], [34, 108]], [[70, 120], [74, 98]], [[150, 112], [176, 116], [186, 108]], [[156, 126], [192, 136], [202, 130]], 8)
  },

  /* ============ CARRERA (fichas técnicas) ============ */
  sprintLineal: {
    id: 'sprintLineal', nombre: 'Sprint lineal', lugar: 'Pista o campo', material: 'Nada',
    musculos: 'Velocidad', registro: 'ninguno', tempo: 500,
    pasos: [
      'Salida: primer paso corto y potente, con el cuerpo inclinado hacia delante unos 3 o 4 metros.',
      'Ve levantando el cuerpo poco a poco hasta correr erguido, sin dar un tirón de golpe.',
      'Brazos sueltos: de la cadera a la barbilla, sin cruzarlos por delante del pecho.',
      'Pisa con la parte de delante del pie, justo debajo de la cadera, y empuja el suelo hacia atrás.'
    ],
    errores: [
      'Levantar el cuerpo de golpe en el primer paso.',
      'Correr con los hombros y la cara en tensión: ir "suelto" es ir más rápido.',
      'Pisar por delante del cuerpo, frenándote a ti mismo.'
    ],
    progresion: 'Todos los sprints se hacen al 100 %. Si notas que vas más lento, descansa más: la velocidad se entrena fresco.',
    scene: [],
    poseA: P([102, 30], [100, 46], [104, 88], [[122, 62], [128, 40]], [[80, 66], [66, 84]], [[132, 104], [140, 128], [152, 126]], [[80, 116], [64, 138], [52, 144]], 9),
    poseB: P([102, 30], [100, 46], [104, 88], [[86, 64], [72, 82]], [[124, 60], [132, 38]], [[86, 112], [70, 134], [58, 140]], [[130, 106], [142, 130], [154, 128]], 9)
  },

  cambioDireccion: {
    id: 'cambioDireccion', nombre: 'Cambio de dirección', lugar: 'Pista o campo', material: 'Conos',
    musculos: 'Frenada, potencia lateral y rodilla', registro: 'ninguno', tempo: 900,
    pasos: [
      'Llega al cono corriendo fuerte, pero da los dos últimos pasos más cortos para poder frenar.',
      'Baja el centro de gravedad: flexiona rodilla y cadera y mete el pie de fuera POR DELANTE del cuerpo.',
      'La rodilla debe apuntar hacia donde mira el pie, nunca hacia dentro.',
      'Empuja con fuerza con ese pie y sal en la nueva dirección mirando ya hacia donde vas.'
    ],
    errores: [
      'Frenar con la pierna estirada: es la forma más rápida de romperse el cruzado.',
      'Meter la rodilla hacia dentro al apoyar.',
      'Girar antes de haber frenado (te vas de lado y pierdes el apoyo).'
    ],
    progresion: 'En balonmano ganas metros frenando bien, no corriendo más. Trabájalo siempre fresco y al máximo, nunca cansado.',
    scene: [],
    poseA: P([92, 40], [94, 54], [98, 94], [[76, 76], [62, 90]], [[112, 72], [124, 60]], [[132, 116], [154, 146], [166, 148]], [[86, 122], [78, 148], [66, 150]], 9),
    poseB: P([76, 46], [80, 60], [92, 98], [[62, 82], [48, 96]], [[98, 76], [110, 62]], [[124, 122], [150, 148], [162, 150]], [[80, 126], [72, 150], [60, 152]], 9)
  }
};

/* =========================================================================
   PROGRAMA DE 15 DÍAS · PRETEMPORADA ESPECÍFICA DE BALONMANO
   Cadete 2º año · continuación de las 5 semanas de base ya entrenadas.

   Lógica del programa:
   - 3 sesiones de fuerza + 3 de acondicionamiento por semana, con 1 día de
     descanso total. La fuerza va de más volumen a más intensidad.
   - Cada sesión de fuerza lleva salud de hombro (el hombro del brazo de
     lanzar es la lesión nº 1 del balonmano) y trabajo excéntrico de isquios.
   - El acondicionamiento es intermitente, como el juego: nada de rodajes
     largos y continuos salvo el primer día.
   - Los 2 últimos días son puesta a punto: casi sin volumen y a máxima
     velocidad, para llegar fresco al primer entrenamiento con el equipo.

   Quedan definidas más sesiones de las que usa el calendario (fA3, fB3, fC3,
   fD, cLargo, cRsa2, c1515, c1515i, descansoActivo). Son la continuación
   natural si algún día se alarga el plan: basta con añadirlas al CALENDARIO.
   ========================================================================= */

const BLOQUES = [
  {
    n: 1, nombre: 'Reactivación específica', dias: [1, 7], color: 'verde',
    objetivo: 'Recuperar el gesto con barra y aprender los ejercicios nuevos (nórdico, balón medicinal, saltos) con volumen medio y cargas cómodas. La semana para hacerlo todo bien, no para ir al límite.'
  },
  {
    n: 2, nombre: 'Fuerza y potencia', dias: [8, 13], color: 'azul',
    objetivo: 'Subes cargas y bajas repeticiones. Entran los sprints repetidos y el día de fuerza C llega después de descansar, para lanzar y saltar al máximo.'
  },
  {
    n: 3, nombre: 'Puesta a punto', dias: [14, 15], color: 'naranja',
    objetivo: 'Casi nada de volumen y todo a máxima velocidad. Objetivo: llegar descansado y explosivo al primer entrenamiento con el equipo.'
  }
];

/* Atajo para escribir los ejercicios de una sesión */
const E = (ej, series, reps, descanso, nota) => ({ ej, series, reps, descanso, nota });

const CAL_FUERZA = [
  '5 minutos de bici o cuerda, hasta empezar a sudar.',
  'Movilidad: 10 balanceos de pierna por lado + 10 sentadillas profundas sin peso.',
  'Activación de glúteo: 15 pasos laterales con goma por encima de las rodillas.',
  'Hombro: 15 rotaciones externas con goma suave. Esto nunca se salta.',
  '2 series de aproximación del primer ejercicio, con poco peso.'
];

const CAL_PISTA = [
  '5 minutos de carrera suave.',
  '20 metros de cada: talones al glúteo, rodillas al pecho, zancadas y desplazamientos laterales.',
  '4 progresiones de 30 metros subiendo la velocidad poco a poco.',
  '2 salidas cortas al 90 % antes de empezar de verdad.'
];

const SESIONES = {

  /* ================= BLOQUE 1 ================= */
  fA1: {
    tipo: 'fuerza', nombre: 'Fuerza A', foco: 'Tren inferior y empuje',
    calentamiento: CAL_FUERZA,
    nota: 'Deja siempre 2 repeticiones en la recámara. Si la última se te frena mucho, ese peso ya es suficiente por hoy.',
    ejercicios: [
      E('sentadillaBarra', 4, '8', 150, 'Peso cómodo: hoy manda la técnica.'),
      E('saltoCMJ', 4, '4', 90, 'Justo después de la sentadilla, descansando 30 segundos. Saltarás más de lo normal.'),
      E('pressBanca', 4, '8', 120),
      E('remoMancuerna', 4, '10 por brazo', 90),
      E('sentadillaBulgara', 3, '8 por pierna', 90),
      E('rotacionExterna', 3, '12 por brazo', 45, 'Empieza por el brazo de lanzar.'),
      E('pressPallof', 3, '10 por lado', 45)
    ]
  },
  fB1: {
    tipo: 'fuerza', nombre: 'Fuerza B', foco: 'Cadena posterior y tracción',
    calentamiento: CAL_FUERZA,
    nota: 'Hoy entra el curl nórdico. Vas a tener agujetas en los isquios 2 días: es normal la primera semana.',
    ejercicios: [
      E('pesoMuertoBarra', 4, '8', 150),
      E('saltoLateral', 4, '4 por lado', 90, 'Aterriza y quédate quieto un segundo en cada salto.'),
      E('dominadas', 4, 'las que salgan menos 1', 120, 'Si no salen, con goma o bajando frenado 4 segundos.'),
      E('pressMilitar', 4, '8 por brazo', 90),
      E('nordicCurl', 3, '4', 120, 'Baja lo más despacio que puedas. Poco volumen, mucha calidad.'),
      E('facePull', 3, '15', 45),
      E('planchaLateral', 3, '30 s por lado', 45)
    ]
  },
  fC1: {
    tipo: 'fuerza', nombre: 'Fuerza C', foco: 'Potencia y lanzamiento',
    calentamiento: CAL_FUERZA,
    nota: 'Sesión de velocidad, no de sufrir. Cada lanzamiento y cada salto, al máximo, y descansa entre repeticiones.',
    ejercicios: [
      E('lanzamientoRotacional', 4, '5 por lado', 60, 'Apunta en los kilos el peso del balón.'),
      E('lanzamientoCabeza', 4, '5', 60),
      E('hipThrust', 4, '8', 120),
      E('saltoCajon', 4, '4', 90, 'Baja del cajón andando, nunca saltando.'),
      E('subidaCajon', 3, '8 por pierna', 90),
      E('paseoGranjero', 3, '20 metros', 90),
      E('deadBug', 3, '8 por lado', 45)
    ]
  },

  /* ================= BLOQUE 2 ================= */
  fA2: {
    tipo: 'fuerza', nombre: 'Fuerza A', foco: 'Tren inferior y empuje',
    calentamiento: CAL_FUERZA,
    nota: 'Sube el peso respecto a la semana pasada y baja una repetición. Sigues dejando 2 en la recámara.',
    ejercicios: [
      E('sentadillaBarra', 4, '6', 180, 'Más peso que la semana pasada.'),
      E('saltoCMJ', 4, '4', 90),
      E('pressBanca', 4, '6', 150),
      E('remoMancuerna', 4, '8 por brazo', 90),
      E('sentadillaBulgara', 3, '8 por pierna', 90, 'Con mancuernas.'),
      E('rotacionExterna', 3, '12 por brazo', 45),
      E('pressPallof', 3, '10 por lado', 45)
    ]
  },
  fB2: {
    tipo: 'fuerza', nombre: 'Fuerza B', foco: 'Cadena posterior y tracción',
    calentamiento: CAL_FUERZA,
    nota: 'El peso muerto rumano tiene que notarse en la parte de atrás del muslo, no en la espalda baja.',
    ejercicios: [
      E('pesoMuertoBarra', 4, '6', 180),
      E('saltoLateral', 4, '5 por lado', 90),
      E('dominadas', 4, '6', 120),
      E('pressMilitar', 4, '6 por brazo', 90),
      E('nordicCurl', 3, '5', 120),
      E('facePull', 3, '15', 45),
      E('planchaLateral', 3, '35 s por lado', 45)
    ]
  },
  fC2: {
    tipo: 'fuerza', nombre: 'Fuerza C', foco: 'Potencia y lanzamiento',
    calentamiento: CAL_FUERZA,
    nota: 'Si notas que lanzas o saltas más flojo que al principio de la serie, corta y descansa más.',
    ejercicios: [
      E('lanzamientoRotacional', 5, '5 por lado', 60),
      E('lanzamientoCabeza', 5, '5', 60),
      E('hipThrust', 4, '6', 150),
      E('saltoCajon', 5, '3', 90),
      E('subidaCajon', 3, '8 por pierna', 90),
      E('paseoGranjero', 3, '25 metros', 90),
      E('deadBug', 3, '10 por lado', 45)
    ]
  },

  /* ================= BLOQUE 3 ================= */
  fA3: {
    tipo: 'fuerza', nombre: 'Fuerza A', foco: 'Tren inferior y empuje',
    calentamiento: CAL_FUERZA,
    nota: 'Semana de más intensidad: pocas repeticiones, buen peso y subida rápida. Descansa bien entre series.',
    ejercicios: [
      E('sentadillaBarra', 5, '4', 180, 'El peso más alto del mes, pero subiendo rápido.'),
      E('saltoCMJ', 4, '3', 90),
      E('pressBanca', 4, '5', 150),
      E('remoMancuerna', 4, '8 por brazo', 90),
      E('sentadillaBulgara', 3, '6 por pierna', 90),
      E('rotacionExterna', 3, '12 por brazo', 45),
      E('pressPallof', 3, '8 por lado', 45)
    ]
  },
  fB3: {
    tipo: 'fuerza', nombre: 'Fuerza B', foco: 'Cadena posterior y tracción',
    calentamiento: CAL_FUERZA,
    nota: 'Última semana fuerte. Si algo molesta (hombro, rodilla, isquios), baja el peso y avisa: no se entrena con dolor.',
    ejercicios: [
      E('pesoMuertoBarra', 4, '5', 180),
      E('saltoLateral', 4, '5 por lado', 90),
      E('dominadas', 4, '5', 150, 'Si te salen fáciles, ponte lastre.'),
      E('pressMilitar', 4, '6 por brazo', 90),
      E('nordicCurl', 3, '6', 120),
      E('facePull', 3, '15', 45),
      E('planchaLateral', 3, '40 s por lado', 45)
    ]
  },
  fC3: {
    tipo: 'fuerza', nombre: 'Fuerza C', foco: 'Potencia y lanzamiento',
    calentamiento: CAL_FUERZA,
    nota: 'La sesión más parecida a jugar: lanzar fuerte, saltar alto y frenar bien.',
    ejercicios: [
      E('lanzamientoRotacional', 5, '4 por lado', 75, 'Todos al máximo.'),
      E('lanzamientoCabeza', 5, '4', 75),
      E('hipThrust', 4, '6', 150),
      E('saltoCajon', 5, '3', 90),
      E('zancadaLateral', 3, '8 por lado', 90),
      E('paseoGranjero', 3, '25 metros', 90),
      E('deadBug', 3, '10 por lado', 45)
    ]
  },

  /* ================= BLOQUE 4 · descarga ================= */
  fD: {
    tipo: 'fuerza', nombre: 'Fuerza D', foco: 'Descarga · mantener sin cansar',
    calentamiento: CAL_FUERZA,
    nota: 'Media sesión. Coge el peso de la semana pasada pero haz la mitad de series y muévelo RÁPIDO. Debes salir del gimnasio con ganas de más.',
    ejercicios: [
      E('sentadillaBarra', 2, '5', 150, 'Rápido en la subida.'),
      E('saltoCMJ', 3, '3', 90),
      E('pressBanca', 2, '6', 120),
      E('remoMancuerna', 2, '8 por brazo', 90),
      E('rotacionExterna', 2, '12 por brazo', 45),
      E('pressPallof', 2, '8 por lado', 45)
    ]
  },

  /* ================= ACONDICIONAMIENTO ================= */
  cFartlek: {
    tipo: 'resistencia', nombre: 'Fartlek de reactivación', foco: '24 minutos con cambios de ritmo',
    calentamiento: CAL_PISTA,
    objetivo: 'Volver a coger ritmo después de la base. Es el día más suave del bloque.',
    protocolo: {
      vueltas: 4, series: 1, descansoSerie: 0,
      bloque: [
        { nombre: 'Suave (60 %)', seg: 240, tipo: 'baja' },
        { nombre: 'Fuerte (85 %)', seg: 120, tipo: 'alta' }
      ]
    },
    claves: ['En el tramo fuerte tienes que poder decir 3 o 4 palabras y no más.', 'En el suave no pares nunca a andar.']
  },

  cCod: {
    tipo: 'resistencia', nombre: 'Cambios de dirección', foco: 'Frenar y salir · 2 series de 6',
    calentamiento: CAL_PISTA,
    objetivo: 'Aprender a frenar bien. En balonmano se ganan metros frenando, no corriendo más.',
    fichas: ['cambioDireccion'],
    montaje: 'Pon 3 conos en línea separados 5 metros. Sales del cono del medio, corres 5 m a la derecha, tocas, 10 m a la izquierda, tocas, y vuelves 5 m al centro.',
    protocolo: {
      vueltas: 6, series: 2, descansoSerie: 180,
      bloque: [
        { nombre: 'Circuito al máximo', seg: 12, tipo: 'alta' },
        { nombre: 'Descanso', seg: 48, tipo: 'baja' }
      ]
    },
    claves: ['Cada repetición al 100 %: esto no es para cansarse, es para hacerlo rápido y bien.', 'La rodilla siempre mirando hacia donde apunta el pie.']
  },

  c4x4: {
    tipo: 'resistencia', nombre: 'Intervalos largos 4×4', foco: 'Motor aeróbico',
    calentamiento: CAL_PISTA,
    objetivo: 'Subir el techo aeróbico, que es lo que te permite repetir esfuerzos en el segundo tiempo.',
    protocolo: {
      vueltas: 4, series: 1, descansoSerie: 0,
      bloque: [
        { nombre: 'Fuerte (85-90 %)', seg: 240, tipo: 'alta' },
        { nombre: 'Suave (60 %)', seg: 180, tipo: 'baja' }
      ]
    },
    claves: ['Los 4 minutos, al mismo ritmo: si el primero te sale muy rápido, el cuarto será un desastre.']
  },

  c3030: {
    tipo: 'resistencia', nombre: 'Intermitente 30/30', foco: '2 bloques de 10 repeticiones',
    calentamiento: CAL_PISTA,
    objetivo: 'El formato que más se parece al juego: esfuerzo, pausa, esfuerzo.',
    protocolo: {
      vueltas: 10, series: 2, descansoSerie: 180,
      bloque: [
        { nombre: 'Fuerte (90 %)', seg: 30, tipo: 'alta' },
        { nombre: 'Suave', seg: 30, tipo: 'baja' }
      ]
    },
    claves: ['En los 30 segundos suaves se trota, no se anda.', 'Si en la repetición 8 ya no aguantas el ritmo, corta el bloque ahí.']
  },

  cRsa1: {
    tipo: 'resistencia', nombre: 'Sprints repetidos', foco: '2 series de 6 × 30 metros',
    calentamiento: CAL_PISTA,
    objetivo: 'Aguantar corriendo rápido muchas veces seguidas. Es la cualidad que más se nota en un partido.',
    fichas: ['sprintLineal'],
    montaje: 'Marca 30 metros con dos conos. Cada repetición: sprint al 100 % y vuelta andando al inicio.',
    protocolo: {
      vueltas: 6, series: 2, descansoSerie: 180,
      bloque: [
        { nombre: 'SPRINT 30 m', seg: 6, tipo: 'alta' },
        { nombre: 'Vuelta andando', seg: 24, tipo: 'baja' }
      ]
    },
    claves: ['Todos los sprints al máximo, también el último.', 'Si pierdes mucha velocidad al final, descansa 5 segundos más entre repeticiones.']
  },

  c1515: {
    tipo: 'resistencia', nombre: 'Intermitente 15/15', foco: '3 bloques de 8 repeticiones',
    calentamiento: CAL_PISTA,
    objetivo: 'Trabajo muy intenso pero corto: entrena el motor sin dejarte destrozado al día siguiente.',
    protocolo: {
      vueltas: 8, series: 3, descansoSerie: 120,
      bloque: [
        { nombre: 'Muy fuerte (95 %)', seg: 15, tipo: 'alta' },
        { nombre: 'Andando', seg: 15, tipo: 'baja' }
      ]
    },
    claves: ['Busca una distancia fija (unos 70-80 m en 15 segundos) e intenta repetirla siempre.']
  },

  cLargo: {
    tipo: 'resistencia', nombre: 'Intermitente largo', foco: '5 × 5 minutos',
    calentamiento: CAL_PISTA,
    objetivo: 'La sesión de fondo del bloque duro. Ritmo alto pero sostenible.',
    protocolo: {
      vueltas: 5, series: 1, descansoSerie: 0,
      bloque: [
        { nombre: 'Fuerte (80-85 %)', seg: 300, tipo: 'alta' },
        { nombre: 'Suave', seg: 60, tipo: 'baja' }
      ]
    },
    claves: ['Es la sesión más larga del plan: sal con el ritmo justo para poder acabar los 5 bloques igual.']
  },

  cRsa2: {
    tipo: 'resistencia', nombre: 'Sprints repetidos (duro)', foco: '3 series de 6 × 30 metros',
    calentamiento: CAL_PISTA,
    objetivo: 'La sesión más exigente del plan. Menos descanso entre sprints que la semana pasada.',
    fichas: ['sprintLineal', 'cambioDireccion'],
    montaje: 'Igual que la otra vez, 30 metros, pero ahora vuelves al trote y sales antes.',
    protocolo: {
      vueltas: 6, series: 3, descansoSerie: 180,
      bloque: [
        { nombre: 'SPRINT 30 m', seg: 6, tipo: 'alta' },
        { nombre: 'Vuelta al trote', seg: 19, tipo: 'baja' }
      ]
    },
    claves: ['Si en la tercera serie ya no puedes correr rápido, déjala: se entrena la velocidad, no el sufrimiento.']
  },

  c1515i: {
    tipo: 'resistencia', nombre: 'Intermitente 15/15 intensivo', foco: '3 bloques de 10 repeticiones',
    calentamiento: CAL_PISTA,
    objetivo: 'Último trabajo duro antes de la puesta a punto.',
    protocolo: {
      vueltas: 10, series: 3, descansoSerie: 120,
      bloque: [
        { nombre: 'Al 95 %', seg: 15, tipo: 'alta' },
        { nombre: 'Andando', seg: 15, tipo: 'baja' }
      ]
    },
    claves: ['Intenta llegar siempre a la misma marca en los 15 segundos, también en el último bloque.']
  },

  cVelocidad: {
    tipo: 'resistencia', nombre: 'Velocidad pura', foco: '8 salidas de 20 metros',
    calentamiento: CAL_PISTA,
    objetivo: 'Despertar el sistema nervioso para llegar rápido al primer día. Poquísimo volumen, todo al máximo.',
    fichas: ['sprintLineal'],
    montaje: '20 metros marcados. Sales cuando el aviso diga SPRINT y vuelves andando tranquilamente.',
    protocolo: {
      vueltas: 8, series: 1, descansoSerie: 0,
      bloque: [
        { nombre: 'SPRINT 20 m', seg: 4, tipo: 'alta' },
        { nombre: 'Vuelta andando', seg: 56, tipo: 'baja' }
      ]
    },
    claves: ['Descanso completo entre salidas: es lo que permite correr al 100 %.', 'Si notas cualquier tirón, para el día.']
  },

  /* ================= DESCANSOS ================= */
  descanso: {
    tipo: 'descanso', nombre: 'Descanso total', foco: 'Hoy toca recuperar',
    consejos: [
      'El músculo no crece entrenando, crece descansando. Este día es parte del plan.',
      'Duerme 9 horas si puedes: a tu edad es lo que más rinde de todo lo que hagas.',
      'Come bien, sobre todo proteína (huevos, carne, pescado, lácteos) y bebe agua.',
      'Si te apetece moverte: pasear, bici muy suave o piscina. Nada de partidos "por jugar un rato".'
    ]
  },

  descansoActivo: {
    tipo: 'descanso', nombre: 'Descanso activo', foco: 'Movimiento suave, nada de intensidad',
    consejos: [
      '20 minutos de carrera muy suave o bici, sólo para mover las piernas.',
      '10 minutos de movilidad: cadera, tobillos, columna y hombros.',
      'Si tienes rodillo o pelota, pasa un poco por gemelos, cuádriceps e isquios.',
      'Debes terminar mejor de lo que has empezado. Si acabas cansado, te has pasado.'
    ]
  },

  movilidad: {
    tipo: 'descanso', nombre: 'Movilidad y a dormir', foco: 'Último día antes de empezar con el equipo',
    consejos: [
      '15 minutos de movilidad tranquila y algún estiramiento suave.',
      '4 sprints muy cortos al 80 % sólo para no llegar dormido, y nada más.',
      'Prepara hoy la mochila, las botas y la comida de mañana.',
      'A dormir pronto: mañana empieza lo bueno.'
    ]
  }
};

/* -------------------------------------------------------------------------
   CALENDARIO · 25 días seguidos
   El día 1 es la fecha de inicio guardada en los ajustes de la app.
------------------------------------------------------------------------- */
const CALENDARIO = [
  /* --- Bloque 1: reactivación específica --- */
  { d: 1, s: 'cFartlek' },
  { d: 2, s: 'fA1' },
  { d: 3, s: 'cCod' },
  { d: 4, s: 'fB1' },
  { d: 5, s: 'c4x4' },
  { d: 6, s: 'fC1' },
  { d: 7, s: 'descanso' },

  /* --- Bloque 2: fuerza y potencia --- */
  { d: 8, s: 'c3030' },
  { d: 9, s: 'fA2' },
  { d: 10, s: 'cRsa1' },
  { d: 11, s: 'fB2' },
  { d: 12, s: 'descanso' },
  { d: 13, s: 'fC2' },

  /* --- Bloque 3: puesta a punto --- */
  { d: 14, s: 'cVelocidad' },
  { d: 15, s: 'movilidad' }
];

const INICIO_PLAN = '2026-08-16';

function bloqueDeDia(d) {
  return BLOQUES.find(b => d >= b.dias[0] && d <= b.dias[1]) || BLOQUES[0];
}
