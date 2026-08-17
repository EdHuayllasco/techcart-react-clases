# Ejercicios de práctica · Temas 7 a 12

Cinco ejercicios sobre tu tienda: cuatro intermedios y uno difícil. Cubren los temas de la
segunda mitad del bloque (API y manejo de errores, Router, formularios, Context y custom
hooks, JWT, optimización y despliegue). Hazlos conforme el curso avance: cada uno indica qué
necesitas haber visto en clase antes de intentarlo.

**Criterio de entrega, el de siempre:** `npm run build` sin errores, commit y push. Los
ejercicios se revisan en tu repositorio y cuentan para el componente de proceso de la nota.

---

## Ejercicio 1 (intermedio) · El producto del día

**Necesitas haber visto:** consumo de API, estados de carga y manejo de errores.

**Contexto.** Las tiendas grandes destacan un producto distinto cada vez que entras. Vas a
construir esa sección, y de paso practicar el ciclo completo de una petición: pedir, esperar,
fallar con dignidad y cancelar a tiempo.

**Lo que debes construir:**

1. Una sección "Producto del día" en la parte superior del catálogo.
2. Al montar, pide UN producto a la API: `https://dummyjson.com/products/{id}`, con un id al
   azar entre 1 y 30 (`Math.floor(Math.random() * 30) + 1`).
3. El dato crudo pasa por tu adaptador `mapearProducto` (amplíalo si este endpoint trae campos
   con otra forma) y se muestra en una tarjeta destacada, más grande que las normales.
4. Los tres estados, honestos: mientras carga, un esqueleto o texto de carga; si falla, un
   mensaje claro con botón "Intentar con otro producto" que vuelve a pedir (recuerda la
   palanca: un estado numérico como dependencia del efecto); si llega, la tarjeta.
5. La petición debe ser cancelable con `AbortController`, y la cancelación no debe disparar
   la pantalla de error.

**Criterios de aceptación:**

- [ ] Recargar varias veces muestra productos distintos.
- [ ] Con DevTools en Offline, la sección muestra su error con el botón de reintento, y el
      resto de la tienda sigue funcionando.
- [ ] En la pestaña Network no quedan peticiones duplicadas por StrictMode (la limpieza
      cancela la primera).
- [ ] Ningún `catch` silencioso: si algo falla, hay `console.warn` con contexto o mensaje en
      pantalla.

**Pistas:** el efecto necesita su función `async` interna; el `AbortError` se reconoce con
`instanceof DOMException` y el nombre `AbortError`; el id aleatorio puede vivir en un estado
para que el botón de reintento pida uno nuevo.

---

## Ejercicio 2 (intermedio) · La página de categoría

**Necesitas haber visto:** React Router (rutas dinámicas, `useParams`, 404).

**Contexto.** Hoy tus filtros viven en un estado que muere al recargar y no se puede
compartir. Una URL propia por categoría convierte cada filtro en un enlace: se comparte, se
guarda en favoritos y sobrevive al F5.

**Lo que debes construir:**

1. Una ruta `/categoria/:nombre` que muestre solo los productos de esa categoría, con un
   título propio ("Laptops", "Audio", según corresponda).
2. Los botones o enlaces de categoría de tu tienda navegan a esa ruta (con `Link`, no con
   `window.location`).
3. Si la categoría no existe en tu catálogo (`/categoria/zapatos`), se muestra tu página de
   "no encontrado", no una pantalla vacía.
4. El título de la pestaña (`document.title`) refleja la categoría activa.
5. Un enlace visible para volver al catálogo completo.

**Criterios de aceptación:**

- [ ] Pegar `tu-tienda.vercel.app/categoria/laptops` directo en el navegador funciona (y
      sobrevive al F5 en producción).
- [ ] Una categoría inexistente muestra tu 404 propia.
- [ ] Navegar entre categorías no recarga la página (verifícalo en la pestaña Network).

**Pistas:** `useParams` devuelve strings; compara en minúsculas para que `/categoria/Laptops`
y `/categoria/laptops` se comporten igual; la lista de categorías válidas ya la puedes derivar
de tus productos.

---

## Ejercicio 3 (intermedio) · Las reseñas del producto

**Necesitas haber visto:** formularios controlados y validación por campo.

**Contexto.** Un formulario real no es el checkout de la clase: es uno que TÚ diseñas, con
sus propias reglas. Las reseñas son perfectas para eso, y de paso repasan persistencia y
listas.

**Lo que debes construir:**

1. En la página de detalle de un producto, un formulario de reseña con tres campos: nombre
   (mínimo 3 caracteres), puntaje (1 a 5) y comentario (mínimo 10, máximo 200 caracteres).
2. Formulario controlado: cada campo con `value` y `onChange`, y su estado en un solo objeto.
3. Validación por campo con mensajes junto a cada input; los mensajes aparecen recién cuando
   el campo fue tocado o al intentar enviar; el botón de enviar se deshabilita si hay errores.
4. Al enviar, la reseña se guarda en `localStorage` bajo una clave POR PRODUCTO (por ejemplo
   `resenas_15`), se limpia el formulario y la reseña aparece en la lista de abajo.
