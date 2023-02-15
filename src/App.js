import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Products from './components/Products';
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/products" element={<Products/>} />
    <Route exact path="/" element={<Cart  />} />
    <Route path="/cart" element={<Cart/>} />

    
      </Routes>
      </BrowserRouter>
  );
}

export default App;
