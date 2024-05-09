import { NavLink } from 'react-router-dom';
export default function Header() {
  return (
    <div className="header">
      <button className="logo">Martify</button>
      <ul className="nav-items">
        <li>
          <NavLink className="nav-item">Home</NavLink>
        </li>
        <li>
          <NavLink className="nav-item">Products</NavLink>
        </li>
        <li>
          <NavLink className="nav-item">
            Cart
            <span className="cartCount">0</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
