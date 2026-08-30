import type {Receta} from '../dominio/tipos';
import { recetas as respaldo} from './datos';

const BASE = import.meta.env.VITE_API_URL;
interface RecetaAPI {
    id: number;
    name : string;
    image : string;
    cuisine: string;
    difficulty : string; 
    cookTimeMinutes : number;
    ingredients : string[];
}

function mapearReceta (cruda: RecetaAPI) : Receta {
    return {
        id: cruda.id,
        nombre : cruda.name,
        imagen : cruda.image,
        cocina: cruda.cuisine,
        dificultad : cruda.difficulty,
        minutos : cruda.cookTimeMinutes,
        ingredientes : cruda.ingredients ?? []
    }
}
export async function obtenerRecetas(signal? : AbortSignal) : Promise<{recetas : Receta []; esRespaldo : boolean }> {
    try{
        const r = await fetch(`${BASE}/recipes?limit=24`, {signal});
        if(!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = (await r.json()) as { recipes : RecetaAPI[]};
        return { recetas : data.recipes.map(mapearReceta), esRespaldo: false};
    }catch(error){
        if(error instanceof DOMException && error.name === 'AbortError') throw error;
        console.warn('Api no disponible, usando el respaldo: ', error instanceof Error ? error.message : error);
        return { recetas : respaldo, esRespaldo: true}
    }
}
