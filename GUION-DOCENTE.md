# Libreto docente — Clase 1 de React · Una tienda nueva, desde cero
### Por qué existe React, Vite y JSX — y de ahí, de largo: componentes y props hasta donde alcance

**De dónde venimos.** El curso de fundamentos cerró con la clase de TypeScript: los alumnos
saben HTML, CSS, Tailwind, JavaScript moderno y tipos. Ese conocimiento viaja completo —
**el código no**. El bloque de React construye una tienda **nueva, desde cero absoluto**: una
tienda de tecnología con la estética de las tiendas grandes (la plantilla de referencia estilo
iStore: portada con héroe, carruseles, detalle con galería, rutas). Nada se copia del proyecto
viejo: cada pieza se escribe limpia, en TypeScript, cuando el curso la necesita.

**Por qué esta clase existe.** Desde las últimas clases de JavaScript vengo repitiendo la misma
idea: nosotros escribíamos `pintarCatalogo`, `pintarCarrito`… y cada vez que cambiaba un dato
había que **acordarse** de llamar a las funciones correctas. React hace eso y nada más: tú
cambias el dato y él repinta. Hoy esa idea se vuelve código: el proyecto con Vite, JSX, la
primera pantalla y el contrato de datos. Y de ahí el guion **sigue de largo** con componentes y
props — el material de la clase 2 — hasta que el reloj marque el cierre. Donde se corte, la
clase 2 retoma exacto.

**El modelo de flujo, pleno (regla nueva del MAPA):** este guion carga **más material del que
cabe** (~4 h 40 de dictado y código). No hay ejercicios de relleno ni talleres: es contenido
corrido, en mi pantalla, al ritmo natural. A las **3:50 se corta lo que se esté dictando** y
empieza el cierre. El punto de corte se anota y la clase siguiente abre retomándolo.

**Reglas de hoy** (las de siempre, del MAPA):
- La clase se graba: ante la duda, avanza; el que se pierde rebobina.
- **Todo ocurre en MI pantalla.** Nadie está obligado a codear en vivo; la práctica de los
  alumnos son las tareas, con la grabación al lado.
- Ninguna instalación lleva promesa de tiempo. Se da el paso, se señala el plan B y se sigue.
- El cierre empieza a las **3:50** pase lo que pase.

**Preparación previa del docente** (antes de la clase):
- [ ] Correr `npm create vite@latest` en tu máquina con la versión actual y anotar qué pregunta
      exactamente. *Última verificación: 2026-08-08 con create-vite 9.1.2 → Vite 8.2,
      TypeScript 6.0, React 19.2, plantilla con script `lint` (oxlint); flujo completo
      (crear → instalar → Tailwind → build) probado sin errores.* Si quieres la clase
      determinista, fija la versión verificada: `npm create vite@9.1.2`.
- [ ] Subir al repo la carpeta de emergencia `clase-01-instalado/` (el proyecto tal como
      termina el tramo fijo de esta clase: Vite + Tailwind + `tipos.ts` + `datos.ts` +
      `formato.ts` + la tarjeta) y **probar que corre** — es el punto de partida de quien
      replica la clase.
- [ ] Tener a mano 3 o 4 productos de **dummyjson.com/products** (nombre, marca, precio, URL de
      imagen) para escribir el catálogo semilla sin improvisar.
- [ ] Tener a mano el enlace de la extensión **React Developer Tools** (se menciona al llegar a
      componentes).

## Agenda (4:15 — con material de sobra)

> Lo dictado se presupuesta a velocidad de lectura real. Los bloques 1–6 son el tramo fijo de
> hoy; del bloque 7 en adelante es **flujo**: material de la clase 2 que se dicta hasta las
> 3:50 — hasta donde alcance, sin apuro y sin relleno.

