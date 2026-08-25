import { useState } from "react";
import Header from "../components/Header";
import PanelCarrito from "../components/Carrito";
import type { ItemCarrito } from "../tipos";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

interface Props{
    resumen : string;
    items : ItemCarrito[];
    onQuitar: (id: number) => void;
    onVaciar: () => void;
}
export default function Layout({resumen, items, onQuitar , onVaciar} : Props){
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    return(
        <main className="mx-auto max-w-5xl p-6">
            <Header nombre="Tienda Tech" eslogan="Ofertas de agosto" resumen={resumen}/>
            <button className="mb-4 text-sm" onClick={() => setCarritoAbierto(!carritoAbierto)}>
            {carritoAbierto ? 'Ocultar Carrito' : 'Ver carrito'}
            </button>
            {
                carritoAbierto  && <PanelCarrito items={items} onQuitar={onQuitar} onVaciar={onVaciar}/>
            }
            <Outlet/>
            <Footer/>
        </main>
    )
    
}