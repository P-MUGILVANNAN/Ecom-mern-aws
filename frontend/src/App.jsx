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
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import './App.css'
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import AddAddress from './pages/AddAddress';

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
          <Route path='/profile' element={<Profile />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/productdetails/:id' element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App