| # | Bloque | Min | Acum. |
|---|--------|:---:|:-----:|
| 1 | Punto de partida: la tienda que vamos a construir | 15 | 0:15 |
| 2 | **Por qué React**: el problema que ya vivimos | 20 | 0:35 |
| 3 | **Vite**: crear el proyecto (en mi pantalla, paso a paso) | 35 | 1:10 |
| 4 | **JSX**: la función que devuelve HTML | 20 | 1:30 |
| 5 | **La primera pantalla** (+ Tailwind en el build) | 30 | 2:00 |
| — | ☕ Receso (aparte) | 15 | — |
| 6 | **El contrato, desde cero**: `tipos.ts` · `datos.ts` · `formato.ts` | 35 | 2:35 |
| 7+ | **FLUJO** → componentes y props (material de la clase 2), hasta las 3:50 | ~75 | 3:50 |
| C | Cierre: resumen, 5 tareas, push demostrado, dudas y anticipo | 25 | **4:15** |

---

# ⏱️ 0:00 · BLOQUE 1 — Punto de partida (15 min)

### 0:00 · La tienda que vamos a construir (8 min)

🖥️ **[DIAPO 1 · «Clase 1 — React»]** — título y agenda del día.

🖥️ **[DIAPO 2 · «La tienda nueva»]** — la plantilla de referencia (portada con héroe,
carrusel de categorías, tarjetas, detalle con galería) al lado de la tienda de fundamentos.

🗣️ *Esto de la izquierda es lo que construimos en fundamentos: un catálogo con filtros, carrito
y checkout — y funciona. Esto de la derecha es lo que vamos a construir en estas doce clases:
una tienda con portada de marca grande, carruseles, páginas propias por producto, sesión de
usuario. El salto de una a otra es exactamente el "por qué React".*

🗣️ *Y una decisión importante: **empezamos desde cero absoluto**. Proyecto nuevo, archivos
nuevos, todo escrito en TypeScript desde la primera línea. Del curso de fundamentos te traes
TODO lo que sabes — HTML semántico, Tailwind, `map` y `filter`, los tipos, la disciplina de
módulos — pero ni un archivo copiado. Cada pieza se escribe limpia, cuando la necesitemos.*

🗣️ *Una cosa más sobre el ritmo: en este bloque las clases no se cortan por tema — se enseña de
corrido y donde nos alcance el reloj, ahí quedamos, y la siguiente clase retoma exacto. Así que
no te asustes si hoy "empezamos la clase 2": es el plan.*

### 0:08 · Repaso corto de TypeScript (7 min)

⌨️ En un archivo suelto (o el Playground de TypeScript), reescribir de memoria y en voz alta:
una `interface`, un campo opcional `?`, una unión de literales, y un objeto que no cumple el
contrato (leer el error).

🗣️ *Calentamiento de lo que más vamos a usar hoy: el contrato y sus errores. Si esto te sonó
lejano, la clase de TypeScript está grabada — hoy la usamos entera.*

---

# ⏱️ 0:15 · BLOQUE 2 — Por qué React (20 min)

### 0:15 · El problema que ya vivimos (7 min)

🖥️ **[DIAPO 3 · «Nuestro main.ts»]** — el diagrama del proyecto de fundamentos: 3 datos
(`productos`, `categoriaActiva`, `termino`) y las funciones `pintar…` que había que llamar a mano.

🗣️ *Este es el proyecto de fundamentos, dibujado. Tres datos, y un grupo de funciones que
pintan. ¿Cuál era la regla? Cada vez que cambia un dato, TÚ tienes que acordarte de llamar a
las funciones que repintan lo afectado. Si agregas al carrito y olvidas llamar a
`pintarCarrito`, la página miente: el dato cambió y la pantalla no.*

🗣️ *A pequeña escala se puede vivir así — ustedes lo lograron. Pero mira la tienda que queremos
construir: portada, carruseles, detalle, carrito, sesión… cada dato nuevo multiplica las
combinaciones de "qué repinto". Ese "acordarse" no escala. Ese es el problema, y lo vivieron:
no me lo tienen que creer.*

### 0:22 · Qué es React — y qué NO es (8 min)

🖥️ **[DIAPO 4 · «UI = f(datos)»]** — la fórmula, y debajo: "tú cambias el dato, React repinta".