5. La lista de reseñas del producto se muestra debajo del formulario, con su estado vacío
   ("Este producto aún no tiene reseñas").

**Criterios de aceptación:**

- [ ] Es imposible enviar una reseña inválida, y el usuario siempre sabe qué le falta.
- [ ] Las reseñas de un producto no aparecen en otro.
- [ ] Recargar la página conserva las reseñas (lectura con aduana: si lo guardado no es un
      array, lista vacía y no una pantalla rota).
- [ ] Cada input tiene su `label` y el formulario se puede completar solo con teclado.

**Pistas:** la interface `Resena` va en tu `tipos.ts`; el objeto de errores es un derivado
que se calcula en el render, no un estado; para el puntaje, un `select` también es un input
controlado.

---

## Ejercicio 4 (intermedio) · Modo oscuro global

**Necesitas haber visto:** Context API, estado global y custom hooks.

**Contexto.** Context no es solo para el carrito. Cualquier dato que muchas piezas lejanas
necesitan (el tema visual, el idioma, la sesión) es candidato. El modo oscuro es el ejemplo
clásico, y te obliga a montar el patrón completo sin copiar el de la clase.

**Lo que debes construir:**

1. Un `TemaContext` con dos cosas: el tema actual (`'claro' | 'oscuro'`, una unión en tu
   `tipos.ts`) y una función para alternarlo.
2. Su `TemaProvider` envolviendo la aplicación, con el tema persistido en `localStorage`
   (guardar al cambiar, leer al arrancar con su aduana).
3. Un custom hook `useTema()` que consuma el contexto y lance un error claro si se usa fuera
   del provider.
4. Un botón en el encabezado que alterna el tema desde `useTema()`, sin recibir nada por
   props.
5. El tema aplicado de verdad: como mínimo, fondo y texto de la página cambian (clases
   condicionales de Tailwind en el contenedor raíz; los componentes hijos pueden leer el tema
   con el hook donde lo necesiten).

**Criterios de aceptación:**

- [ ] El botón del encabezado cambia el tema sin que `App` le pase ninguna prop.
- [ ] El tema elegido sobrevive al F5.
- [ ] Usar `useTema()` fuera del provider lanza un error con mensaje útil (pruébalo y luego
      déjalo bien).
- [ ] El carrito y los filtros siguen funcionando igual: los dos contextos conviven.

**Pistas:** es el mismo esqueleto que el contexto del carrito de la clase, con otro dominio;
el valor del provider puede tiparse con una interface `TemaContextValue`; para alternar,
la forma funcional con un ternario.

---

## Ejercicio 5 (difícil) · El área privada completa

**Necesitas haber visto:** JWT, sesión, rutas protegidas, variables de entorno. La parte
final usa optimización y despliegue.

**Contexto.** Este ejercicio integra la recta final del curso en una sola pieza: una cuenta
de usuario real, con login contra la API, área privada y sesión que expira. Es el ejercicio
más cercano a lo que te va a pedir el proyecto final.

**Lo que debes construir:**

1. Una página `/login` con formulario controlado (usuario y contraseña) que autentica contra
   `POST /auth/login` de DummyJSON (credenciales de prueba: `emilys` / `emilyspass`). El error
   de credenciales se muestra al usuario, no solo en la consola.
2. Un `AuthContext` + `useAuth()` con: el usuario actual, `login`, `logout`, y la sesión
   persistida en `localStorage` con **expiración** (guarda el momento de expiración; si al
   arrancar ya venció, la sesión se descarta).
3. Una página protegida `/mi-cuenta` que muestra los datos del usuario pidiéndolos a
   `GET /auth/me` con el token en la cabecera (`Authorization: Bearer ...`). Si el servidor
   responde 401, la sesión se cierra sola.
4. Un componente `RutaProtegida`: sin sesión, redirige a `/login` recordando a dónde ibas, y
   después del login te devuelve ahí.
5. La URL base de la API sale de una variable de entorno (`VITE_API_URL` en `.env`), con su
   `.env.example` en el repo y el `.env` real fuera de git.
6. Remate de producción: la página `/mi-cuenta` se carga con `lazy` (verifica el chunk
   separado en el build) y todo el flujo funciona en tu deploy de Vercel, incluido recargar
   la página protegida.

**Criterios de aceptación:**

- [ ] Entrar a `/mi-cuenta` sin sesión redirige a `/login`, y tras autenticarse vuelve a
      `/mi-cuenta` solo.
- [ ] El token viaja en la cabecera (verifícalo en la pestaña Network) y nunca está escrito
      en el código.
- [ ] Cerrar sesión limpia todo; recargar con sesión vigente la conserva; recargar con sesión
      vencida la descarta.
- [ ] Credenciales incorrectas muestran un mensaje útil en el formulario.
- [ ] `npm run build` muestra el chunk separado de la página privada, y el flujo completo
      funciona en producción.

**Pistas:** la expiración es un número (`Date.now() + minutos * 60 * 1000`) guardado junto al
usuario; la aduana de la sesión comprueba también que ese número exista y no haya pasado; el
`AbortError` y el 401 son casos distintos en el efecto que pide `/auth/me`; `lazy` necesita su
`Suspense` con un mensaje de carga.
