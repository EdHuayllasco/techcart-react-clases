
interface Props{
    stock : number;
}


export default function EtiquetaStock({stock} : Props){
    if(stock === 0 || stock > 5 ) return null;
    return (
        <p className="text-sx text-orange=600">Ultimas unidades</p>
    )
}