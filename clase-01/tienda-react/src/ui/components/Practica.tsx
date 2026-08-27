import { useState, useEffect } from "react";

export default function Practica(){
    const [segundos, setSegundos] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setSegundos((s) => s + 1)
        },1000);
        return () => clearInterval(id);
    },[]);
    return <p className="texxt-2xl font-bold">⌚ {segundos} s.</p>
}