🗣️ *React es una biblioteca que hace una sola cosa: tú describes cómo se ve la pantalla EN
FUNCIÓN de los datos, y cuando un dato cambia, React vuelve a ejecutar esa descripción y
actualiza lo que haya que actualizar. Se acabó el acordarse. La pantalla ya no puede mentir,
porque siempre se calcula desde los datos.*

🗣️ *Ojo con la palabra: describes. En fundamentos dábamos órdenes: busca este elemento,
bórralo, inserta este HTML. Eso se llama código **imperativo**. En React declaras el resultado:
"la pantalla es esto, dados estos datos", y él se encarga de las órdenes. Eso se llama
**declarativo**. Ya conoces la diferencia sin saberlo: un `for` que acumula es imperativo; un
`reduce` es declarativo. React es esa misma idea, aplicada a pintar.*

🖥️ **[DIAPO 5 · «Qué NO es React»]** — tres líneas: no es un framework de todo, no es un
lenguaje, no reemplaza lo aprendido.

🗣️ *React es una biblioteca, no un framework — un framework es un entorno que decide todo por
ti, como Spring en Java; una biblioteca es una pieza que hace una sola cosa. Y React no
reemplaza nada de lo que sabes: HTML, CSS, TypeScript, fetch, map, filter — todo eso se usa
dentro de React tal cual. El código lo escribimos nuevo; el conocimiento es el mismo.*

### 0:30 · Componente: la palabra del curso (5 min)

🖥️ **[DIAPO 6 · «Componente»]** — una tarjeta de producto señalada dentro de la página completa.

🗣️ *Una palabra nueva y es la palabra de las doce clases de este bloque: componente. Un
componente es un pedazo de interfaz con su propia lógica: la tarjeta de producto, el buscador,
el carrito. En React una página es un árbol de componentes, y cada componente es —
literalmente — una función que devuelve HTML. Hoy escribimos el primero — y si el reloj
acompaña, hoy mismo escribimos el segundo.*

---

# ⏱️ 0:35 · BLOQUE 3 — Vite: crear el proyecto (35 min)

### 0:35 · Qué es Vite y por qué lo necesitamos (5 min)

🖥️ **[DIAPO 7 · «Vite»]** — dos columnas: lo que armamos a mano en fundamentos / lo que Vite trae.

🗣️ *En la clase de TypeScript armamos a mano una línea de producción: `tsc --watch` traducía
TypeScript y Live Server servía la página. Funcionó, y ahora sabes exactamente qué hace cada
pieza. Vite es esa línea de producción, ya armada y mucho más rápida: un servidor de desarrollo
y un traductor, en un solo comando. Y trae plantillas: le dices "React + TypeScript" y te
entrega el proyecto con todo conectado.*

### 0:40 · Crear el proyecto, paso a paso (12 min)

⌨️ En mi terminal, parado donde guardo mis proyectos. La carpeta la crea el asistente — no hay
`mkdir`:

```bash
npm create vite@latest tienda-react
```

🗣️ *Comando nuevo — léelo por partes. `npm create vite` descarga y ejecuta el **asistente** de
Vite: un programa que hace preguntas y te arma el proyecto. Es primo del `npx` que ya usaste con
`tsc`: ejecutar algo sin instalarlo globalmente. `@latest` pide la versión más reciente del
asistente. Y `tienda-react` es el nombre de la carpeta que va a crear — proyecto nuevo, nombre
nuevo.*

🗣️ *Como el nombre ya va en el comando, hace dos preguntas. La primera, el framework: elijo
**React**. La segunda, la variante — y aquí con cuidado, apunten esto: la lista trae opciones
que NO queremos. Elige **"TypeScript" a secas**, la primera. No "TypeScript + React Compiler",
no "RSC", no "React Router v7" — esas instalan otras cosas y te sacan del curso. Si tu versión
pregunta algo más cuando lo repliques, acepta lo que propone con Enter.*

⌨️ Después, los tres comandos de siempre — y mientras `npm install` corre, seguir hablando:

```bash
cd tienda-react
npm install
npm run dev
```

