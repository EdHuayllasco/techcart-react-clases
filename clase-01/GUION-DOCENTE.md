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
- **Todo ocurre en MI pantalla.** Nadie está obligado a codear en vivo (el que quiera seguir en
  paralelo, bienvenido — pero el guion no espera a nadie). La práctica de los alumnos son las
  tareas, con la grabación al lado.
- Los **retos** son de predicción: planteo el problema, pausa breve — responde por el chat
  quien quiera —, y lo resuelvo yo en vivo.
- Ninguna instalación lleva promesa de tiempo. Se da el paso, se señala el plan B y se sigue.
- El cierre empieza a las **3:50** pase lo que pase. El Bloque 7 (taller) es la válvula natural.

**Preparación previa del docente** (antes de la clase):
- [ ] Correr `npm create vite@latest` en tu máquina con la versión actual y anotar qué pregunta
      exactamente (las preguntas del asistente cambian entre versiones). *Última verificación:
      2026-08-08 con create-vite 9.1.2 → Vite 8.2, TypeScript 6.0, React 19.2, plantilla con
      script `lint` (oxlint); el flujo completo del guion (crear → instalar → Tailwind → build)
      probado de punta a punta sin errores.* Si quieres la clase determinista, fija en el
      comando la versión que verificaste: `npm create vite@9.1.2` en vez de `@latest`.
- [ ] Subir al repo la carpeta de emergencia `clase-01-instalado/` (proyecto Vite ya creado, con
      Tailwind configurado y los cuatro módulos migrados) y **probar que corre**
      (`npm install && npm run dev`) — es el punto de partida de quien aplique la clase después.
- [ ] Tener listos para pegar al chat: el `App.tsx` roto del Reto 1 y los seis retos de la
      Ronda JSX (Bloque 4), en mensajes separados.
- [ ] Tener a mano el enlace de la extensión **React Developer Tools** (Chrome/Edge) — se
      muestra en el taller del Bloque 7.
- [ ] Publicar el estado final del curso de fundamentos (la clase de TypeScript) y avisar que
      hoy se parte de ahí.
- [ ] Tener abierto tu proyecto de fundamentos para copiar los módulos en el Bloque 6, y
      **verificar cómo exporta tu `formato.ts`** (default o con nombre): el import del Bloque 6
      tiene que coincidir.

## Agenda (4:15)

> Presupuesto honesto: lo dictado se lee a velocidad natural (una diapositiva son 2-3 min);
> el tiempo real vive en teclear en mi pantalla y en los retos (plantear → pausa → resolver).

| # | Bloque | Min | Acum. |
|---|--------|:---:|:-----:|
| 1 | Punto de partida + repaso de la clase de TypeScript | 15 | 0:15 |
| 2 | **Por qué React**: el problema que ya vivimos | 20 | 0:35 |
| 3 | **Vite**: crear el proyecto (en mi pantalla, paso a paso) | 35 | 1:10 |
| 4 | **JSX** + la ronda de retos | 50 | 2:00 |
| — | ☕ Receso (aparte) | 15 | — |
| 5 | **La primera pantalla de TechCart** (+ Tailwind en el build) | 40 | 2:40 |
| 6 | **La mudanza**: migrar `tipos.ts`, `datos.ts`, `api.ts`, `formato.ts` | 40 | 3:20 |
| 7 | **Taller: la vitrina crece** (segunda tarjeta · grilla · DevTools) | 30 | 3:50 |
| 8 | Cierre: resumen, 5 tareas, push demostrado, dudas y anticipo | 25 | **4:15** |

> **Válvulas de recorte** (en este orden, si el reloj se estira): (1) el Bloque 7 entero es la
> válvula por diseño — se dicta hasta donde alcance y lo que falte pasa a tareas; (2) la Ronda
> JSX del Bloque 4 se recorta de seis retos a tres; (3) el mini-reto de diseño del Bloque 5 se
> muestra sin pausa. **Nunca** se recorta el Bloque 2 (es el modelo mental de todo el bloque de
> React) **ni** el cierre.

---

# ⏱️ 0:00 · BLOQUE 1 — Punto de partida y repaso (15 min)

### 0:00 · Dónde quedamos (5 min)

🖥️ **[DIAPO 1 · «Clase 1 — React»]** — título y agenda del día.

