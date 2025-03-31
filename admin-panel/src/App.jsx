import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';
import Navbar from './components/Navbar';
import EditProduct from './pages/EditProduct';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<AddProduct />} />
        <Route path='/viewproducts' element={<ViewProduct />} />
        <Route path='/editproduct/:id' element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
