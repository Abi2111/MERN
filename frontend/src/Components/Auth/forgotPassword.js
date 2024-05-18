import { useEffect, useState } from 'react';
import ProductLayout from '../../Layouts/ProductLayout.js';
import { useForgotPasswordMutation } from '../../redux/APIS/authApi.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [forgotPassword, { data, error, isLoading, isSuccess }] =
    useForgotPasswordMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('Mail sent successfully');
      navigate('/');
    }
  }, [error, isSuccess]);

  function onSubmit(e) {
    e.preventDefault();
    const body = {
      email,
    };
    forgotPassword(body);
  }
  return (
    <ProductLayout>
      <>
        <div className="container">
          <div className="login">
            <form onSubmit={onSubmit}>
              <h1>Forgot password ?</h1>
              <hr />
              <p>Please enter your registered email id</p>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <button disabled={isLoading}>
                {isLoading ? 'sending mail' : 'send mail'}
              </button>
            </form>
          </div>
        </div>
      </>
    </ProductLayout>
  );
}
