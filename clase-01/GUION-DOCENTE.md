# Libreto docente — Clase 1 de React · El proyecto se muda
### Primera clase del bloque: por qué existe React, Vite y JSX — en TypeScript

**De dónde venimos.** El curso de fundamentos cerró con la clase de TypeScript: el proyecto
tipado, el checkout escrito en TS y cinco tareas con criterio objetivo (`npx tsc --noEmit` en
cero). El anticipo prometió dos cosas para hoy: crear el proyecto de React con la plantilla de
**React + TypeScript**, y **traernos `tipos.ts` y `api.ts` tal como están**. Hoy se cumplen
las dos.

**Por qué esta clase existe.** Desde las últimas clases de JavaScript vengo repitiendo la misma
idea: nosotros escribimos `pintarCatalogo`, `pintarCarrito`, `marcarCategoriaActiva`… y cada vez
que cambia un dato tenemos que **acordarnos** de llamar a las funciones correctas. React hace
eso y nada más que eso: tú cambias el dato y él repinta. Hoy esa idea deja de ser un anticipo y
se vuelve código. No se enseña ningún hook todavía: hoy es **por qué React, Vite y JSX**. Los
componentes con props son de la clase 2; conectar la API a la pantalla es de la clase 6.

**Reglas de hoy** (las de siempre, del MAPA):
- La clase se graba: ante la duda, avanza; el que se pierde rebobina.
- Ninguna instalación lleva promesa de tiempo. Se da el paso, se señala el plan B y se sigue.
- La mayoría mira la demo y la aplica después: código grande, un cambio por vez, nombra cada paso.
- El cierre empieza a las **3:50** pase lo que pase.

**Preparación previa del docente** (antes de la clase):
- [ ] Correr `npm create vite@latest` en tu máquina con la versión actual y anotar qué pregunta
      exactamente (las preguntas del asistente cambian entre versiones). *Última verificación:
      2026-08-08 con create-vite 9.1.2 → Vite 8.2, TypeScript 6.0, React 19.2, plantilla con
      script `lint` (oxlint); el flujo completo del guion (crear → instalar → Tailwind → build)
      probado de punta a punta sin errores.* Si quieres la clase determinista, fija en el
      comando la versión que verificaste: `npm create vite@9.1.2` en vez de `@latest`.
- [ ] Subir al repo la carpeta de emergencia `clase-01-instalado/` (proyecto Vite ya creado, con
      Tailwind configurado y los cuatro módulos migrados) y **probar que corre**
      (`npm install && npm run dev`).
- [ ] Tener listo el `App.tsx` roto del Ejercicio 1 (los cuatro errores) para pegarlo al chat.
- [ ] Publicar el estado final del curso de fundamentos (la clase de TypeScript) y avisar que
      hoy se parte de ahí.
- [ ] Tener abierto tu proyecto de fundamentos para copiar los módulos en el Bloque 6, y
      **verificar cómo exporta tu `formato.ts`** (default o con nombre): el import del Bloque 6
      tiene que coincidir.

## Agenda (4:15)

| # | Bloque | Min | Acum. |
|---|--------|:---:|:-----:|
| 1 | Punto de partida + repaso de la clase de TypeScript | 20 | 0:20 |
| 2 | **Por qué React**: el problema que ya vivimos | 30 | 0:50 |
| 3 | **Vite**: crear el proyecto (⌨️ lo hacen ellos) | 40 | 1:30 |
| 4 | **JSX**: la función que devuelve HTML | 45 | 2:15 |
| — | ☕ Receso (aparte) | 15 | — |
| 5 | **La primera pantalla de TechCart** (+ Tailwind en el build) | 45 | 3:00 |
| 6 | **La mudanza**: migrar `tipos.ts`, `datos.ts`, `api.ts`, `formato.ts` | 50 | 3:50 |
| 7 | Cierre: resumen, 5 tareas, push y anticipo | 25 | **4:15** |

> **Válvulas de recorte** (en este orden, si el reloj se estira): (1) el Ejercicio 2 del Bloque 5
> lo resuelvo yo directamente; (2) del Bloque 6 se migra solo `tipos.ts` en vivo y los otros tres
> módulos quedan guiados en el README como parte de la tarea fácil. **Nunca** se recorta el
> Bloque 2 (es el modelo mental de todo el bloque de React) **ni** el cierre.