🗣️ *`npm install` ya sabes qué hace y ya sabes que no se promete cuánto tarda. Cuando termina,
`npm run dev` da una dirección local — la abro. La página de bienvenida de la plantilla: los
logos, una imagen y un botón contador (el detalle cambia con cada versión). Si al replicarlo
ves esta página, tu proyecto de React existe. Y si algo se traba: la carpeta
`clase-01-instalado/` del repo es el proyecto de hoy ya terminado — `npm install`,
`npm run dev`, y sigues.*

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
  return <h1>Tienda Tec</h1>;
}
```

2. Borrar `src/App.css` y la carpeta `src/assets/`, y vaciar `src/index.css`.

🗣️ *La carpeta `public/` (el favicon) se queda; no molesta. Y el nombre de la tienda es
provisional — bautizarla es parte de tu tarea.*

---

# ⏱️ 1:10 · BLOQUE 4 — JSX: la función que devuelve HTML (20 min)

### 1:10 · Qué es JSX (5 min)

🖥️ **[DIAPO 8 · «JSX»]** — el `App.tsx` mínimo a la izquierda; a la derecha, el JavaScript al
que se traduce (`createElement`).

🗣️ *Esto que acabo de escribir no es JavaScript válido — una función no puede devolver una
etiqueta. Se llama JSX, y es la única pieza genuinamente nueva de hoy. Antes de que el navegador
lo vea, Vite lo traduce a llamadas de función normales. Es exactamente lo que ya viviste con
TypeScript: escribes en un lenguaje más cómodo, un traductor lo convierte, el navegador recibe
JavaScript de siempre. Por eso la extensión del archivo es `.tsx`: TypeScript + JSX.*

### 1:15 · Las reglas de JSX — por sus errores (12 min)

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
const tienda = 'Tienda Tec';
const productosEnCarrito = 3;

export default function App() {
  return (
    <>
      <h1>{tienda.toUpperCase()}</h1>
      <p>Tienes {productosEnCarrito} productos en el carrito</p>
      {/* así se comenta dentro de JSX */}
    </>
  );
}
```

### 1:27 · Qué aceptan las llaves (3 min)

🗣️ *Las llaves aceptan cualquier expresión: una variable, una cuenta —
`{producto.precio * 1.18}` para el IGV —, una llamada — `{tienda.toUpperCase()}` —, un template
literal, un `array.length`. Y también funcionan en los atributos: `src={producto.imagen}`. Lo
que NO aceptan es una instrucción: no puedes meter un `if` o un `for` ahí adentro — cómo se
resuelve eso es tema de la clase 3.*

---

# ⏱️ 1:30 · BLOQUE 5 — La primera pantalla (30 min)

### 1:30 · Tailwind entra al build (10 min)

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

### 1:40 · La tarjeta de producto (15 min)

🗣️ *La primera pantalla real: el encabezado de la tienda y una tarjeta de producto — la pieza
que en la plantilla de referencia se repite por decenas. Los datos, por ahora, escritos a mano;
el contrato que los ordena viene después del receso, y la API de verdad en la clase 7. Primero
la forma, después los datos.*

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
        <h1 className="text-3xl font-bold">Tienda Tec</h1>
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

### 1:55 · Stock e IGV, de una (5 min)

⌨️ Agregar a la tarjeta, en vivo:

```tsx
<p className="text-sm">{producto.stock} disponibles</p>
<p className="text-xs text-gray-500">S/ {(producto.precio * 1.18).toFixed(2)} con IGV</p>
```

🗣️ *El dato del objeto y una cuenta con `toFixed` — llaves puras. Y anota la incomodidad: esa
cuenta del IGV con sus decimales merece una función propia, con `Intl`, como en fundamentos.
Después del receso la tiene.*

---

# ☕ 2:00 · RECESO (15 min, aparte)

---

# ⏱️ 2:00 · BLOQUE 6 — El contrato, desde cero (35 min)

### 2:00 · La primera piedra (4 min)

