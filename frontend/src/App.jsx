import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clothing from './pages/Clothing';
import Electronics from './pages/Electronics';
import Mobiles from './pages/Mobiles';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clothings' element={<Clothing />} />
          <Route path='/electronics' element={<Electronics />} />
          <Route path='/mobiles' element={<Mobiles />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App