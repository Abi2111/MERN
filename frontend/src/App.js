import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './Layouts/appLayout.js';
import ProductDetails from './Components/ProductDetails.js';
import ProductsList from './Components/ProductsList.js';
import Login from './Components/Auth/Login.js';
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}></Route>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
