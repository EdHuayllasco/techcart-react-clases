import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CarritoProvider } from './context/CarritoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </StrictMode>,
)
