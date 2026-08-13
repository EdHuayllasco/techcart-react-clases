import ProductCard from "./components/ProductCard";
import { productos } from "./datos"

export default function App() {
  return( 
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tienda Tech</h1>
        <p>🛒 0 productos</p>
      </header>
      <ProductCard producto={productos[0]}/>
      <ProductCard producto={productos[1]}/>
      <ProductCard producto={productos[2]}/>
    </main>
  )
}
