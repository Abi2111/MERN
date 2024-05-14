import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/APIS/authApi.js';
import Loader from './../Loader.js';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  console.log(error);
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
            <p className="forget">
              <Link to="/">Forget Password</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
