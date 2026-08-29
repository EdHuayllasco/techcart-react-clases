import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import type { EstadoCarga, Producto } from "../../dominio/tipos";
interface Props {
    productos : Producto[];
    esRespaldo : boolean;
    estado : EstadoCarga;
    onReintar : () => void;
}

const nombreTienda = 'tech-cart'

export default function Home({productos , esRespaldo, estado , onReintar} : Props) {
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [termino, setTermino] = useState('');

  const categorias = ['todas', 'laptops', 'audio', 'relojes'];
  const busqueda = termino.trim().toLocaleLowerCase();

  const visible = useMemo( () => productos.filter(
    (producto) => 
    (categoriaActiva === 'todas' || producto.categoria === categoriaActiva) && 
    (busqueda === '' || producto.nombre.toLocaleLowerCase().includes(busqueda) || 
    producto.marca.toLocaleLowerCase().includes(busqueda))
  ), [productos, categoriaActiva, busqueda]);

  useEffect(() => {
    document.title = `${nombreTienda} - ${visible.length} resultados`;
  }, [visible.length]);

  return( 
    <>
      {esRespaldo && (
        <p className="mb-4 rounded-lg border border-orange-300 bg-orange-50 p-2 text-sm">
          Mostrando el catalogo local - no pudimos conectar con la tienda.
          <button className="ml-2 underline" onClick={onReintar}>
            Reintentar
          </button>
        </p>
      )}
      <nav className="mb-4 flex gap-2" aria-label="Filtrar por categoria">
        {
          categorias.map((categoria) => (
            <button 
            key={categoria}
            onClick={() => setCategoriaActiva(categoria)}
            className={`rounded-full border px-3 py-1 text-sm ${categoria === categoriaActiva ? 'bg-black text-white' : ''}`}>
            {categoria}
            </button>
          ))
        }
      </nav>
      <input 
        type="search"
        placeholder="Buscar por nombre o marca..."
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        className="mb-4 w-64 rounded-lg border px-3 py-2 text-sm"
        aria-label="Buscar productos"
      />
      {visible.length === 0 && (
        <p className="text-gray-500">
          {busqueda !== '' ? `No encontramos productos para ${termino.trim()}` : 'No hay productos en esta categoria.'}
        </p>
      )}
      {estado === 'cargando' && (
        <section>
          {Array.from({length : 8}).map((_, indice) => (
            <SkeletonCard key={indice}/>
          ))}
        </section>
      )}
      {estado === 'error' && <p className="text-red-600">No pudimos cargar los productos</p>}
      {estado === 'listo' && (
        <section className="flex flex-wrap gap-4">
        {
          visible.map((p) => (
            <ProductCard key={p.id} producto={p}/>
          ))
        }
        </section>
      )}
    </>
  )
}