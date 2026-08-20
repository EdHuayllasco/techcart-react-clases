import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import type { ItemCarrito, Producto, EstadoCarga } from "../tipos";
import { agregarItems, quitarItem } from "../carrito";
import formatearPrecio from "../formato";
import PanelCarrito from "../components/Carrito";
import { obtenerProductos } from "../api";
import SkeletonCard from "../components/SkeletonCard";

const CLAVE_CARRITO = 'tienda_carrito';
const nombreTienda = 'tech-cart'
export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [estado, setEstado] = useState<EstadoCarga>('cargando');
  const [esRespaldo, setEsRespaldo] = useState(false);
  const [intento, setIntento] = useState(0); // PALANCA DE INTENTOS
  const [carrito, setCarrito] = useState<ItemCarrito[]>(leerCarrito); 
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [termino, setTermino] = useState('');

  useEffect(() => {
    const controlador = new AbortController();
    async function cargar(){
      try {
        const resultado = await obtenerProductos(controlador.signal); // htpp 200
        setProductos(resultado.productos);
        setEsRespaldo(resultado.esRespaldo);
        setEstado('listo');
      } catch (error) {
        if(error instanceof DOMException && error.name === 'AbortErrror') return;
        console.warn('Fallo imprevisto al cargar: ', error instanceof Error ? error.message : error);
        setEstado('error');
      }
    }
    cargar();
    return () => controlador.abort();
  }, [intento]);
  useEffect(() => {
    try{
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    }catch (error) {
      console.warn('No se pudo guardar el carrito', error instanceof Error ? error.message : error);
    }
  },[carrito]);
  function leerCarrito() : ItemCarrito[] {
    try{
      const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]');
      return Array.isArray(crudo) ? (crudo as ItemCarrito[]) : [];
    }catch{
      return []
    }
  }
  function agregarAlCarrito(producto : Producto) { 
  setCarrito(agregarItems(carrito, producto));
  }
  function quitarDelCarrito(id : number) {
    setCarrito(quitarItem(carrito, id));
  }
  function vaciarCarrito(){
    setCarrito([]);
  }
  const unidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
  const totalPrecio = carrito.reduce((suma, i) => suma + i.cantidad * i.precio, 0);
  const categorias = ['todas', 'laptops', 'audio', 'relojes'];
  const busqueda = termino.trim().toLocaleLowerCase();
  const visible = productos.filter(
    (producto) => 
    (categoriaActiva === 'todas' || producto.categoria === categoriaActiva) && 
    (busqueda === '' || producto.nombre.toLocaleLowerCase().includes(busqueda) || 
    producto.marca.toLocaleLowerCase().includes(busqueda))
  );
  useEffect(() => {
    document.title = `${nombreTienda} - ${visible.length} resultados`;
  }, [visible.length]);
  return( 
    <main className="mx-auto max-w-5xl p-6">
      <Header nombre="Tienda Tech" eslogan="Ofertas de agosto" 
      resumen={`🛒 ${unidades} productos - ${formatearPrecio(totalPrecio)}`}/>
      {esRespaldo && (
        <p className="mb-4 rounded-lg border border-orange-300 bg-orange-50 p-2 text-sm">
          Mostrando el catalogo local - no pudimos conectar con la tienda.
          <button className="ml-2 underline" onClick={() => { setEstado('cargando'); setIntento(intento+1)}}>
            Reintentar
          </button>
        </p>
      )}
      <button className="mb-4 text-sm" onClick={() => setCarritoAbierto(!carritoAbierto)}>
        {carritoAbierto ? 'Ocultar Carrito' : 'Ver carrito'}
      </button>
      {
        carritoAbierto  && <PanelCarrito items={carrito} onQuitar={quitarDelCarrito} onVaciar={vaciarCarrito}/>
      }
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
            <ProductCard key={p.id} producto={p} onAgregar={agregarAlCarrito}/>
          ))
        }
        </section>
      )}
      <Footer/>
    </main>
  )
}