import {Routes, Route} from 'react-router-dom';
import Login from './ui/paginas/Login';
import Registro from './ui/paginas/Registro';
export default function App(){
  
  return(
    <Routes>  
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Registro/>}/>
    </Routes>
  )
}
