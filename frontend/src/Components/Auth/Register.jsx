import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/APIS/authApi.js';
import Loader from '../Loader.js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductLayout from '../../Layouts/ProductLayout.js';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);
  const [register, { isLoading, error, isSuccess, data }] =
    useRegisterMutation();
  if (isAuthenticated) {
    navigate('/');
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    navigate('/');
  }
  function onSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    const body = {
      name,
      email,
      password,
    };
    register(body);
  }
  return (
    <ProductLayout>
      <>
        <div className="container">
          <div className="login">
            <form onSubmit={onSubmit}>
              <h1>Signin</h1>
              <hr />
              <p>Signin to get more new things</p>
              <label htmlFor="email">Username</label>
              <input
                type="text"
                placeholder="User name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button>Signin</button>
              <div className="d-flex links">
                <p className="forget">
                  <Link to="/login">Already have an account?</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    </ProductLayout>
  );
}
