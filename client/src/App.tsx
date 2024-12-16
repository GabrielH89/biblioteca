import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/user/Login'
import HomeAluno from './components/livro/HomeAluno'
import SignUp from './components/user/SignUp'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/homealuno' element={<HomeAluno/>}></Route> 
        <Route path='/signup' element={<SignUp/>}></Route> 
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