🗣️ *La clase pasada le pusimos tipos a todo el proyecto y escribimos el checkout ya en
TypeScript. Hoy el proyecto se muda a React. Primero vamos a entender qué problema resuelve
React — que es un problema que ustedes ya sufrieron —, después creo el proyecto con una
herramienta que se llama Vite — todo en mi pantalla, ustedes lo replican con calma después,
con la grabación —, y al final nos traemos los módulos que ya escribieron: los tipos y la capa
de datos se migran tal cual. Nada de lo que hicieron se bota.*

🗣️ *El punto de partida está publicado: el estado final de la clase de TypeScript. Cuando
apliquen la clase, partan de ahí.*

### 0:05 · Repaso de tareas (10 min)

Revisar en vivo **una** de las difíciles de la clase de TypeScript (la que más preguntas haya
generado — normalmente la de "Mis pedidos"). No se escribe desde cero: se recorre la solución
ya hecha explicando cada decisión, y se reescribe en vivo **solo la aduana** (leer el
`localStorage` con `unknown` y comprobar antes de confiar), que es la parte que se muda a React.

🗣️ *Fíjate en lo que acabamos de hacer: leer un dato externo con `unknown`, comprobar su forma y
recién usarlo. Esa disciplina se viene con nosotros a React.*

---

# ⏱️ 0:15 · BLOQUE 2 — Por qué React (20 min)

### 0:15 · El problema que ya vivimos (7 min)

🖥️ **[DIAPO 2 · «Nuestro main.ts»]** — el diagrama de su propio proyecto: 3 datos
(`productos`, `categoriaActiva`, `termino`) y las funciones `pintar…` que hay que llamar a mano.

🗣️ *Este es el proyecto de ustedes, dibujado. Tres datos, y un grupo de funciones que pintan.
¿Cuál era la regla? Cada vez que cambia un dato, TÚ tienes que acordarte de llamar a las
funciones que repintan lo afectado. Si agregas al carrito y olvidas llamar a `pintarCarrito`,
la página miente: el dato cambió y la pantalla no.*

🗣️ *A pequeña escala se puede vivir así — ustedes lo lograron. Pero cada dato nuevo multiplica
las combinaciones: ¿qué repinto si cambia el término de búsqueda? ¿Y si cambia la categoría Y el
carrito? Ese "acordarse" no escala. Ese es el problema, y lo vivieron: no me lo tienen que creer.*

### 0:22 · Qué es React — y qué NO es (8 min)

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
dentro de React tal cual. De los seis módulos de tu proyecto, cuatro se mudan hoy sin tocar una
línea. Los únicos que mueren son `ui.ts` y `main.ts` — las funciones `pintar…` y los listeners.
Ese trabajo ahora lo hace React.*

### 0:30 · Componente: la palabra del curso (5 min)

🖥️ **[DIAPO 5 · «Componente»]** — una tarjeta de producto señalada dentro de la página completa.

🗣️ *Una palabra nueva y es la palabra de las doce clases de este bloque: componente. Un
componente es un pedazo de interfaz con su propia lógica: la tarjeta de producto, el buscador,
el carrito. En React una página es un árbol de componentes, y cada componente es —
literalmente — una función que devuelve HTML. Hoy escribimos el primero. Cómo se comunican
entre ellos es la clase 2.*

---

# ⏱️ 0:35 · BLOQUE 3 — Vite: crear el proyecto (35 min)

### 0:35 · Qué es Vite y por qué lo necesitamos (5 min)

🖥️ **[DIAPO 6 · «Vite»]** — dos columnas: lo que armamos a mano en fundamentos / lo que Vite trae.

🗣️ *En la clase de TypeScript armamos a mano una línea de producción: `tsc --watch` traducía
TypeScript y Live Server servía la página. Funcionó, y ahora sabes exactamente qué hace cada
pieza. Vite es esa línea de producción, ya armada y mucho más rápida: un servidor de desarrollo
y un traductor, en un solo comando. Y trae plantillas: le dices "React + TypeScript" y te
entrega el proyecto con todo conectado.*

### 0:40 · Crear el proyecto, paso a paso (12 min)

⌨️ En mi terminal, parado donde guardo mis proyectos (fuera del viejo). La carpeta la crea el
asistente — no hay `mkdir`:

```bash
npm create vite@latest techcart-react
```

