import type { Usuario } from "../dominio/tipos";
const BASE = 'https://dummyjson.com';
const MINUTOS_SESION = 30;
// usuario emilys
// contrasenia : emilypass
interface RespuestaLogin { 
    id : number;
    firstName? : string; 
    username : string;
    email :string;
    accessToken : string;
}

export async function iniciarSesion(usuario : string, clave : string) : Promise<Usuario>{
    const r = await fetch(`${BASE}/auth/login`, {
        method : 'POST',
        headers : { 'Content-Type' : 'application/json'},
        body: JSON.stringify({username : usuario, password: clave, expiresInMins : MINUTOS_SESION}),
    });
    if(!r.ok) throw new Error ('Usuario o contrasenia incorrectas.');
    const data  = (await r.json()) as RespuestaLogin;
    return {
        id : data.id,
        nombre : data.firstName || data.username,
        email : data.email,
        token: data.accessToken
    }
}