🖥️ **[DIAPO 9 · «El contrato, desde cero»]** — `tipos.ts` como cimiento; encima, los archivos
que nacen hoy (`datos.ts`, `formato.ts`) y los que vendrán (`carrito` en la clase 4, `api` en
la clase 7).

🗣️ *Nuestra tarjeta usa un objeto suelto, sin contrato. En fundamentos aprendiste lo que pasa
con los objetos sin contrato: el `S/ NaN`, el `undefined` en la marca. La tienda nueva arranca
al revés: **primero el contrato**. Ahora nacen tres archivos — el contrato, un catálogo semilla
y el formateador de precios — y sobre ellos se construye todo el bloque: el carrito en la
clase 4, la API real en la clase 7.*

### 2:04 · `tipos.ts`: el contrato `Producto` (10 min)

⌨️ Nuevo archivo `src/tipos.ts`, escrito en vivo, campo por campo mirando la tarjeta:

```ts
// El contrato de datos de la tienda. Toda pieza que toque un producto, lo cumple.
export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  imagen: string;
  stock: number;
}
```

Y en `App.tsx`, tipar el objeto:

```tsx
import type { Producto } from './tipos';

const producto: Producto = {
  // el objeto de antes… y TypeScript pide lo que falte
};
```

🗣️ *Dos cosas. Primera: `interface Producto` — la escribes con los ojos cerrados desde la
clase de TypeScript; lo nuevo es que este contrato va a gobernar TODA la tienda, doce clases.
Mira cómo protesta ya: al objeto le falta el `id`. Segunda: una sintaxis nueva en el import —
`import type`. Importa **solo el tipo**, y como los tipos desaparecen al compilar, el traductor
borra esa línea entera del JavaScript final. La plantilla de Vite exige decirlo explícito; tu
proyecto de fundamentos no lo exigía, por eso nunca la habías necesitado.*

### 2:14 · Romperlo a propósito (5 min)

⌨️ Sabotear el producto dos veces, leyendo cada mensaje en voz alta: el precio como texto
(*Type 'string' is not assignable to type 'number'*), y un campo borrado (*Property 'id' is
missing…*). Restaurar.

🗣️ *Reconoce esos dos mensajes: son los errores más comunes al pasar datos en React, y los vas
a ver esta semana en tus tareas. TypeScript quejándose dentro de un `.tsx` es tu nuevo mejor
aliado.*

### 2:19 · `datos.ts` y `formato.ts`: el catálogo semilla (12 min)

⌨️ Nuevo archivo `src/datos.ts` — tres productos, con datos reales copiados de
dummyjson.com/products (preparados antes de la clase):

```ts
import type { Producto } from './tipos';

// Catálogo semilla: la tienda arranca con estos. La API real llega en la clase 7.
export const productos: Producto[] = [
  { id: 1, nombre: 'Audífonos inalámbricos', marca: 'TechSound', precio: 249.9, imagen: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png', stock: 12 },
  { id: 2, nombre: 'Laptop ultradelgada 14"', marca: 'Nova', precio: 3499, imagen: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png', stock: 5 },
  { id: 3, nombre: 'Reloj inteligente', marca: 'Clik', precio: 499.9, imagen: 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png', stock: 20 },
];
```

⌨️ Nuevo archivo `src/formato.ts` — la deuda del IGV, pagada:

```ts
// Un solo lugar para el formato de moneda (Intl, como en fundamentos).
const formato = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

export default function formatearPrecio(monto: number): string {
  return formato.format(monto);
}
```

⌨️ Y en `App.tsx`, conectar todo:

```tsx
import { productos } from './datos';
import formatearPrecio from './formato';

const producto: Producto = productos[0];

// en la tarjeta: {formatearPrecio(producto.precio)}
```

🗣️ *Tres archivos, tres responsabilidades — la disciplina de fundamentos, desde el primer día:
el contrato dice qué ES un producto, `datos.ts` los tiene (por ahora tres, escritos a mano —
la API de la clase 7 traerá docenas), y `formato.ts` es el único que sabe de soles. Fíjate que
el array declara su tipo: `Producto[]` — si un producto del catálogo viola el contrato, no
compila. Y el `export default` de `formato.ts`: una pieza, un export — lo viste en fundamentos.*