🗣️ *Comando nuevo — léelo por partes. `npm create vite` descarga y ejecuta el **asistente** de
Vite: un programa que hace preguntas y te arma el proyecto. Es primo del `npx` que ya usaste con
`tsc`: ejecutar algo sin instalarlo globalmente. `@latest` pide la versión más reciente del
asistente. Y `techcart-react` es el nombre de la carpeta que va a crear.*

🗣️ *Como el nombre ya va en el comando, hace dos preguntas. La primera, el framework: elijo
**React**. La segunda, la variante — y aquí con cuidado, apunten esto: la lista trae opciones
que NO queremos. Elige **"TypeScript" a secas**, la primera. No "TypeScript + React Compiler",
no "RSC", no "React Router v7" — esas instalan otras cosas y te sacan del curso. Si tu versión
pregunta algo más cuando lo repliques, acepta lo que propone con Enter.*

⌨️ Después, los tres comandos de siempre — y mientras `npm install` corre, seguir hablando:

```bash
cd techcart-react
npm install
npm run dev
```

🗣️ *`npm install` ya sabes qué hace y ya sabes que no se promete cuánto tarda. Cuando termina,
`npm run dev` da una dirección local — la abro. La página de bienvenida de la plantilla: los
logos, una imagen y un botón contador (el detalle cambia con cada versión). Si al replicarlo
ves esta página, tu proyecto de React existe. Y si algo se traba: la carpeta
`clase-01-instalado/` del repo es el mismo proyecto ya creado — `npm install`, `npm run dev`,
y sigues.*

### 0:52 · Tour por la carpeta (12 min)

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

### 1:04 · Refresco en caliente + limpieza (6 min)

⌨️ Demostrar el **refresco en caliente**: con `npm run dev` corriendo, cambiar un texto de
`App.tsx`, guardar, y mirar el navegador actualizarse solo, sin F5.

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

# ⏱️ 1:10 · BLOQUE 4 — JSX + la ronda de retos (50 min)

### 1:10 · Qué es JSX (5 min)

🖥️ **[DIAPO 7 · «JSX»]** — el `App.tsx` mínimo a la izquierda; a la derecha, el JavaScript al
que se traduce (`createElement`).

🗣️ *Esto que acabo de escribir no es JavaScript válido — una función no puede devolver una
etiqueta. Se llama JSX, y es la única pieza genuinamente nueva de hoy. Antes de que el navegador
lo vea, Vite lo traduce a llamadas de función normales. Es exactamente lo que ya viviste con
TypeScript: escribes en un lenguaje más cómodo, un traductor lo convierte, el navegador recibe
JavaScript de siempre. Por eso la extensión del archivo es `.tsx`: TypeScript + JSX.*

### 1:15 · Las reglas de JSX — por sus errores (15 min)

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

### 1:30 · Reto 1: el App roto (8 min)

🧪 **[RETO]** *(pego el código, pausa de 2 min — respuestas por el chat, quien quiera —, y lo
resuelvo yo)*

⌨️ Pegar al chat un `App.tsx` roto con los cuatro errores recién vistos: dos raíces, un
`class`, una `img` sin cerrar y un dato pegado como texto en vez de llaves.

🗣️ *Cuatro errores escondidos — los cuatro de hace un momento. ¿Cuáles son y en qué línea?
Escriban en el chat los que encuentren. Dos minutos y lo arreglo aquí.*

Resolverlo en vivo nombrando cada error por su mensaje. Remate:

🗣️ *Los mensajes de error de React y de Vite son buenos. Léelos antes de googlear: la mitad de
las veces la respuesta está en la primera línea.*

### 1:38 · La ronda JSX: seis retos (22 min)

🗣️ *Ronda de calentamiento — seis retos cortos, todos del mismo tamaño. El formato: pego el
reto, piensen la respuesta — el que quiera la tira al chat —, y a los dos minutos lo escribo yo
aquí y seguimos. Para no ensuciar `App`, creo `src/Practica.tsx`: función `Practica` exportada
por default, y la uso dentro de `App` como `<Practica />`. Sí: acabo de usar mi primer
componente propio como etiqueta; en la clase 2 lo entendemos completo.*

⌨️ Pegar los retos al chat de uno en uno; ~2 min de pausa y resolución en vivo cada uno:

1. **La constante.** `const tienda = 'TechCart'` mostrada en un `h2`, en mayúsculas
   (`toUpperCase`, dentro de las llaves).
2. **La cuenta.** `const precio = 249.9`: el precio con IGV (18%) en un párrafo, con dos
   decimales (`toFixed(2)` — de fundamentos).
