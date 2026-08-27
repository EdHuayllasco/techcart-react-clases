import { Link } from "react-router-dom";

export default function NoEncontrada(){
    return(
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold">404</h1>
            <p className="mt-2 text-gray-500">Esta pagina no existe en la tienda.</p>
            <Link to="/" className="underline">Volver al catalogo</Link>
        </div>
    );
}