import { useState } from "react";
import Header from "../components/Header";
import PanelCarrito from "../components/Carrito";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout(){
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    return(
        <main className="mx-auto max-w-5xl p-6">
            <Header nombre="Tienda Tech" eslogan="Ofertas de agosto"/>
            <button className="mb-4 text-sm" onClick={() => setCarritoAbierto(!carritoAbierto)}>
            {carritoAbierto ? 'Ocultar Carrito' : 'Ver carrito'}
            </button>
            {
                carritoAbierto  && <PanelCarrito/>
            }
            <Outlet/>
            <Footer/>
        </main>
    )
    
}