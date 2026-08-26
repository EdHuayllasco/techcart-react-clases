import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import type { EstadoCarga, Producto } from './tipos';
import { obtenerProductos } from './api';
import DetalleProducto from './pages/Detalle';
import NoEncontrada from './pages/NoEncontrada';
import Layout from './layout/layout';
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
            if(error instanceof DOMException && error.name === 'AbortError') return;
            console.warn('Fallo imprevisto al cargar: ', error instanceof Error ? error.message : error);
            setEstado('error');
          }
        }
        cargar();
        return () => controlador.abort();
    }, [intento]);
  
  return(
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={
          <Home
            productos={productos}
            esRespaldo={esRespaldo}
            estado={estado}
            onReintar={() => { setEstado('cargando'); setIntento(intento+1);}}
          />
        }/>
        <Route path='/producto/:id' element={<DetalleProducto productos={productos}/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='*' element={<NoEncontrada/>}/>
      </Route>
    </Routes>
  )
}
