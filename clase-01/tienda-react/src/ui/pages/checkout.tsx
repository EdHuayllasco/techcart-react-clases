import { Link } from "react-router-dom";
import type { DatosEnvio } from "../../dominio/tipos";
import { useCart } from "../../aplicacion/useCart";
import { useState, type ChangeEvent, type FormEvent } from "react";
import formatearPrecio from "../../ui/formato";
import { guardarPedido } from "../../infraestructura/pedidos";


type Errores = Partial<Record<keyof DatosEnvio, string>>;
function validar(form : DatosEnvio) : Errores {
    const errores : Errores = {};
    if(form.nombre.trim().length < 3) errores.nombre = 'Escribe almenos 3 caracteres para el nombre';
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) errores.email = 'Escribe un correo valido';
    if(form.direccion.trim().length < 5 ) errores.direccion = 'Escribe una direccion mas completa';
    if(!/^\+?[1-9]\d{1,14}$/.test(form.telefono)) errores.telefono  = 'Escribe almenos 7 digitos';
    return errores;
}
export default function Checkout() {
    const { items: carrito, total, vacia } = useCart();
    const [form, setForm] = useState<DatosEnvio>({nombre: '', email:'', direccion:'', telefono:''});
    const [tocados, setTocados] = useState<Partial<Record<keyof DatosEnvio, boolean>>>({});
    const [numeroPedido, setNumeroPedido] = useState(0);
    const errores = validar(form);
    const hayErrores = Object.keys(errores).length > 0;
    const cambiar = (campo : keyof DatosEnvio) => 
        (e: ChangeEvent<HTMLInputElement>) => setForm((form) => ({...form, [campo] : e.target.value}));
    const marcar = (campo : keyof DatosEnvio) => () => setTocados((tocado) => ({...tocado, [campo] : true}));
    function enviar (e : FormEvent) {
        e.preventDefault();
        setTocados({nombre: true, email: true, direccion:true, telefono:true});
        if(hayErrores) return;
        const pedido = {
            id: Date.now(),
            fecha: new Date().toISOString(),
            cliente: form,
            items: carrito,
            total
        };
        guardarPedido(pedido);
        setNumeroPedido(pedido.id);
        vacia()
    }
    if(numeroPedido !== 0){
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Gracias por tu compra!</h1>
                <p className="mt-2 text-sm text-gray-500">Tu pedido Nro {numeroPedido} quedo registrado.</p>
                <Link to="/" className="underline">Volver al catalogo</Link>
            </div>
        )
    }
    if(carrito.length === 0) {
        return (
            <div className="p-6">
                <p className="text-gray-500"> Tu carrito esta vacio: no hay nada que pagar</p>
                <Link to="/" className="underline">Volver al catalogo</Link>
            </div>
        )
    }
    return(
        <form onSubmit={enviar} className="flex max-w flex-col gap-3">
            <h1 className="text-2xl font-bold">Datos de envio</h1>
            <label className="flex flex-col text-sm">
               nombre Completo
               <input 
                    className="rounded border px-3 py-2" 
                    value={form.nombre} 
                    onChange={cambiar('nombre')} // guarda el valor de el campo
                    onBlur={marcar('nombre')}/>
                {
                    tocados.nombre && errores.nombre && (
                        <span className="text-xs text-red-600">{errores.nombre}</span>
                    ) 
                }
            </label>
            <label className="flex flex-col text-sm">
                Correo electronico
                <input className="rounded border px-3 py-2"
                value={form.email}
                onChange={cambiar('email')}
                onBlur={marcar('email')} />
                {
                    tocados.email && errores.email && (
                        <span className="text-xs text-red-600">{errores.email}</span>
                    )
                }
            </label>
            <label className="flex flex-col text-sm">
                Direccion de entrega
                <input className="rounded border px-3 py-2"
                value={form.direccion}
                onChange={cambiar('direccion')}
                onBlur={marcar('direccion')} />
                {
                    tocados.direccion && errores.direccion && (
                        <span className="text-xs text-red-600">{errores.direccion}</span>
                    )
                }
            </label>
            <label className="flex flex-col text-sm">
                Telefono
                <input className="rounded border px-3 py-2"
                value={form.telefono}
                onChange={cambiar('telefono')}
                onBlur={marcar('telefono')} />
                {
                    tocados.telefono && errores.telefono && (
                        <span className="text-xs text-red-600">{errores.telefono}</span>
                    )
                }
            </label>
            <p className="text-sm">Total a pagar: <b>{formatearPrecio(total)}</b></p>
            <button type="submit" className="mt-2 rounded-full border px-4 py-2">
                Confirmar pedido
            </button>
        </form>
    )
}