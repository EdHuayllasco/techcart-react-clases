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

export interface DatosEnvio{
    nombre : string;
    email : string; 
    direccion : string; 
    telefono : string;
}
export interface Pedido { 
    id: number;
    fecha : string;
    cliente : DatosEnvio;
    items : ItemCarrito[];
    total : number 
}

export interface Usuario {
    id : number;
    nombre : string;
    email : string;
    token : string;
}