import Footer from '../Components/Footer.js';
import Header from '../Components/Header.js';

import Products from '../Components/Product.js';
export default function AppLayout() {
  return (
    <div>
      <Header />
      <Products />
      <Footer />
    </div>
  );
}