---

# ⏱️ 0:00 · BLOQUE 1 — Punto de partida y repaso (20 min)

### 0:00 · Dónde quedamos (8 min)

🖥️ **[DIAPO 1 · «Clase 1 — React»]** — título y agenda del día.

🗣️ *La clase pasada le pusimos tipos a todo el proyecto y escribimos el checkout ya en
TypeScript. Hoy el proyecto se muda a React. Primero vamos a entender qué problema resuelve
React — que es un problema que ustedes ya sufrieron —, después creamos el proyecto con una
herramienta que se llama Vite, y al final nos traemos los módulos que ya escribieron: los tipos
y la capa de datos se migran tal cual. Nada de lo que hicieron se bota.*

🗣️ *Todos parten del estado publicado de la clase de TypeScript. Si tu proyecto quedó distinto,
descarga ese estado y trabaja sobre él; el tuyo guárdalo aparte.*

### 0:08 · Repaso de tareas (12 min)

Revisar en vivo **una** de las difíciles de la clase de TypeScript (la que más preguntas haya
generado — normalmente la de "Mis pedidos"). No se escribe desde cero — no alcanza el tiempo: se
recorre la solución ya hecha explicando cada decisión, y se reescribe en vivo **solo la aduana**
(leer el `localStorage` con `unknown` y comprobar antes de confiar), que es la parte que se muda
a React.

🗣️ *Fíjate en lo que acabamos de hacer: leer un dato externo con `unknown`, comprobar su forma y
recién usarlo. Esa disciplina se viene con nosotros a React.*

---

# ⏱️ 0:20 · BLOQUE 2 — Por qué React (30 min)

### 0:20 · El problema que ya vivimos (12 min)

🖥️ **[DIAPO 2 · «Nuestro main.ts»]** — el diagrama de su propio proyecto: 3 datos
(`productos`, `categoriaActiva`, `termino`) y las funciones `pintar…` que hay que llamar a mano.

🗣️ *Este es el proyecto de ustedes, dibujado. Tres datos, y un grupo de funciones que pintan.
¿Cuál era la regla? Cada vez que cambia un dato, TÚ tienes que acordarte de llamar a las
funciones que repintan lo afectado. Si agregas al carrito y olvidas llamar a `pintarCarrito`,
la página miente: el dato cambió y la pantalla no.*

🗣️ *A pequeña escala se puede vivir así — ustedes lo lograron. Pero cada dato nuevo multiplica
las combinaciones: ¿qué repinto si cambia el término de búsqueda? ¿Y si cambia la categoría Y el
carrito? Ese "acordarse" no escala. Ese es el problema, y lo vivieron: no me lo tienen que creer.*

### 0:32 · Qué es React, en serio (12 min)

🖥️ **[DIAPO 3 · «UI = f(datos)»]** — la fórmula, y debajo: "tú cambias el dato, React repinta".

🗣️ *React es una biblioteca que hace una sola cosa: tú describes cómo se ve la pantalla EN
FUNCIÓN de los datos, y cuando un dato cambia, React vuelve a ejecutar esa descripción y
actualiza lo que haya que actualizar. Se acabó el acordarse. La pantalla ya no puede mentir,
porque siempre se calcula desde los datos.*

🗣️ *Ojo con la palabra: describes. En nuestro `main.ts` damos órdenes: busca este elemento,
bórralo, inserta este HTML. Eso se llama código **imperativo**. En React declaras el resultado:
"la pantalla es esto, dados estos datos", y él se encarga de las órdenes. Eso se llama
**declarativo**. Ya conoces la diferencia sin saberlo: un `for` que acumula es imperativo; un
`reduce` es declarativo. React es esa misma idea, aplicada a pintar.*

🖥️ **[DIAPO 4 · «Qué NO es React»]** — tres líneas: no es un framework de todo, no es un
lenguaje, no reemplaza lo aprendido.

🗣️ *React es una biblioteca, no un framework — un framework es un entorno que decide todo por
ti, como Spring en Java; una biblioteca es una pieza que hace una sola cosa. Y React no
reemplaza nada de lo que sabes: HTML, CSS, TypeScript, fetch, map, filter — todo eso se usa
dentro de React tal cual. De los seis módulos de tu proyecto, cuatro se mudan hoy sin
tocar una línea. Los únicos que mueren son `ui.ts` y `main.ts` — las funciones `pintar…` y los
listeners. Ese trabajo ahora lo hace React.*

