import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "../dominio/tipos";
import { agregarItems, quitarItem } from "../dominio/carrito";
import { leerCarrito, guardarCarrito } from "../infraestructura/almacen";

interface ValorCarrito {
    items : ItemCarrito[];
    unidades: number;
    total : number;
    agregar : (producto : Producto) => void;
    quitar : (id: number) => void;
    vacia : () => void;
}

export const CarritoContext = createContext<ValorCarrito | null>(null);
export function CarritoProvider({children} : {children:ReactNode}){
    const [items, setItems] = useState<ItemCarrito[]>(leerCarrito);
    useEffect(() => {
        guardarCarrito(items);
    },[items]);

    const unidades = items.reduce((suma, i) => suma + i.cantidad, 0);
    const total = items.reduce((suma, i) => suma + i.cantidad * i.precio, 0);
    function agregar(producto : Producto) { 
        setItems((actuales) => agregarItems(actuales, producto));
    }

    function quitar(id : number) {
        setItems((actuales) => quitarItem(actuales, id));
    }

    function vacia(){
        setItems([]);
    }
    return (
        <CarritoContext.Provider value={{items, unidades, total, agregar, quitar , vacia}}>
            {children}
        </CarritoContext.Provider>
    )
}