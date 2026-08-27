import { useContext } from "react";
import { SesionContext } from "./SesionContext";

export function useSesion(){
    const contexto = useContext(SesionContext);
    if(!contexto) throw new Error('useSesion solo funciona dentro de <SesionProvider>.');
    return contexto;
}