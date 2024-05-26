import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './Layouts/appLayout.js';
import ProductDetails from './Components/ProductDetails.js';
import ProductsList from './Components/ProductsList.js';
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from './Components/Auth/forgotPassword.js';
import ResetPassword from './Components/Auth/resetPassword.js';
import Profile from './Components/User/Profile.js';
import UpdateProfile from './Components/User/UpdateProfile.js';
import UploadAvatar from './Components/User/UploadAvatar.js';
import UpdatePassword from './Components/User/UpdatePassword.js';
import Cart from './Components/Cart/cart.js';
import Category from './Components/CategoryPage.js';
import Checkout from './Components/Checkout/CheckOut.js';
import Shipping from './Components/Checkout/Shipping.js';
import Payment from './Components/Checkout/Payment.js';
import OrderPlaced from './Components/orderPlace.js';
import Orders from './Components/orders/Orders.js';
import OrderDetails from './Components/orders/OrderDetails.js';
import Invoice from './Components/Invoice.js';

function App() {
  return (
    <div className="app">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}></Route>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/me/profile" element={<Profile />} />
          <Route path="/me/update_profile" element={<UpdateProfile />} />
          <Route path="/me/upload_avatar" element={<UploadAvatar />} />
          <Route path="/me/update_password" element={<UpdatePassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category" element={<Category />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment_method" element={<Payment />} />
          <Route path="/order-successfull" element={<OrderPlaced />} />
          <Route path="/me/orders" element={<Orders />} />
          <Route path="/me/order/:id" element={<OrderDetails />} />
          <Route path="/invoice/order/:id" element={<Invoice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
