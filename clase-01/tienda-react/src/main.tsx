import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CarritoProvider } from './aplicacion/CarritoContext.tsx'
import { SesionProvider } from './aplicacion/SesionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </SesionProvider>
    </BrowserRouter>
  </StrictMode>,
)
