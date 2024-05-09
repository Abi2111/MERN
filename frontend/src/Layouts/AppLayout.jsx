import Footer from '../Components/Footer.jsx';
import Header from '../Components/Header.jsx';

import { Link, Outlet } from 'react-router-dom';
import Products from '../Components/Product.jsx';
import Button from '../Components/Button.jsx';
export default function AppLayout() {
  return (
    <div>
      <Header />
      <Products />
      <Outlet />
      <Link to="/products">
        <Button>Load more</Button>
      </Link>
      <Footer />
    </div>
  );
}
