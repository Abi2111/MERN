import { useEffect, useState } from 'react';
import ProductLayout from '../../Layouts/ProductLayout.js';
import { useResetPasswordMutation } from '../../redux/APIS/authApi.js';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  console.log(token);
  const [reenterPassword, setReenterPassword] = useState('');
  const [resetPassword, { data, error, isLoading, isSuccess }] =
    useResetPasswordMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('Password reset successfully');
      navigate('/login');
    }
  }, [error, isSuccess]);

  function onSubmit(e) {
    e.preventDefault();
    const body = {
      password,
      reenterPassword,
    };
    resetPassword({ body, token });
  }
  return (
    <ProductLayout>
      <>
        <div className="container">
          <div className="login">
            <form onSubmit={onSubmit}>
              <h1>Reset password</h1>
              <hr />
              <p>Please enter password</p>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                id="password"
              />
              <label htmlFor="reenterPassword">Re-enter Password</label>
              <input
                type="password"
                placeholder="Re-enter"
                value={reenterPassword}
                id="reenterPassword"
                onChange={e => setReenterPassword(e.target.value)}
              />

              <button disabled={isLoading}>
                {isLoading ? 'Reseting...' : 'Reset password'}
              </button>
            </form>
          </div>
        </div>
      </>
    </ProductLayout>
  );
}