### 0:44 · Componente: la palabra del curso (6 min)

🖥️ **[DIAPO 5 · «Componente»]** — una tarjeta de producto señalada dentro de la página completa.

🗣️ *Una palabra nueva y es la palabra de las doce clases de este bloque: componente. Un
componente es un pedazo de interfaz con su propia lógica: la tarjeta de producto, el buscador,
el carrito. En React una página es un árbol de componentes, y cada componente es —
literalmente — una función que devuelve HTML. Hoy escribimos el primero. Cómo se comunican
entre ellos es la clase 2.*

---

# ⏱️ 0:50 · BLOQUE 3 — Vite: crear el proyecto (40 min)

### 0:50 · Qué es Vite y por qué lo necesitamos (8 min)

🖥️ **[DIAPO 6 · «Vite»]** — dos columnas: lo que armamos a mano en fundamentos / lo que Vite trae.

🗣️ *En la clase de TypeScript armamos a mano una línea de producción: `tsc --watch` traducía
TypeScript y Live Server servía la página. Funcionó, y ahora sabes exactamente qué hace cada
pieza. Vite es esa línea de producción, ya armada y mucho más rápida: un servidor de desarrollo
y un traductor, en un solo comando. Y trae plantillas: le dices "React + TypeScript" y te
entrega el proyecto con todo conectado.*

### 0:58 · Crear el proyecto (⌨️ lo hacen ellos) (20 min)

⌨️ En la terminal, parado donde guardas tus proyectos (fuera del viejo). La carpeta la crea el
asistente — no hay `mkdir`:

```bash
npm create vite@latest techcart-react
```

🗣️ *Comando nuevo — léelo por partes. `npm create vite` descarga y ejecuta el **asistente** de
Vite: un programa que hace preguntas y te arma el proyecto. Es primo del `npx` que ya usaste con
`tsc`: ejecutar algo sin instalarlo globalmente. `@latest` pide la versión más reciente del
asistente. Y `techcart-react` es el nombre de la carpeta que va a crear.*

🗣️ *Como el nombre ya va en el comando, te hace dos preguntas. La primera, el framework: elige
**React**. La segunda, la variante — y aquí con cuidado, porque la lista trae opciones que NO
queremos hoy. Elige **"TypeScript" a secas**, la primera. No "TypeScript + React Compiler", no
"RSC", no "React Router v7" — esas instalan otras cosas y te sacan de la clase. Si tu versión
pregunta algo más, acepta lo que propone con Enter.*

⌨️ Después, los tres comandos de siempre:

```bash
cd techcart-react
npm install
npm run dev
```

🗣️ *`npm install` ya sabes qué hace y ya sabes que no se promete cuánto tarda. Cuando termine,
`npm run dev` te da una dirección local — ábrela. Vas a ver la página de bienvenida de la
plantilla (los logos, una imagen y un botón contador — el detalle cambia con cada versión). Si
la ves, tu proyecto de React existe.*

⏸️ **[ESPERO]** — avanzar cuando la mayoría tenga la plantilla abierta. El que se trabó:
carpeta `clase-01-instalado/` del repo, `npm install`, `npm run dev`, y lo suyo se mira en el
receso.

### 1:18 · Tour por la carpeta (12 min)

Abrir los archivos en este orden, en vivo, sin diapos. En cada uno, una sola idea:

- **`package.json`** — 🗣️ *Lo conoces de la clase de TypeScript. Primero, las **versiones**,
  porque con estas vamos a trabajar todo el bloque de React: `react` **19**, `vite` **8**,
  `typescript` **6**. El símbolo de adelante le dice a npm cuánto puede actualizar solo: `^`
  acepta mejoras menores, `~` solo correcciones. Si creas este proyecto dentro de un año, los
  números serán otros — los conceptos que aprendas hoy, no. Segundo, los scripts: `dev`,
  `build`, `preview`… y uno nuevo, `lint`. Ese es un revisor de estilo de código (se llama
  oxlint, y el archivo `.oxlintrc.json` es su configuración); hoy lo dejamos quieto. Y mira
  `build`: dice `tsc -b && vite build`. Ahí está `tsc`: quedó como revisor de tipos; el que
  traduce y empaqueta es Vite.*
