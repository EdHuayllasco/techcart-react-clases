import type { Pedido } from "../dominio/tipos";

const CLAVE_PEDIDOS = 'tienda_pedidos';
export function leerPedidos() : Pedido[] {
    try {
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS) ?? '[]');
        return Array.isArray(crudo) ? (crudo as Pedido[]) : [];
    }catch{
        return [];
    }
}

export function guardarPedido(pedido : Pedido) {
    try {
        localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify([...leerPedidos(), pedido]));
    } catch(error) {
        console.warn('No se puede guardar el pedido: ', error instanceof Error ? error.message : error);
    }
}
