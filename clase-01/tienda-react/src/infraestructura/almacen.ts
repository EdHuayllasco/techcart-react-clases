import type { ItemCarrito } from "../dominio/tipos";

const CLAVE_CARRITO = 'tienda_carrito';

export function leerCarrito() : ItemCarrito[] {
      try{
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_CARRITO) ?? '[]');
        return Array.isArray(crudo) ? (crudo as ItemCarrito[]) : [];
      }catch{
        return []
      }
}
export function guardarCarrito(items : ItemCarrito[]) {
    try{
          localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
    }catch (error) {
        console.warn('No se pudo guardar el carrito', error instanceof Error ? error.message : error);
    }
}