import { productos } from "./datos"
import formatearPrecio from "./formato"
import type { Producto } from "./tipos"

const producto: Producto = productos[0];
export default function App() {
  return( 
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tienda Tech</h1>
        <p>🛒 0 productos</p>
      </header>
      <article className="w-64 rounded-xl border p-4">
        <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square object-contain"/>
        <p className="text-sm text-gray-500">{producto.marca}</p>
        <h2 className="font-semibold">{producto.nombre}</h2>
        <p className="text-sm">{producto.stock} disponibles</p>
        <p className="mt-2">{formatearPrecio((producto.precio * 1.18))} con IGV</p>
      </article>
    </main>
  )
}
