import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import type { EstadoCarga, ItemCarrito, Producto } from './tipos';
import { agregarItems, quitarItem } from './carrito';
import { obtenerProductos } from './api';
import DetalleProducto from './pages/Detalle';
import NoEncontrada from './pages/NoEncontrada';
import Layout from './layout/layout';
import formatearPrecio from './formato';
const CLAVE_CARRITO = 'tienda_carrito';
export default function App(){
    const [productos, setProductos] = useState<Producto[]>([]);
    const [estado, setEstado] = useState<EstadoCarga>('cargando');
    const [esRespaldo, setEsRespaldo] = useState(false);
    const [intento, setIntento] = useState(0); // PALANCA DE INTENTOS
    const [carrito, setCarrito] = useState<ItemCarrito[]>(leerCarrito);
     
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
  return(
    <main className="mx-auto max-w-5xl p-6">
      <Routes>
        <Route element={
          <Layout 
            resumen={`🛒 ${unidades} productos - ${formatearPrecio(totalPrecio)}`}
            items={carrito}
            onQuitar={quitarDelCarrito}
            onVaciar={vaciarCarrito}
          />
        }>
        <Route path='/' element={
          <Home 
            productos={productos}
            esRespaldo={esRespaldo}
            estado={estado}
            onAgregar={agregarAlCarrito}
            onReintar={() => { setEstado('cargando'); setIntento(intento+1);}}
          />
        }/>
        <Route
        path='/producto/:id'
        element={
          <DetalleProducto productos={productos} onAgregar={agregarAlCarrito}/>
        }
        />
        </Route>
        <Route
          path='*'
          element={
            <NoEncontrada/>
          }
        />
      </Routes>
      
    </main>
  ) 
}