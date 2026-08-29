import {Routes, Route} from 'react-router-dom';
import Home from './ui/pages/Home';
import { useEffect, useState, lazy, Suspense } from 'react';
import type { EstadoCarga, Producto } from './dominio/tipos';
import { obtenerProductos } from './infraestructura/api';
import DetalleProducto from './ui/pages/Detalle';
import NoEncontrada from './ui/pages/NoEncontrada';
import Layout from './ui/layout/layout';
import RutaProtegida from './ui/components/RutaProtegida';
const Checkout = lazy(() => import('./ui/pages/checkout'));
const Login = lazy(() => import('./ui/pages/Login'));
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
    <Suspense fallback={<p className='p-6 text-gray-500'>Cargando pagina...</p>}>
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
        <Route element={<RutaProtegida/>}>
          <Route path='/checkout' element={<Checkout/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NoEncontrada/>}/>
      </Route>
    </Routes>
    </Suspense>
  )
}
