import formatearPrecio from "../formato";
import type { Producto } from "../tipos";

interface Props{
  producto: Producto;
}

export default function ProductCard( {producto} : Props){
  return(
    <article className="w-64 rounded-xl border p-4">
      <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square object-contain"/>
      <p className="text-sm text-gray-500">{producto.marca}</p>
      <h2 className="font-semibold">{producto.nombre}</h2>
      <p className="text-sm">{producto.stock} disponibles</p>
      <p className="mt-2">{formatearPrecio((producto.precio * 1.18))} con IGV</p>
    </article>
  )
}