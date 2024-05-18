import UserLayout from '../../Layouts/userLayout.js';
import { useEffect, useState } from 'react';
import { useUpdatePasswordMutation } from '../../redux/APIS/userApi.js';
import toast from 'react-hot-toast';

export default function UpdatePassword() {
  // const [] = useSelector(state => state.user);
  const [curPassword, setCurPassword] = useState('');
  const [password, setPassword] = useState('');
  const [updatePassword, { isLoading, isSuccess, error }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('Updated Successfully');
    }
  }, [error, isSuccess]);

  function onHandleSubmit(e) {
    e.preventDefault();
    const body = {
      curPassword,
      password,
    };
    updatePassword(body);
    setCurPassword('');
    setPassword('');
  }
  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body update_container"
            onSubmit={onHandleSubmit}
          >
            <h2 className="mb-4">Update Password</h2>
            <div className="mb-3">
              <label for="old_password_field" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={curPassword}
                onChange={e => setCurPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label for="new_password_field" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="update-btn btn"
              disabled={isLoading}
            >
              {isLoading ? 'Updating password' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
