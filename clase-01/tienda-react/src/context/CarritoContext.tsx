import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ItemCarrito, Producto } from "../tipos";
import { agregarItems, quitarItem } from "../carrito";
const CLAVE_CARRITO = 'tienda_carrito';
interface ValorCarrito {
    items : ItemCarrito[];
    unidades: number;
    total : number;
    agregar : (producto : Producto) => void;
    quitar : (id: number) => void;
    vacia : () => void;
}
function leerCarrito() : ItemCarrito[] {
      try{
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]');
        return Array.isArray(crudo) ? (crudo as ItemCarrito[]) : [];
      }catch{
        return []
      }
}
export const CarritoContext = createContext<ValorCarrito | null>(null);
export function CarritoProvider({children} : {children:ReactNode}){
    const [items, setItems] = useState<ItemCarrito[]>(leerCarrito);
    useEffect(() => {
        try{
          localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
        }catch (error) {
          console.warn('No se pudo guardar el carrito', error instanceof Error ? error.message : error);
        }
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