- **`index.html`** — 🗣️ *Sabes leer esto: un `div` con id `root` y un `script type="module"`.
  Toda la aplicación va a vivir dentro de ese div.*
- **`src/main.tsx`** — 🗣️ *El punto de entrada: toma el `div#root` y le dice a React "pinta
  `<App />` aquí adentro". El envoltorio `StrictMode` activa avisos extra en desarrollo; te va a
  importar de verdad en la clase de `useEffect`.*
- **`src/App.tsx`** — 🗣️ *El primer componente: una función que devuelve HTML. En este archivo
  vamos a trabajar toda la clase.*

⌨️ Demostrar el **refresco en caliente**: con `npm run dev` corriendo, cambiar un texto de
`App.tsx`, guardar, y mirar el navegador actualizarse solo, sin F5 y sin perder el estado de la
página.

🗣️ *Live Server recargaba la página entera. Esto reemplaza solo la pieza que cambió. Se llama
hot module replacement y es la razón por la que desarrollar en React se siente rápido.*

⌨️ Limpiar la plantilla, **en este orden** (si borras los archivos antes de reemplazar
`App.tsx`, el servidor protesta por los imports rotos):

1. Reemplazar `App.tsx` completo por la versión mínima:

```tsx
export default function App() {
  return <h1>TechCart</h1>;
}
```

2. Borrar `src/App.css` y la carpeta `src/assets/`, y vaciar `src/index.css`.

🗣️ *La carpeta `public/` (el favicon) se queda; no molesta.*

---

# ⏱️ 1:30 · BLOQUE 4 — JSX: la función que devuelve HTML (45 min)

### 1:30 · Qué es JSX (10 min)

🖥️ **[DIAPO 7 · «JSX»]** — el `App.tsx` mínimo a la izquierda; a la derecha, el JavaScript al
que se traduce (`createElement`).

🗣️ *Esto que acabas de escribir no es JavaScript válido — una función no puede devolver una
etiqueta. Se llama JSX, y es la única pieza genuinamente nueva de hoy. Antes de que el navegador
lo vea, Vite lo traduce a llamadas de función normales. Es exactamente lo que ya viviste con
TypeScript: escribes en un lenguaje más cómodo, un traductor lo convierte, el navegador recibe
JavaScript de siempre. Por eso la extensión del archivo es `.tsx`: TypeScript + JSX.*

### 1:40 · Las reglas de JSX — por sus errores (20 min)

🗣️ *JSX parece HTML pero tiene reglas propias. En vez de listártelas, voy a cometer los cuatro
errores que vas a cometer tú esta semana, para que conozcas los mensajes.*

⌨️ En `App.tsx`, provocar cada error en vivo, leer el mensaje, corregir:

1. **Dos raíces.** Devolver `<h1>…</h1><p>…</p>` → error: *JSX expressions must have one parent
   element*. 🗣️ *Una función devuelve UNA cosa. Si necesitas dos elementos hermanos, los
   envuelves. Y si no quieres un `div` de relleno, existe el fragmento: `<>…</>`, un envoltorio
   que no deja rastro en el HTML.*
2. **`class`.** Escribir `class="titulo"` → aviso en consola. 🗣️ *En JSX es `className`, porque
   `class` ya es una palabra reservada de JavaScript. Es el error más común del mundo React y el
   traductor te lo señala.*
3. **Etiqueta sin cerrar.** `<img src="…">` → error de compilación. 🗣️ *En JSX toda etiqueta se
   cierra. Las vacías, con la barra: `<img />`, `<input />`, `<br />`.*
4. **Mostrar un dato.** 🗣️ *¿Y cómo meto un dato en el HTML? Con llaves. Todo lo que va entre
   llaves es una expresión de TypeScript de las de siempre.*

```tsx
const nombre = 'TechCart';
const productosEnCarrito = 3;

export default function App() {
  return (
    <>
      <h1>{nombre.toUpperCase()}</h1>
      <p>Tienes {productosEnCarrito} productos en el carrito</p>
      {/* así se comenta dentro de JSX */}
    </>
  );
}
```

