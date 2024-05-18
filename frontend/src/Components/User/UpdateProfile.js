import { useEffect, useState } from 'react';
import UserLayout from '../../Layouts/userLayout.js';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../../redux/APIS/userApi.js';
import { toast } from 'react-hot-toast';
export default function UpdateProfile() {
  const { user } = useSelector(state => state.user);
  console.log(user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('Updated Successfully');
    }
  }, [error, isSuccess]);
  async function onHandleSubmit(e) {
    e.preventDefault();
    const body = { email, name };
    await updateProfile(body);
  }
  return (
    <UserLayout>
      <div className="row wrapper ">
        <div className="col-10 col-lg-8 ">
          <form
            className="shadow rounded bg-body update_container"
            onSubmit={onHandleSubmit}
          >
            <h2 className="mb-4">Update Profile</h2>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                {' '}
                Name{' '}
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label for="email_field" className="form-label">
                {' '}
                Email{' '}
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn "
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
