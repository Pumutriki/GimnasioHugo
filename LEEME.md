# Gimnasio de Hugo

App para el móvil con el programa de pretemporada de Hugo (cadete 2º año, balonmano):
15 días seguidos de fuerza y acondicionamiento, con ficha y dibujo de cada ejercicio,
cronómetros y registro de los pesos que hace cada día.

## El programa

15 días del **16 al 30 de agosto de 2026**, como continuación de las 5 semanas de base
que Hugo ya tenía hechas:

| Bloque | Días | Qué se busca |
|---|---|---|
| 1 · Reactivación específica | 1-7 | Recuperar el gesto con barra y aprender los ejercicios nuevos |
| 2 · Fuerza y potencia | 8-13 | Más carga, menos repeticiones. Entran los sprints repetidos |
| 3 · Puesta a punto | 14-15 | Casi sin volumen y a máxima velocidad, para llegar fresco |

Calendario: **3 sesiones de fuerza + 3 de acondicionamiento por semana**, con descanso
total el día 7 y el día 12. El día 13 (Fuerza C, la de potencia y lanzamientos) va justo
después de un día de descanso, para hacerla con las piernas frescas.

- **Fuerza A** — tren inferior y empuje (sentadilla, salto vertical, press banca, remo, búlgara).
- **Fuerza B** — cadena posterior y tracción (aterrizajes a una pierna, peso muerto rumano,
  saltos laterales, dominadas, press militar, curl nórdico).
- **Fuerza C** — potencia y lanzamiento (salto de lanzamiento a una pierna, balón medicinal
  rotacional y sobre la cabeza, hip thrust, saltos al cajón, multisaltos, paseo del granjero).

### Pliometría

Hay salto en las tres sesiones de fuerza, y está pensada para **extremo y lateral**, que son
los puestos donde puede jugar Hugo: los dos despegan **a una pierna**, con la contraria al
brazo de lanzar.

| Sesión | Salto | Para qué |
|---|---|---|
| A | Salto vertical (CMJ) tras la sentadilla | Potencia bilateral, aprovechando el efecto de la sentadilla |
| B | Aterrizaje a una pierna desde cajón | Prevención de rodilla: caer estable tras el contacto |
| B | Salto lateral de patinador | Frenar y salir de lado, sobre una pierna |
| C | Salto de lanzamiento a una pierna | El gesto de tiro: extremo y lateral |
| C | Salto al cajón | Potencia vertical con aterrizaje suave |
| C | Multisaltos horizontales | El vuelo del extremo hacia la portería |

Volumen controlado: unos **120-135 contactos por semana** repartidos en 3 días. Es
deliberadamente conservador para un chaval de 15-16 años que además hace sprints y
cambios de dirección otros 3 días.
- **Acondicionamiento** — todo intermitente, como el juego: fartlek, 4×4, 30/30,
  sprints repetidos, cambios de dirección y un último día de velocidad pura.

En `data.js` quedan definidas más sesiones de las que usa el calendario (fA3, fB3, fC3,
fD, cLargo, cRsa2, c1515, c1515i). Son la continuación natural del plan: si algún día
hay que alargarlo, basta con añadirlas al `CALENDARIO`.

Dos cosas que están en todas las sesiones de fuerza, y son innegociables en balonmano:
**rotaciones externas de hombro** (el hombro del brazo de lanzar es la lesión número uno)
y **trabajo excéntrico de isquios** (curl nórdico y peso muerto rumano).

## Qué hace la app

- **Hoy**: el día que toca del calendario, con lo que viene después.
- **Plan**: los 15 días completos, se puede abrir cualquiera.
- **Cada ejercicio**: dibujo animado del movimiento, dónde se hace, técnica paso a paso,
  errores a evitar y consejo de progresión.
- **Registro de pesos**: series con kilos y repeticiones. Al abrir un ejercicio aparecen
  en gris los números de la última vez.
- **Cronómetros**: descanso automático entre series (el que marca cada ejercicio) y
  cronómetro de intervalos a pantalla completa para los días de carrera, con avisos
  de sonido y vibración en cada cambio de ritmo.
- **Progreso**: mejor marca por ejercicio, evolución y historial.
- Funciona **sin internet** y los datos se guardan en el propio móvil.

## Si se salta días

En **Ajustes** se puede cambiar la fecha del día 1 y todo el calendario se mueve.

## Cómo está publicada

Repositorio `Pumutriki/GimnasioHugo`, público, con GitHub Pages en `main / (root)`:
**https://pumutriki.github.io/GimnasioHugo/**

Hugo la abre en Chrome y usa "Añadir a la pantalla de inicio". Cada vez que se cambie algo,
basta con **Commit** y **Push** en GitHub Desktop: Pages se actualiza sola en un par de minutos.

### Probarla en el ordenador

```bash
cd "C:\APPs CLAUDE\GimnasioHugo" && python -m http.server 8760
```

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Estructura de la app |
| `styles.css` | Estilos |
| `data.js` | Catálogo de 37 ejercicios + las sesiones + el calendario de 15 días |
| `figures.js` | Motor que dibuja y anima los muñecos (SVG, sin imágenes externas) |
| `app.js` | Lógica: calendario, registro de pesos, cronómetros, progreso |
| `sw.js`, `manifest.json`, `icon-*.png` | Lo que la hace instalable y sin internet |

El plan anterior (el PDF del club, con los 3 bloques genéricos) sigue en el historial de Git
por si algún día hace falta recuperarlo.

## Copia de seguridad

Los entrenamientos se guardan **solo en el móvil**. En *Ajustes* hay botones para
**exportar** un fichero `.json` con todo y para **importarlo** en otro móvil.