### 2:31 · El build de producción (4 min)

⌨️ Con todo compilando:

```bash
npm run build
```

🗣️ *Primero corre `tsc` — tu revisor, ahora solo revisa — y después Vite empaqueta todo en
`dist/`: HTML, CSS y JavaScript minificados — sin espacios ni nombres largos, para que pesen
menos. Esa carpeta se sube a producción en la clase 12, la última. Guarda esta idea:
`npm run build` sin errores es, desde hoy, tu criterio de entrega de todas las tareas.*

---

# ⏱️ 2:35 · BLOQUE 7+ · FLUJO — componentes y props, hasta las 3:50

> **De aquí en adelante es material de la clase 2, dictado de corrido.** Se avanza hasta las
> 3:50 y se corta donde toque — anotar el punto exacto: la clase 2 abre retomándolo. No hay
> apuro: cada pieza se dicta completa y bien.

### ~2:35 · El dolor primero: la segunda tarjeta (8 min)

⌨️ En mi pantalla: duplicar el `article` con `const producto2: Producto = productos[1]` y
cambiar `producto` por `producto2` en la copia.

🗣️ *Dos tarjetas, dos objetos, el mismo HTML dos veces. Funciona — y mira lo que acabo de
hacer: seleccionar, copiar, pegar, cambiar una palabra. Ocho líneas duplicadas para variar UN
dato. Si mañana cambio el diseño de la tarjeta, lo corrijo dos veces; con el catálogo completo,
treinta y ocho. Ese problema tiene solución con nombre propio, y es la mecánica central de
React.*

### ~2:43 · Extraer el componente (12 min)

⌨️ En el mismo `App.tsx`, crear la función encima de `App` y cortar el `article` adentro:

```tsx
function ProductCard() {
  return (
    <article className="w-64 rounded-xl border p-4">
      {/* …el JSX de la tarjeta, usando productos[0] por dentro… */}
    </article>
  );
}
```

Y en `App`, reemplazar los dos `article` por:

```tsx
<ProductCard />
<ProductCard />
```

🗣️ *Un componente nuevo: una función con nombre propio que devuelve JSX, usada **como
etiqueta**. Tú defines etiquetas nuevas — HTML propio de tu tienda. Pero mira el navegador: dos
tarjetas… y las dos muestran el MISMO producto, porque la función tiene `productos[0]` escrito
adentro. El componente se repite, pero todavía no sabe recibir datos distintos. Eso es lo
siguiente. Antes, dos reglas de nombre.*

### ~2:55 · PascalCase, o TypeScript te frena (6 min)

⌨️ Renombrar el uso a `<productCard />` (minúscula) y leer el error del editor: *Property
'productCard' does not exist on type 'JSX.IntrinsicElements'*.

🗣️ *La regla: los componentes van en **PascalCase** — como las clases de Java. No es estilo:
la primera letra decide. Minúscula = etiqueta HTML de las de siempre; mayúscula = componente
tuyo. Con minúscula, TypeScript lo busca en el catálogo de etiquetas HTML — eso es
`JSX.IntrinsicElements` — no lo encuentra, y te frena antes de que el navegador vea nada.*

### ~3:01 · Props: los argumentos del componente (10 min)

⌨️ En `App`:

```tsx
<ProductCard producto={productos[0]} />
<ProductCard producto={productos[1]} />
```

🗣️ *Si un componente es una función, tiene que poder recibir **argumentos**. En React se llaman
props, y se escriben como los atributos de HTML — solo que entre llaves puedes pasar cualquier
dato tuyo. `producto` es el nombre del prop — lo elijo yo — y entre llaves va el dato, un
objeto entero. React junta todos los props en un solo objeto y se lo entrega a la función como
primer parámetro.*

### ~3:11 · `interface Props` + desestructuración (12 min)

⌨️ En la función:

