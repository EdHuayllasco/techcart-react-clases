import formatearPrecio from "../formato";
import type { Producto } from "../tipos";
import EtiquetaStock from "./EtiquetaStock";

interface Props{
  producto: Producto;
  onAgregar: (producto : Producto) => void
}

export default function ProductCard( {producto, onAgregar} : Props){
  const agotado = producto.stock === 0; //true/false
  return(
    <article className={`w-64 rounded-xl border p-4 ${agotado ? 'opacity-50' : ''}`}>
      <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square object-contain"/>
      <p className="text-sm text-gray-500">{producto.marca}</p>
      <h2 className="font-semibold">{producto.nombre}</h2>
      <EtiquetaStock stock={producto.stock}/>
      <p className="mt-2">{formatearPrecio((producto.precio * 1.18))} con IGV</p>
      <button className="mt-3 rounded-full border px-4 py-1 text-sm" 
      onClick={() => onAgregar(producto)}
      disabled={producto.stock===0}
      >
        {producto.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
      </button>
    </article>
  )
}