import type { ItemCarrito } from "../tipos";
 
interface Props {
    items : ItemCarrito[]; // []
    onQuitar : (id: number) => void;
    onVaciar: () => void
}
export default function PanelCarrito({items, onQuitar, onVaciar} : Props){
    return(
        <section className="mb-6 rounded-xl borde p-4">
        <h2 className="font-semibold">Tu carrito</h2>
        {items.length === 0 && <p className="text-sm text-gray-500">Tu carrito esta vacio.</p>}
        <ul>
          {
            items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-1 text-sm">
                <span>{item.nombre} x {item.cantidad}</span>
                <button onClick={
                  ()=> onQuitar(item.id)
                } aria-label="Quitar del carrito">X</button>
              </li>
            ))
          }
        </ul>
        {items.length > 0 && (
          <button className="mt-2 text-sm underline" onClick={onVaciar}>Vaciar carrito</button>
        )}
      </section>
    );
}