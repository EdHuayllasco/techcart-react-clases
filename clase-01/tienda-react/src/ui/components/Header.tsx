import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../aplicacion/useCart";
import { useSesion } from "../../aplicacion/useSesion";
import formatearPrecio from "../formato";
interface Props {
    nombre : string;
    eslogan?: string;
}


export default function Header({nombre, eslogan = 'Tecnologia para Todos'} : Props) {
    const  {usuario, salir} = useSesion();
    const {unidades, total} = useCart();
    return(
        <header className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">{nombre}</h1>
                <p className="text-sm text-gray-500">{eslogan}</p>
                <nav className="mt-2 flex gap-4">
                    <NavLink to="/" 
                    className={({isActive}) => (isActive ? 'font-bold underline' : 'hover:underline')}>
                        Catalogo
                    </NavLink>
                    <NavLink to="/checkout"
                    className={({isActive}) => (isActive ? 'font-bold underline' : 'hover:underline')}>
                        Checkout
                    </NavLink>
                </nav>
            </div>
            <div className="text-right">
                <p>🛒 {unidades} productos - {formatearPrecio(total)}</p>
                {
                    usuario ? (
                        <p className="text-sm">Hola, {usuario.nombre}
                            <button className="ml-2 underline" onClick={salir}>Salir</button>
                        </p>
                    ) : (<Link to="/login" className="text-sm underline">Inicia Sesion</Link>)
                }
            </div>
        </header>
    )
}

