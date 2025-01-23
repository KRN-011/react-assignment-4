import React from 'react'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import EditProfile from './Pages/EditProfile'
import ChangePassword from './Pages/ChangePassword'
import { Route, Routes, useLocation } from 'react-router-dom'
import Products from './Pages/Products'
import Navbar from './Components/Navbar'
import ProductDetail from './Pages/ProductDetail'

const App: React.FC = () => {

  const location = useLocation();

  const excludedPath = ["/login", "/signup"]

  const navbarShouldShow = !excludedPath.includes(location.pathname)

  return (
    <>
    { navbarShouldShow && <Navbar/> }
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}/>
        <Route path='/change-password' element={<ChangePassword/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>
    </>
  )
}

export default App