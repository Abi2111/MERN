import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../redux/APIS/authApi.js';
export default function Dropdown() {
  const [active, setActive] = useState(false);
  const [logout, { data }] = useLazyLogoutQuery();
  const navigate = useNavigate();
  console.log(data);
  function handleLogout() {
    logout();
    navigate(0);
  }
  return (
    <div className="dropdown-container" onClick={() => setActive(crr => !crr)}>
      <div className="dropdown-profile ">
        <img src="./images/default_avatar.jpg" />
        <h4>Avinash</h4>
        <ion-icon name="caret-down-outline"></ion-icon>
      </div>
      <div className={`dropdown-link ${active ? 'active' : ''}`}>
        <ul>
          <li>
            <Link>Profile</Link>
          </li>
          <li>
            <Link>My Orders</Link>
          </li>
          <li>
            <Link>My Cart</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
