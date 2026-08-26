import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";

export function useCart(){
    const contexto = useContext(CarritoContext);
    if(!contexto) throw new Error('useCart solo funciona dentro de <CarritoProvider>.');
    return contexto;
}