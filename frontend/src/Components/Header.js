import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../redux/APIS/userApi.js';
import { useLazyLogoutQuery } from '../redux/APIS/authApi.js';
import { useGetCartQuery } from '../redux/APIS/cartApi.js';

export default function Header() {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { data } = useGetProfileQuery();
  const { data: cartData, error } = useGetCartQuery();
  let { cartVal } = useSelector(state => state.cart);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    if (!search || search === '') return;
    navigate(`/?search=${search}`);
  }
  const [logout] = useLazyLogoutQuery();
  async function handleLogout() {
    await logout();
    navigate(0);
  }
  return (
    <div className="header">
      <div>
        <Link to="/" className="logo">
          <ion-icon name="cart-outline"></ion-icon> <span>C</span>art
          <span>M</span>art
        </Link>
      </div>

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
          <NavLink className="nav-item" to="/category">
            Category
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item" to="/cart">
            Cart
            <span className="cartCount">{cartData?.cart?.totalQty}</span>
          </NavLink>
        </li>
        {isAuthenticated ? (
          <div
            className="dropdown-container"
            onClick={() => setActive(crr => !crr)}
          >
            <div className="dropdown-profile ">
              <img
                src={`${
                  user?.avatar?.url
                    ? user?.avatar?.url
                    : './images/default_avatar.jpg'
                }`}
                alt="profile"
              />
              <h4>Avinash</h4>
              <ion-icon name="caret-down-outline"></ion-icon>
            </div>
            <div className={`dropdown-link ${active ? 'active' : ''}`}>
              <ul>
                <li>
                  <Link to="/me/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/orders">My Orders</Link>
                </li>
                <li>
                  <Link to="/cart">My Cart</Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <li>
            <NavLink className="nav-item" to="/login">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
