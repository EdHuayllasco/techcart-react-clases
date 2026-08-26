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
import { Checkout } from './pages/checkout';
export default function App(){
    const [productos, setProductos] = useState<Producto[]>([]);
    const [estado, setEstado] = useState<EstadoCarga>('cargando');
    const [esRespaldo, setEsRespaldo] = useState(false);
    const [intento, setIntento] = useState(0); // PALANCA DE INTENTOS
     
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
        <Route path='/checkout' 
        element={<Checkout carrito={carrito} total={totalPrecio} onVaciar={vaciarCarrito}/>}/>
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