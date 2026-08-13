export interface Producto {
    id : number;
    nombre : string;
    marca : string;
    precio : number;
    imagen : string;
    stock : number;
}

export type EstadoCarga = 'cargando' | 'listo' | 'error';