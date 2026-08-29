import type { Producto } from "../dominio/tipos";
import {productos as respaldo} from '../infraestructura/datos';

const BASE  = import.meta.env.VITE_API_URL;

// interfaz CRUDA de la API
interface ProductoAPI { 
    id : number;
    title : string; 
    brand? : string;
    price: number;
    thumbnail : string;
    category?: string;
    stock?: number;
}
// Adaptador

function mapearProducto(productoCrudo : ProductoAPI) : Producto {
    return {
        id: productoCrudo.id,
        nombre : productoCrudo.title,
        marca : productoCrudo.brand ?? '',
        precio : productoCrudo.price,
        imagen : productoCrudo.thumbnail,
        categoria : productoCrudo.category  ?? 'otros',
        stock : productoCrudo.stock ?? 0
    }
}

export async function obtenerProductos(signal? :AbortSignal) : Promise<{productos : Producto[]; esRespaldo: boolean}> {
    try {
        const r = await fetch(`${BASE}/products?limit=24`, {signal}); //500
        if(!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = (await r.json()) as {products : ProductoAPI[]};
        return {productos : data.products.map(mapearProducto), esRespaldo: false}
    } catch (error) {
        if(error instanceof DOMException && error.name === 'AbortError') throw error;
        console.warn('API no disponible, usando el catalogo de semilla: ', error instanceof Error ? error.message : error);
        return { productos : respaldo , esRespaldo : true};
    }
}