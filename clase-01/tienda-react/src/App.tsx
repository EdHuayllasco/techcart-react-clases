import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { productos } from "./datos"
import type { EstadoCarga } from "./tipos";
export default function App() {
  const estado : EstadoCarga = 'listo';
  return( 
    <main className="mx-auto max-w-5xl p-6">
      <Header nombre="Tienda Tech" eslogan="Ofertas de agosto"/>
      {/* {estado === 'cargando' ? <p className="text-gray-500">Cargando Catalogo...</p> : ''} */}
      {/* {estado === 'error' && <p className="text-red-600">No pudimos cargar los productos</p>} */}
      {estado === 'listo' && (
        <section className="flex flex-wrap gap-4">
        {
          productos.map((p) => (
            <ProductCard key={p.id} producto={p}/>
          ))
        }
      </section>
      )}
      <Footer/>
    </main>
  )
}
