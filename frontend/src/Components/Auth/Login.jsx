import { Link, useNavigate } from 'react-router-dom';
import {
  useGetProfileQuery,
  useLoginMutation,
} from '../../redux/APIS/authApi.js';
import Loader from '../Loader.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ProductLayout from '../../Layouts/ProductLayout.js';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  console.log(isAuthenticated);
  // const { data: user } = useGetProfileQuery();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated, navigate]);

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
      email,
      password,
    };
    login(body);
  }
  return (
    <ProductLayout>
      <>
        <div className="container">
          <div className="login">
            <form onSubmit={onSubmit}>
              <h1>Login</h1>
              <hr />
              <p>Login to get more new things</p>
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
              <button>Login</button>
              <div className="d-flex links">
                <p className="forget">
                  <Link to="/forgotpassword">Forget Password</Link>
                </p>
                <p className="forget">
                  <Link to="/register">Need an account?</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    </ProductLayout>
  );
}
