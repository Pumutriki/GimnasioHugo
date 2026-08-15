# Gimnasio de Hugo

App para el móvil con el plan de pretemporada de cadetes (el PDF del entrenador),
con ficha y dibujo de cada ejercicio, temporizadores y registro de los pesos que hace cada día.

## Qué lleva dentro

- **Fuerza**: Bloque 1, Bloque 2 y Bloque 3 (cargas externas, 2º año) + rutina de autocargas
  (peso corporal, para hacer en casa o de vacaciones).
- **22 ejercicios** con dibujo animado del movimiento, si es de gimnasio o sin material,
  cómo se hace paso a paso, errores que evitar y un consejo de progresión.
- **Registro de pesos**: cada serie con sus kilos y repeticiones. Al abrir un ejercicio
  aparece de fondo lo que hizo la última vez, para saber por dónde iba.
- **Descanso entre series**: temporizador automático con pitido y vibración.
- **Resistencia**: las tres fases del plan (semanas 1-2, 3-4 y 5-6) con temporizador de
  intervalos a pantalla completa, avisos en cada cambio de ritmo y pantalla que no se apaga.
- **Progreso**: mejor marca por ejercicio, evolución del peso e historial de entrenamientos.
- Funciona **sin internet** y los datos se guardan en el propio móvil.

## Cómo ponerla en el móvil de Hugo

La forma más cómoda es publicarla en GitHub Pages y pasarle el enlace:

1. En GitHub Desktop: **File → New repository**, nombre `gimnasio-hugo`, y elige como
   carpeta local `C:\APPs CLAUDE\GimnasioHugo`.
2. Haz el primer **Commit** y luego **Publish repository**. Puedes dejarlo privado de
   momento, pero para que funcione GitHub Pages tiene que ser **público**.
3. En github.com, dentro del repositorio: **Settings → Pages → Source: Deploy from a branch
   → Branch: main / (root) → Save**.
4. A los dos minutos tendrás la dirección `https://pumutriki.github.io/gimnasio-hugo/`.
5. Hugo la abre en **Chrome** en su móvil, toca los tres puntitos de arriba a la derecha y
   elige **"Añadir a la pantalla de inicio"** (o "Instalar aplicación").
   Le queda como una app más, con su icono, y ya funciona sin datos.

> Importante: que la abra siempre desde el icono instalado, no desde una pestaña nueva
> cada vez, para que no le parezca que ha perdido los pesos apuntados.

### Probarla en el ordenador

```bash
cd "C:\APPs CLAUDE\GimnasioHugo" && python -m http.server 8760
```

Y abrir `http://localhost:8760` en el navegador.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Estructura de la app |
| `styles.css` | Estilos |
| `data.js` | El plan del entrenador: ejercicios, rutinas, fases de resistencia |
| `figures.js` | Motor que dibuja y anima los muñecos de los ejercicios (SVG) |
| `app.js` | Lógica: registro de pesos, temporizadores, progreso, ajustes |
| `sw.js`, `manifest.json`, `icon-*.png` | Lo que hace que sea instalable y funcione sin internet |

## Copia de seguridad

Los entrenamientos se guardan **solo en el móvil**. En *Ajustes* hay botones para
**exportar** un fichero `.json` con todo y para **importarlo** en otro móvil.
Conviene exportar de vez en cuando.
