import { useState, type FormEvent } from "react";
import { useSesion } from "../../aplicacion/useSesion";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const {entrar} = useSesion();
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);
    async function manejarEnvio(e : FormEvent) {
        e.preventDefault();
        setError('');
        setEnviando(true);
        try {
            await entrar(usuario, clave);
            navegar('/');
        } catch (fallo) {
            setError(fallo instanceof Error ? fallo.message : 'No se puede iniciar sesion');
        } finally {
            setEnviando(false);
        }
    }
    return (
        <form onSubmit={manejarEnvio} className="mx-auto flex max-w-sm flex-col gap-3">
            <h1 className="text-2xl font-bold">Inicia Sesion</h1>
            <label className="flex flex-col text-sm">
                Usuario
                <input className="rounded border px-3 py-2" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
            </label>
            <label className="flex flex-col text-sm">
                Contrasena
                <input type="password" className="rounded border px-3 py-2" value={clave} onChange={(e) => setClave(e.target.value)} />
            </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={enviando} type="submit" className="rounded-full border px-4  py-2">
        {enviando ? 'Entrando...' : 'Entrar'}
        </button>
        </form>
    )
}