🗣️ *Las llaves aceptan cualquier expresión: una variable, una cuenta, una llamada a función, un
template literal. Lo que NO aceptan es una instrucción: no puedes meter un `if` o un `for` ahí
adentro — cómo se resuelve eso es tema de la clase 3.*

### 2:00 · Ejercicio 1 (15 min)

🧪 **[EJERCICIO EN CLASE]** *(máx. 5 min de intento; después lo resuelvo yo)*

🗣️ *Te paso por el chat un `App.tsx` roto con los cuatro errores que acabamos de ver: dos
raíces, un `class`, una `img` sin cerrar y un dato pegado como texto en vez de llaves. Arréglalo
hasta que la página compile y muestre el dato.*

Resolverlo en vivo nombrando cada error por su mensaje. Remate:

🗣️ *Los mensajes de error de React y de Vite son buenos. Léelos antes de googlear: la mitad de
las veces la respuesta está en la primera línea.*

---

# ☕ 2:15 · RECESO (15 min, aparte)

---

# ⏱️ 2:15 · BLOQUE 5 — La primera pantalla de TechCart (45 min)

### 2:15 · Tailwind entra al build (10 min) — demo del docente; ellos lo replican con calma

🗣️ *En la clase de Tailwind usamos el CDN: el navegador descargaba el traductor de clases cada
vez. Eso era para prototipos, y lo dijimos. Ahora que tenemos build, Tailwind se instala DENTRO
del proyecto, igual que instalamos TypeScript en fundamentos. Mira los tres pasos; los replicas
ahora si me sigues el ritmo, o después con la grabación — la clase de hoy funciona igual sin
estilos.*

⌨️ Primero, detener el servidor: clic en la terminal donde corre `npm run dev` y **`Ctrl+C`**
(igual que detenías `tsc --watch`). Después, instalar los dos paquetes:

```bash
npm install tailwindcss @tailwindcss/vite
```

🗣️ *Dos paquetes: Tailwind, y su **plugin** para Vite. Un plugin es una pieza que le enseña un
truco nuevo a una herramienta. Vite ya trae uno puesto — `react()`, el que traduce JSX —; ahora
le agregamos el que compila las utilidades de Tailwind.*

En `vite.config.ts` — 🗣️ *míralo: es TypeScript, lo sabes leer* — agregar el plugin:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Y en `src/index.css`, una sola línea (borrando lo que hubiera):

```css
@import 'tailwindcss';
```

⌨️ `npm run dev` de nuevo, y probar una clase (`className="text-3xl font-bold"`) en el `h1`.

⚠️ Si a alguien no le funciona: que siga sin estilos — todo lo de hoy funciona igual con HTML
pelado — y use la carpeta de emergencia después.

### 2:25 · La tarjeta de producto (20 min)

🗣️ *Vamos a construir la primera pantalla real: el encabezado de TechCart y una tarjeta de
producto. Los datos, por ahora, escritos a mano — igual que al principio de JavaScript, cuando
el catálogo era un array escrito por nosotros. La honestidad del proceso es la misma: primero la
forma, después los datos de verdad.*

⌨️ En `App.tsx`, construirla en vivo, por capas — primero la estructura, después los datos con
llaves, al final las clases:

```tsx
const producto = {
  nombre: 'Audífonos inalámbricos',
  marca: 'TechSound',
  precio: 249.9,
  imagen: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png',
  stock: 12,
};

export default function App() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">TechCart</h1>
        <p>🛒 0 productos</p>
      </header>

      <article className="w-64 rounded-xl border p-4">
        <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square object-contain" />
        <p className="text-sm text-gray-500">{producto.marca}</p>
        <h2 className="font-semibold">{producto.nombre}</h2>
        <p className="mt-2">S/ {producto.precio}</p>
      </article>
    </main>
  );
}
```

🗣️ *Todo lo que ves ya lo sabías: el HTML semántico, las utilidades de Tailwind y el objeto son
del curso de fundamentos; las llaves, de hace media hora. Lo único nuevo es dónde vive: dentro
de una función que React ejecuta.*

### 2:45 · Ejercicio 2 (15 min)

🧪 **[EJERCICIO EN CLASE]** *(máx. 5 min de intento; después lo resuelvo yo)*

🗣️ *Agrégale a la tarjeta dos cosas: el stock ("12 disponibles") usando el dato del objeto, y
el precio con IGV incluido debajo del precio base — el IGV es 18%, y la cuenta va en las llaves.*