```tsx
interface Props {
  producto: Producto;
}

function ProductCard({ producto }: Props) {
  return (
    <article className="w-64 rounded-xl border p-4">
      <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square object-contain" />
      <p className="text-sm text-gray-500">{producto.marca}</p>
      <h2 className="font-semibold">{producto.nombre}</h2>
      <p className="mt-2">{formatearPrecio(producto.precio)}</p>
    </article>
  );
}
```

🗣️ *Tres cosas, todas conocidas. Uno: `interface Props` — el contrato del componente, igual
que `Producto` es el contrato del dato; vive junto al componente, no en `tipos.ts`. Dos:
`{ producto }` en el parámetro es la **desestructuración** de JavaScript moderno: en vez de
escribir `props.producto` cada vez, saco el campo de una. Tres: los `productos[0]` de adentro
se reemplazan por el prop. Ahora el navegador muestra dos productos distintos — la tarjeta se
escribe una vez y cada uso trae sus datos. Esta es la mecánica que sostiene TODO React.*

### ~3:23 · Un componente, un archivo (10 min)

⌨️ Mover `ProductCard` a `src/components/ProductCard.tsx` (carpeta nueva `components/`):

```tsx
import type { Producto } from '../tipos';
import formatearPrecio from '../formato';

interface Props {
  producto: Producto;
}

export default function ProductCard({ producto }: Props) {
  // …el mismo JSX…
}
```

Y en `App.tsx`: `import ProductCard from './components/ProductCard';`

🗣️ *Al moverlo se rompen dos imports — `Producto` y `formatearPrecio` — porque el componente
ya no ve las variables del archivo viejo. Bien: un componente debe declarar TODO lo que
necesita, entre sus imports y sus props. Regla del proyecto desde hoy: **un componente, un
archivo**, en `src/components/`. Y de paso: instala la extensión React Developer Tools
(Chrome/Edge — dejo el enlace en el chat); en su pestaña Components ves el árbol: `App` y
adentro los `ProductCard`. Va a ser tu radiografía todo el bloque.*

### ~3:33 · Props que faltan y errores del contrato (8 min)

⌨️ Dos roturas en vivo, leyendo los mensajes: pasar `producto={productos[0].nombre}` (*Type
'string' is not assignable to type 'Producto'*), y quitar el prop completo (*Property
'producto' is missing in type…*).

🗣️ *El contrato de props trabaja igual que el contrato de datos: lo obligatorio se exige, lo
equivocado se rechaza — en el editor, antes de que el navegador exista. Estos dos mensajes son
los errores de props más comunes; ya los conoces de antemano.*

### ~3:41 · La tercera tarjeta, y leer `App` (9 min)

⌨️ Agregar `<ProductCard producto={productos[2]} />` y leer `App.tsx` completo en voz alta.

🗣️ *Tres tarjetas, tres líneas — y un cambio de diseño se corrige en UN lugar. Compara con
dónde empezamos hace una hora: copiar ocho líneas por producto. Y lee `App`: ya no es un
archivo largo, es un **índice** — encabezado, tres tarjetas. Así se ve un proyecto de React de
verdad, y así se va a ver el nuestro de aquí a la clase 12.*

