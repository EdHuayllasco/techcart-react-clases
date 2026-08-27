import type { ItemCarrito, Producto } from "../dominio/tipos";
export function agregarItems(items:ItemCarrito[], producto:Producto) : ItemCarrito[] {
    const existente = items.find((i) => i.id === producto.id);
    if(existente) {
        return items.map((i) => (
            i.id === producto.id ? {...i, cantidad: i.cantidad + 1} : i
        ))
    }
    return [...items, {
        id: producto.id,
        nombre : producto.nombre,
        precio : producto.precio,
        cantidad : 1
    }];
}

export function quitarItem(items : ItemCarrito[], id: number) : ItemCarrito[]{
    return items.filter((i) => i.id !== id);
}