Resolver en vivo. Remate:

🗣️ *`{producto.precio * 1.18}` te salió con ocho decimales, ¿no? En tu proyecto viejo eso lo
resolvía `formatearPrecio`. La buena noticia es que ese archivo no hay que reescribirlo — y ese
es exactamente el siguiente bloque.*

---

# ⏱️ 3:00 · BLOQUE 6 — La mudanza: los módulos se migran tal cual (50 min)

### 3:00 · Qué se muda y qué muere (5 min)

🖥️ **[DIAPO 8 · «La mudanza»]** — los seis módulos del proyecto de fundamentos: cuatro con
flecha a React, dos tachados (`ui.ts`, `main.ts`).

🗣️ *De tu proyecto se mudan cuatro módulos sin tocar una línea: `tipos.ts`, `datos.ts`,
`api.ts` y `formato.ts`. Y dos mueren: `ui.ts` y `main.ts` — las funciones que pintaban y los
listeners. No los perdimos: ese trabajo es el que React acaba de asumir. Que la capa de datos
sobreviva intacta al cambio de framework no es suerte: es lo que ganamos separando
responsabilidades desde que dividimos el proyecto en módulos, en JavaScript.*

### 3:05 · Migrar y tipar la tarjeta (20 min)

⌨️ Copiar `tipos.ts`, `datos.ts`, `api.ts` y `formato.ts` desde el proyecto de fundamentos a
`src/`. Después, en `App.tsx`:

```tsx
import type { Producto } from './tipos';
import formatearPrecio from './formato'; // default, como lo exportaste en fundamentos

const producto: Producto = {
  // el objeto de antes…
};
```

🗣️ *Una sintaxis nueva en la primera línea: `import type`. Importa **solo el tipo** — y como los
tipos desaparecen al compilar (lo viste en la clase de TypeScript), el traductor borra esa línea
entera del JavaScript final. La plantilla de Vite viene configurada para exigir que lo digas
explícito cuando importas un tipo; tu proyecto viejo no lo exigía, por eso nunca la habías
necesitado.*

🗣️ *Y mira lo que pasa: TypeScript protesta — a nuestro objeto le faltan campos del contrato.
La `interface Producto` que escribiste la clase pasada acaba de hacer su trabajo en React, sin
cambiarle una coma. Complétalo con los campos que pide.*

⌨️ Completar el objeto hasta que compile, y reemplazar el precio crudo por
`{formatearPrecio(producto.precio)}`.

🧪 **[EJERCICIO EN CLASE]** *(máx. 5 min)* — 🗣️ *Rómpelo a propósito: cámbiale el tipo a un
campo, bórrale otro, y lee los dos mensajes. Quiero que reconozcas a TypeScript quejándose
dentro de un archivo `.tsx`.*

### 3:25 · La API responde desde React (15 min)

⌨️ Al final de `src/main.tsx`, marcado como **temporal**:

```ts
import { obtenerProductos } from './api';

// TEMPORAL — prueba de humo de la migración (se borra hoy mismo):
obtenerProductos().then((resultado) => {
  console.log('API OK:', resultado.productos.length, 'productos');
});
```

🗣️ *Abre la consola: tus 38 productos, pedidos por el mismo `Promise.all` con el mismo
respaldo que escribiste tú. La capa de datos completa ya vive en React.*

🗣️ *Y ahora la pregunta honesta: ¿por qué lo imprimo en consola en vez de pintarlo en la
página? Porque pedir datos cuando el componente aparece — y repintar cuando llegan — necesita
una pieza de React que se llama `useEffect`, y esa pieza es la clase 6. Cada cosa a su tiempo:
hoy los datos llegan hasta la consola; a la pantalla llegan cuando tengamos el vocabulario para
hacerlo bien.*

⌨️ Borrar la prueba de humo antes de seguir.

### 3:40 · El build de producción (10 min)

⌨️ Con todo compilando:

```bash
npm run build
```

🗣️ *Primero corre `tsc` — tu revisor de la clase de TypeScript, ahora solo revisa, no traduce —
y después Vite empaqueta todo en `dist/`: un HTML, un CSS y un JavaScript minificados — sin
espacios ni nombres largos, para que pesen menos. Esa
carpeta es lo que algún día subiremos a producción; ese día es la clase 12, la última. Guarda
esta idea: `npm run build` sin errores es, desde hoy, tu criterio de entrega de todas las
tareas.*

