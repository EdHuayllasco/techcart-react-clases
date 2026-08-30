export interface Receta {
    id: number;
    nombre: string;
    imagen : string;
    cocina : string;
    dificultad: string;
    minutos: number;
    ingredientes : string[];
}

export type EstadoCarga = 'cargando' | 'listo' | 'error';

export interface Usuario { 
    id: number; 
    nombre : string;
    email : string;
    token : string; 
    expiraEn : number; 
}


export interface DatosRegistro {
    nombre : string;
    email: string;
    usuario : string;
    clave : string;
}