3. **El fragmento.** Tres párrafos hermanos SIN ningún `div` de relleno.
4. **El atributo con dato.** Una `img` cuyo `src` y `alt` salgan de constantes — las llaves
   también funcionan en los atributos.
5. **El template literal.** `const marca = 'TechSound'`: un párrafo que diga
   `Distribuidor oficial de TechSound` usando `` `…${marca}` `` dentro de las llaves.
6. **El array.** `const marcas = ['TechSound', 'Nova', 'Clik']`: muestra cuántas marcas hay
   (`length`) y la primera (`marcas[0]`).

🗣️ *Cierre de la ronda: todo lo que vieron es TypeScript de fundamentos adentro de llaves.
JSX no trajo un lenguaje nuevo — trajo un lugar nuevo donde escribir el que ya saben.* ⌨️ Quitar
`<Practica />` de `App` (el archivo queda: las tareas lo usan).

---

# ☕ 2:00 · RECESO (15 min, aparte)

---

# ⏱️ 2:00 · BLOQUE 5 — La primera pantalla de TechCart (40 min)

### 2:00 · Tailwind entra al build (10 min)

🗣️ *En la clase de Tailwind usamos el CDN: el navegador descargaba el traductor de clases cada
vez. Eso era para prototipos, y lo dijimos. Ahora que tenemos build, Tailwind se instala DENTRO
del proyecto, igual que instalamos TypeScript en fundamentos. Tres pasos — míralos aquí, y al
replicar la clase los repites; si algo falla, la tienda funciona igual sin estilos.*

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

### 2:10 · La tarjeta de producto (15 min)

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

### 2:25 · Reto 2: stock e IGV (7 min)

🧪 **[RETO]** *(pausa de 2 min — chat opcional — y lo resuelvo yo)*

🗣️ *Dos agregados para esta tarjeta — ¿cómo los escribirían?: el stock ("12 disponibles")
usando el dato del objeto, y el precio con IGV incluido debajo del precio base — la cuenta ya
la hicieron en la ronda.*

Resolver en vivo. Remate:

🗣️ *`{producto.precio * 1.18}` con sus decimales largos otra vez. En tu proyecto viejo eso lo
resolvía `formatearPrecio`. La buena noticia es que ese archivo no hay que reescribirlo — y ese
es exactamente el siguiente bloque.*

### 2:32 · Mini-reto de diseño (8 min)

🧪 **[RETO]** *(pausa de 1 min: sugerencias de utilidades por el chat; aplico las mejores)*

🗣️ *Con la documentación de Tailwind abierta (tailwindcss.com): ¿qué utilidades le pondrían a
la tarjeta para que se sienta de tienda de verdad? Tiren nombres al chat — una sombra al pasar
el mouse, una transición, lo que encuentren en la doc. Aplico las mejores propuestas aquí.*

⌨️ Aplicar 2 o 3 (p. ej. `hover:shadow-lg transition-shadow`). Buscar una en la documentación
**en vivo** — buscar en esa documentación es una habilidad del oficio, y se modela mostrándola.

---

# ⏱️ 2:40 · BLOQUE 6 — La mudanza: los módulos se migran tal cual (40 min)

### 2:40 · Qué se muda y qué muere (4 min)

🖥️ **[DIAPO 8 · «La mudanza»]** — los seis módulos del proyecto de fundamentos: cuatro con
flecha a React, dos tachados (`ui.ts`, `main.ts`).

🗣️ *De tu proyecto se mudan cuatro módulos sin tocar una línea: `tipos.ts`, `datos.ts`,
`api.ts` y `formato.ts`. Y dos mueren: `ui.ts` y `main.ts` — las funciones que pintaban y los
listeners. No los perdimos: ese trabajo es el que React acaba de asumir. Que la capa de datos
sobreviva intacta al cambio de framework no es suerte: es lo que ganamos separando
responsabilidades desde que dividimos el proyecto en módulos, en JavaScript.*

### 2:44 · Migrar y tipar la tarjeta (12 min)

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
cambiarle una coma. Lo completo con los campos que pide.*

⌨️ Completar el objeto hasta que compile, y reemplazar el precio crudo por
`{formatearPrecio(producto.precio)}`.

### 2:56 · Reto 3: rómpelo a propósito (6 min)

🧪 **[RETO]** *(pausa de 1 min — predicciones por el chat — y lo hago yo)*

