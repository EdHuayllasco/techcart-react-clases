import { useState, type ChangeEvent, type FormEvent } from "react"
import type { DatosRegistro } from "../../dominio/tipos"
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../../infraestructura/auth";
type CampoTocado = keyof DatosRegistro | 'confirmar';

export default function Registro(){
    const navegar = useNavigate();
    const [form, setForm] = useState<DatosRegistro>({nombre : '', email:'', usuario:'', clave:''})
    const [confirmar, setConfirmar] = useState('');
    const [tocados, setTocados] = useState<Partial<Record<CampoTocado, boolean>>>({});
    const cambiar  = (campo : keyof DatosRegistro) => (e: ChangeEvent<HTMLInputElement>) => 
        setForm((f) => ({...f , [campo] : e.target.value}));
    const marcar = (campo : CampoTocado) => () => setTocados((tocado) => ({...tocado, [campo] : true}));
    async function enviar (e: FormEvent) {
        e.preventDefault();
        setTocados({nombre : true, email : true, usuario : true , clave: true, confirmar : true});
        try {
            const creado = await registrarUsuario(form);
            navegar('/login', {state : {mensaje : `Cuenta creada con el id ${creado.id}. Ahora inicia Sesion.`}})
        } catch(error){
            throw new Error('No se pudo crear la cuenta');
        } finally{
            
        }
    }
    return (
        <form onSubmit={enviar} className="mx-auto flex max-w-sm flex-col gap-3">
            <h1 className="text-2xl font-bold">Crear cuenta</h1>
            <label className="flex flex-col text-sm">
                Nombre
                <input className="rounded border px-3 py-2" value={form.nombre} onChange={cambiar('nombre')} onBlur={marcar('nombre')}/>
            </label>
            <label className="flex flex-col text-sm">
                Correo electronico
                <input className="rounded border px-3 py-2" value={form.email} onChange={cambiar('email')} onBlur={marcar('email')}/>
            </label>
            <label className="flex flex-col text-sm">
                Usuario
                <input className="rounded border px-3 py-2" value={form.usuario} onChange={cambiar('usuario')} onBlur={marcar('usuario')}/>
            </label>
            <label className="flex flex-col text-sm">
                Clave
                <input type="password" className="rounded border px-3 py-2" value={form.clave} onChange={cambiar('clave')} onBlur={marcar('clave')}/>
            </label>
            <label className="flex flex-col text-sm">
                Confirmar Clave
                <input type="password" className="rounded border px-3 py-2" value={confirmar} onChange={
                    (e) => setConfirmar(e.target.value)
                } onBlur={marcar('confirmar')}/>
            </label>
            <button type="submit" className="rounded-full border px-4 py-2">
                Crear cuenta
            </button>
            <p className="text-sm text-gray-500">
                Ya tienes cuenta ? <Link to="/login" className="underline">Inicia Sesion</Link>
            </p>
        </form>
    )
}