> **⏰ Punto de corte esperado.** Con ritmo normal, el reloj marca ~3:50 por aquí. Lo que sigue
> (props opcionales `?` y por defecto, el `Header` como componente, composición y "las props no
> se tocan") es el arranque de la clase 2 — si hoy sobró reloj, continuar; si no, anotar el
> corte y cerrar.

---

# ⏱️ 3:50 · CIERRE (25 min) — reserva dura, empieza a las 3:50 esté donde esté el flujo

### 3:50 · Resumen (4 min)

🖥️ **[DIAPO 10 · «Lo de hoy»]** — cinco líneas (más lo que el flujo haya alcanzado, dicho en
una frase):

1. React repinta por ti: **UI = f(datos)** — tú cambias el dato, él actualiza.
2. **Vite** = tu `tsc --watch` + Live Server, en una sola herramienta con plantillas.
3. **JSX**: funciones que devuelven HTML; una raíz, `className`, todo se cierra, datos entre `{}`.
4. La tienda nueva nace **con contrato**: `tipos.ts` gobierna; `datos.ts` y `formato.ts` obedecen.
5. Un **componente** es una función PascalCase que devuelve JSX — y recibe sus datos por
   **props** (hasta donde hayamos llegado hoy; el resto, la clase 2).

### 3:54 · Tareas (3 min) — criterio de entrega: `npm run build` sin errores + push

🖥️ **[DIAPO 11 · «5 tareas»]** — se leen tal cual; el detalle queda en el README de la clase.

🗣️ ***Fácil — replica la clase, hasta donde llegamos.** Tu proyecto con Vite + Tailwind, el
contrato, el catálogo semilla, el formateador, la tarjeta — y lo que hayamos avanzado de
componentes. Con la grabación al lado. Y bautiza tu tienda: el nombre es tuyo. Es LA tarea.*

🗣️ ***Intermedia 1 — la página completa.** Dale a `App` la estructura semántica que aprendiste
en HTML: `header` con el nombre de tu tienda y nav, `main` con las tarjetas, `footer`. Todo
JSX, todo con utilidades de Tailwind.*

🗣️ ***Intermedia 2 — la vitrina de tres.** Muestra tres productos distintos de tu catálogo. Si
hoy llegamos a `ProductCard`, úsalo tres veces; si no llegamos, copia el `article` tres veces y
escribe en un comentario qué problema le ves — lo resolvemos apenas abra la próxima clase.*

🗣️ ***Difícil 1 — el catálogo crece.** Amplía tu `datos.ts` a ocho productos con datos reales —
usa dummyjson.com/products en el navegador como fuente para copiar nombres, precios e imágenes.
Y súmale al contrato un campo opcional `descripcion?` (el `?` de TypeScript) usado en al menos
una tarjeta.*

🗣️ ***Difícil 2 — leer React de verdad.** Recupera el contador de la plantilla desde react.dev
("Quick Start"), hazlo funcionar en un archivo aparte, y comenta qué crees que hace ese
`useState` que aún no te enseño. Lo confirmamos cuando lleguemos a estado.*

### 3:57 · El push, demostrado + dudas (12 min)

⌨️ En mi pantalla, el cierre de trabajo completo — el mismo que harán ellos al terminar la
tarea fácil:

```bash
npm run build
git add . && git commit -m "feat: tienda nueva con Vite, contrato y primeras tarjetas" && git push
```

🗣️ *Este par de comandos cierra TODAS las tareas del bloque: build en cero, commit, push. Yo
reviso los repos entre clases — lo que suban es lo que veo. Y ahora sí: preguntas. Lo que quedó
picando de React, de Vite, de JSX — este es el espacio.*

Responder dudas del chat. Si no hay: repasar los errores típicos de la semana (import roto tras
la limpieza, campo faltante del contrato, `class` en vez de `className`) — son las tres
consultas que van a llegar igual.

### 4:09 · Lecturas y anticipo (6 min)

Lecturas (van también en el README):
- **es.react.dev** → "Describir la interfaz de usuario" (JSX completo) y "Tu primer componente".
- **vite.dev/guide** → "Why Vite" (ahora la entiendes: tú armaste esa línea a mano).
- **React Developer Tools** — instala la extensión si no lo hiciste al replicar.

🖥️ **[DIAPO 12 · «Lo que sigue»]** — el punto de corte anotado, y las piezas que vienen:
props opcionales, `Header` propio, composición.

🔮 **[ANTICIPO]**

🗣️ *La próxima clase abre EXACTAMENTE donde cortamos hoy — sin repaso largo: retomamos el
código y seguimos. Vienen las props opcionales con `?` — que ya sabes leer —, el encabezado
como componente propio, y la regla de oro de React: los datos bajan y las props no se tocan.
Trae las tareas hechas y el build en cero. Nos vemos.*

---

**Después de la clase** (regla 6 del MAPA): publicar el estado real dictado en `clase-01/` del
repositorio del curso, **anotar el punto de corte exacto** al inicio del guion de la clase 2,
y ajustar su apertura para retomar sin fricción.
