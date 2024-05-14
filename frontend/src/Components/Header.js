import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    if (!search || search === '') return;
    navigate(`/?search=${search}`);
  }
  return (
    <div className="header">
      <button className="logo">
        <Link to="/">Martify</Link>
      </button>

      <div class="container-input">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search"
            name="search"
            class="input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </form>
      </div>

      <ul className="nav-items">
        <li>
          <NavLink className="nav-item" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-item">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item">
            Cart
            <span className="cartCount">0</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item">Category</NavLink>
        </li>
        <li>
          <NavLink className="nav-item" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
