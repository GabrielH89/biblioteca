import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/user/Login'
import SignUp from './components/user/SignUp'
import HomeAluno from './components/aluno/HomeAluno'
import HomeProfessor from './components/professor/HomeProfessor'
import PersonalInformations from './components/user/PersonalInformations'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route> 
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/homeprofessor' element={<HomeProfessor/>}></Route> 
        <Route path='/homealuno' element={<HomeAluno/>}></Route> 
        <Route path='/personal-info' element={<PersonalInformations/>}></Route> 
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
