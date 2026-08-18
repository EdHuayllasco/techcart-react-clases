export interface Producto {
    id : number;
    nombre : string;
    marca : string;
    precio : number;
    imagen : string;
    stock : number;
    categoria : string;
}

export type EstadoCarga = 'cargando' | 'listo' | 'error';

export interface ItemCarrito {
    id: number;
    nombre : string;
    precio: number;
    cantidad: number; // 1 maximo sabe dios porque cuando es 0 no va a existir ese item carrito dentro del carro.
}