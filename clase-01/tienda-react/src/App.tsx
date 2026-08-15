import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { productos } from "./datos"
import type { ItemCarrito, Producto, EstadoCarga } from "./tipos";
import { agregarItems, quitarItem } from "./carrito";
import formatearPrecio from "./formato";

export default function App() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  function agregarAlCarrito(producto : Producto) { 
  setCarrito(agregarItems(carrito, producto));
  }
  const unidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
  const totalPrecio = carrito.reduce((suma, i) => suma + i.cantidad * i.precio, 0);
  const estado : EstadoCarga = 'listo';
  return( 
    <main className="mx-auto max-w-5xl p-6">
      <Header nombre="Tienda Tech" eslogan="Ofertas de agosto" 
      resumen={`🛒 ${unidades} productos - ${formatearPrecio(totalPrecio)}`}/>
      <section className="mb-6 rounded-xl borde p-4">
        <h2 className="font-semibold">Tu carrito</h2>
        {carrito.length === 0 && <p className="text-sm text-gray-500">Tu carrito esta vacio.</p>}
        <ul>
          {
            carrito.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-1 text-sm">
                <span>{item.nombre} x {item.cantidad}</span>
                <button onClick={
                  ()=> setCarrito(quitarItem(carrito, item.id))
                } aria-label="Quitar del carrito">X</button>
              </li>
            ))
          }
        </ul>
      </section>
      {/* {estado === 'cargando' ? <p className="text-gray-500">Cargando Catalogo...</p> : ''} */}
      {/* {estado === 'error' && <p className="text-red-600">No pudimos cargar los productos</p>} */}
      {estado === 'listo' && (
        <section className="flex flex-wrap gap-4">
        {
          productos.map((p) => (
            <ProductCard key={p.id} producto={p} onAgregar={agregarAlCarrito}/>
          ))
        }
        </section>
      )}
      <Footer/>
    </main>
  )
}