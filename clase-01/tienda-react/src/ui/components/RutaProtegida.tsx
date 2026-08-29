import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSesion } from "../../aplicacion/useSesion"

export default function RutaProtegida() {
    const {usuario} = useSesion();
    const ubicacion = useLocation();
    if(!usuario) {
        return <Navigate to="/login" replace state={{desde : ubicacion.pathname}}/>;
    }
    return <Outlet/>;
}