🗣️ *Voy a sabotear el producto dos veces: primero le cambio el tipo a un campo — el precio como
texto —, después le borro un campo completo. Antes de que guarde: ¿qué va a decir TypeScript en
cada caso? Piénsenlo… y miren.*

⌨️ Ejecutar los dos sabotajes, leer los dos mensajes en voz alta, restaurar.

🗣️ *Reconozcan esos dos mensajes: son los errores más comunes al pasar datos en React, y los
van a ver esta semana en sus tareas. TypeScript quejándose dentro de un `.tsx` es su nuevo
mejor aliado.*

### 3:02 · La API responde desde React (12 min)

⌨️ Al final de `src/main.tsx`, marcado como **temporal**:

```ts
import { obtenerProductos } from './api';

// TEMPORAL — prueba de humo de la migración (se borra hoy mismo):
obtenerProductos().then((resultado) => {
  console.log('API OK:', resultado.productos.length, 'productos');
});
```

🗣️ *Abro la consola: los 38 productos, pedidos por el mismo `Promise.all` con el mismo
respaldo que escribieron ustedes. La capa de datos completa ya vive en React. ¿Por qué en
consola y no en la página? Porque pedir datos cuando el componente aparece — y repintar cuando
llegan — necesita una pieza de React que se llama `useEffect`, y esa pieza es la clase 6. Hoy
los datos llegan hasta la consola; a la pantalla llegan cuando tengamos el vocabulario para
hacerlo bien.*

⌨️ Borrar la prueba de humo antes de seguir.

### 3:14 · El build de producción (6 min)

⌨️ Con todo compilando:

```bash
npm run build
```

🗣️ *Primero corre `tsc` — tu revisor de la clase de TypeScript, ahora solo revisa, no traduce —
y después Vite empaqueta todo en `dist/`: un HTML, un CSS y un JavaScript minificados — sin
espacios ni nombres largos, para que pesen menos. Esa carpeta es lo que algún día subiremos a
producción; ese día es la clase 12, la última. Guarda esta idea: `npm run build` sin errores es,
desde hoy, tu criterio de entrega de todas las tareas.*

---

# ⏱️ 3:20 · BLOQUE 7 — Taller: la vitrina crece (30 min) — la válvula del día

> Si los bloques anteriores se estiraron, este taller se recorta o se salta entero: sus tres
> piezas están cubiertas por las tareas y las lecturas. Si el ritmo vino bien, se dicta completo.

### 3:20 · Segunda tarjeta, a mano (10 min)

⌨️ En mi pantalla: duplicar el `article` con OTRO producto — `const producto2: Producto =
productos[1]`, importando el array de `datos.ts` — y cambiar `producto` por `producto2` en la
copia.

🗣️ *Dos tarjetas, dos objetos, el mismo HTML dos veces. Funciona — y mira lo que acabo de
hacer: seleccionar, copiar, pegar, cambiar una palabra. Ocho líneas duplicadas para variar UN
dato. Guarda esa incomodidad: la tarea te pide una tercera copia a propósito, y la próxima
clase la cura con nombre y apellido.*

### 3:30 · Mini-reto Tailwind II: la grilla (8 min)

🧪 **[RETO]** *(pausa de 1 min — propuestas por el chat — y lo escribo yo)*

🗣️ *Las dos tarjetas quedaron apiladas. Pregunta de la clase de Tailwind: ¿qué utilidades le
pondrían a un `section` que las envuelva para tenerlas en fila, con espacio entre ellas, y que
en pantallas chicas caigan una debajo de otra?*

⌨️ Resolver: `<section className="flex flex-wrap gap-4">` — y probar achicando la ventana.

🗣️ *`flex`, `gap`, `flex-wrap` — responsive con utilidades, fundamentos puro. Nada de React en
esta respuesta: por eso era pregunta y no demo.*

### 3:38 · React DevTools: instalar y mirar (12 min)

⌨️ Instalar la extensión **React Developer Tools** (Chrome/Edge, dos clics — dejo el enlace en
el chat) y abrir la pestaña **Components** con la tienda en pantalla.

🗣️ *El inspector de elementos muestra el HTML final; esta pestaña nueva muestra los
**componentes** — hoy solo `App`, mañana un árbol entero. Va a ser tu radiografía de React todo
el bloque. Instálala cuando apliques la clase: dos clics, y la próxima clase la usamos en
serio.*

---

