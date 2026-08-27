import { Link } from "react-router-dom";
import { useCart } from "../../aplicacion/useCart";
export default function PanelCarrito(){
    const { items, quitar, vacia } = useCart();
    return(
        <section className="mb-6 rounded-xl border p-4">
        <h2 className="font-semibold">Tu carrito</h2>
        {items.length === 0 && <p className="text-sm text-gray-500">Tu carrito esta vacio.</p>}
        <ul>
          {
            items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-1 text-sm">
                <span>{item.nombre} x {item.cantidad}</span>
                <button onClick={
                  ()=> quitar(item.id)
                } aria-label="Quitar del carrito">X</button>
              </li>
            ))
          }
        </ul>
        {items.length > 0 && (
          <div className="mt-2 flex gap-4 text-sm">
            <button className="underline" onClick={vacia}>Vaciar carrito</button>
          <Link to="/checkout" className="font-semibold underline">Ir a pagar</Link>
          </div>
        )}
      </section>
    );
}