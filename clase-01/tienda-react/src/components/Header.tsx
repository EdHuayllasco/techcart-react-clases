import { NavLink } from "react-router-dom";
import { useCart } from "../context/useCart";
import formatearPrecio from "../formato";
interface Props {
    nombre : string;
    eslogan?: string;
}


export default function Header({nombre, eslogan = 'Tecnologia para Todos'} : Props) {
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
            <p>🛒 {unidades} productos - {formatearPrecio(total)}</p>
        </header>
    )
}

