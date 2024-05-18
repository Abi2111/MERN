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
import Cart from './Components/cart.js';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