# ⏱️ 3:50 · BLOQUE 8 — CIERRE (25 min) — reserva dura, empieza a las 3:50

### 3:50 · Resumen (4 min)

🖥️ **[DIAPO 9 · «Lo de hoy»]** — cinco líneas:

1. React repinta por ti: **UI = f(datos)** — tú cambias el dato, él actualiza.
2. **Vite** = tu `tsc --watch` + Live Server, en una sola herramienta con plantillas.
3. **JSX**: funciones que devuelven HTML; una raíz, `className`, todo se cierra, datos entre `{}`.
4. Un **componente** es una función que devuelve JSX. Hoy: `App`. La comunicación entre varios: clase 2.
5. La capa de datos **se migró intacta**: separar responsabilidades pagó la mudanza.

### 3:54 · Tareas (3 min) — criterio de entrega: `npm run build` sin errores + push

🖥️ **[DIAPO 10 · «5 tareas»]** — se leen tal cual; el detalle queda en el README de la clase.

🗣️ ***Fácil — replica la clase.** Crea tu proyecto con Vite, ponle Tailwind, migra los cuatro
módulos y construye la tarjeta — todo lo de hoy, con la grabación al lado. Es LA tarea: lo
demás se apoya en ella.*

🗣️ ***Intermedia 1 — la página completa.** Dale a `App` la estructura semántica que aprendiste
en HTML: `header` con logo y nav, `main` con las tarjetas, `footer`. Todo JSX, todo con
utilidades de Tailwind.*

🗣️ ***Intermedia 2 — tres tarjetas.** Suma una tercera tarjeta copiando y pegando — sí, otra
vez — y escribe en un comentario del código qué problema le ves a ese copy-paste. Tu respuesta
es la primera diapositiva de la próxima clase.*

🗣️ ***Difícil 1 — el resumen del carrito.** Migra `carrito.ts`. Crea un array de prueba con dos
`ItemCarrito` y muestra bajo las tarjetas lo que devuelve `resumenCarrito(items)` — el mismo
texto que llevaba el encabezado de tu tienda.*

🗣️ ***Difícil 2 — leer React de verdad.** Recupera el contador de la plantilla desde react.dev
("Quick Start"), hazlo funcionar en tu `Practica.tsx`, y comenta qué crees que hace ese
`useState` que aún no te enseño. Lo confirmamos en la clase 4.*

### 3:57 · El push, demostrado + dudas (12 min)

⌨️ En mi pantalla, el cierre de trabajo completo — el mismo que harán ellos al terminar la
tarea fácil:

```bash
npm run build
git add . && git commit -m "feat: proyecto React con Vite + primera pantalla" && git push
```

🗣️ *Este par de comandos cierra TODAS las tareas del bloque: build en cero, commit, push. Yo
reviso los repos entre clases — lo que suban es lo que veo. Y ahora sí: preguntas. Lo que quedó
picando de React, de Vite, de JSX — este es el espacio.*

Responder dudas del chat. Si no hay: repasar los errores típicos de la semana (import roto tras
la limpieza, campo faltante del contrato, `class` en vez de `className`) — son las tres
consultas que van a llegar igual.

### 4:09 · Lecturas y anticipo (6 min)

Lecturas (van también en el README):
- **es.react.dev** → "Describir la interfaz de usuario" (la sección completa de JSX).
- **vite.dev/guide** → "Why Vite" (ahora la entiendes: tú armaste esa línea a mano).
- **tailwindcss.com** → deja la pestaña de utilidades a mano: los mini-retos vuelven.

🖥️ **[DIAPO 11 · «Props»]** — la tarjeta triplicada con el copy-paste tachado, y al lado un
`<ProductCard producto={…} />` con su `interface Props`.

🔮 **[ANTICIPO]**

🗣️ *Hoy copié la tarjeta dos veces y la tarea te pide una tercera. Ese dolor tiene nombre y
solución: la próxima clase esa tarjeta se convierte en un componente — `ProductCard` — que se
escribe una vez y se usa las veces que haga falta, y cada copia recibe su producto por algo
llamado props. La `interface Props` con la que te las voy a presentar la sabes leer desde la
clase de TypeScript. Trae las tareas hechas y el build en cero. Nos vemos.*

---

**Después de la clase** (regla 6 del MAPA): publicar el estado real dictado en la carpeta
`clase-01/` del repositorio del curso de React, aunque la sesión se haya cortado antes de lo
planeado.
