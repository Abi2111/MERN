import Footer from '../Components/Footer.js';
import Header from '../Components/Header.js';

export default function ProductLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
