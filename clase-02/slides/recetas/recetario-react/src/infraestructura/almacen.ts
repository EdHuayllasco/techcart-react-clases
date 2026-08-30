import type {  Usuario } from "../dominio/tipos";

const CLAVE_SESION = 'app_sesion';
export function leerSesion() : Usuario | null {
    try {
        const crudo : unknown = JSON.parse(localStorage.getItem(CLAVE_SESION) ?? 'null');
        if(
            typeof crudo === 'object' && crudo !== null && 
            typeof (crudo as Usuario).token === 'string' &&
            typeof (crudo as Usuario).expiraEn === 'number'
        ) {
            return crudo as Usuario;
        }
        return null;
    } catch {
        return null;
    }
}
export function guardarSesion(usuario : Usuario) {
    try{
        localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
    }catch (error) {
        console.warn('No se puede guardar la sesion: ', error instanceof Error ? error.message : error);
    }
}

export function borrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}