---

# ⏱️ 3:50 · BLOQUE 7 — CIERRE (25 min) — reserva dura, empieza a las 3:50

### 3:50 · Resumen (7 min)

🖥️ **[DIAPO 9 · «Lo de hoy»]** — cinco líneas:

1. React repinta por ti: **UI = f(datos)** — tú cambias el dato, él actualiza.
2. **Vite** = tu `tsc --watch` + Live Server, en una sola herramienta con plantillas.
3. **JSX**: funciones que devuelven HTML; una raíz, `className`, todo se cierra, datos entre `{}`.
4. Un **componente** es una función que devuelve JSX. Hoy: `App`. La comunicación entre varios: clase 2.
5. La capa de datos **se migró intacta**: separar responsabilidades pagó la mudanza.

### 3:57 · Tareas (10 min) — criterio de entrega: `npm run build` sin errores + push

🖥️ **[DIAPO 10 · «5 tareas»]** — la lista con sus niveles; queda proyectada mientras se dictan.

🗣️ ***Fácil — termina la mudanza.** Si algún módulo quedó sin migrar en clase, complétalo
(`datos.ts`, `formato.ts`). Cambia el producto de la tarjeta por uno real de tu `datos.ts` —
importado, no copiado.*

🗣️ ***Intermedia 1 — la página completa.** Dale a `App` la estructura semántica que aprendiste
en HTML: `header` con logo y nav, `main` con la tarjeta, `footer`. Todo JSX, todo con utilidades
de Tailwind. Cuidado con los cuatro errores del Ejercicio 1.*

🗣️ ***Intermedia 2 — tres tarjetas.** Duplica la tarjeta para dos productos más de tu
`datos.ts`. Sí: copiar y pegar el `article` tres veces. Hazlo aunque duela — y escribe en un
comentario del código qué problema le ves a ese copy-paste. Tu respuesta es la primera
diapositiva de la próxima clase.*

🗣️ ***Difícil 1 — el resumen del carrito.** Migra `carrito.ts`. Crea un array de prueba con dos
`ItemCarrito` y muestra bajo las tarjetas lo que devuelve `resumenCarrito(items)` — el mismo
texto que llevaba el encabezado de tu tienda. Todo son funciones puras que ya escribiste; lo
nuevo es solo mostrarlas con llaves.*

🗣️ ***Difícil 2 — leer React de verdad.** La plantilla que borramos traía un contador que subía
al hacer clic. Recupéralo de la documentación (react.dev, página "Quick Start"), pégalo en un
componente y haz que funcione. Vas a encontrar un `useState` que todavía no te enseñé: no lo
estudies, solo léelo y escribe en un comentario qué crees que hace. Lo confirmamos en la
clase 4.*

### 4:07 · Push y lecturas (3 min)

⌨️ `git add . && git commit -m "feat: proyecto React con Vite + primera pantalla" && git push`

Lecturas (van también en el README):
- **es.react.dev** → "Describir la interfaz de usuario" (la sección completa de JSX).
- **vite.dev/guide** → "Why Vite" (ahora la entiendes: tú armaste esa línea a mano).
- Buscar: *"React Developer Tools"* — instala la extensión; la usamos desde la próxima clase.

### 4:10 · Anticipo (5 min) — fin del contenido: 4:15

🖥️ **[DIAPO 11 · «Props»]** — la tarjeta triplicada con el copy-paste tachado, y al lado un
`<ProductCard producto={…} />` con su `interface Props`.

🔮 **[ANTICIPO]**

🗣️ *La tarea intermedia te va a obligar a copiar la misma tarjeta tres veces. Ese dolor tiene
nombre y solución: la próxima clase esa tarjeta se convierte en un componente — `ProductCard` —
que se escribe una vez y se usa tres, y cada copia recibe su producto por algo llamado props.
La `interface Props` con la que te las voy a presentar la sabes leer desde la clase de
TypeScript. Trae las tareas hechas y el build en cero. Nos vemos.*

---

**Después de la clase** (regla 6 del MAPA): publicar el estado real dictado en la carpeta
`clase-01/` del repositorio del curso de React, aunque la sesión se haya cortado antes de lo
planeado.
