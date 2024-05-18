import { useSelector } from 'react-redux';
import UserLayout from './../../Layouts/userLayout.js';

export default function Profile() {
  const { user } = useSelector(state => state.user);
  return (
    <UserLayout>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="">
            <img
              className="dashboard_profile"
              src={
                user?.avatar ? user?.avatar.url : '/images/default_avatar.jpg'
              }
              alt=""
            />
          </figure>
        </div>

        <div className="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{user?.name}</p>

          <h4>Email Address</h4>
          <p>{user?.email}</p>

          <h4>Joined On</h4>
          <p>{new Date().getFullYear(user?.createdAt)}</p>
        </div>
      </div>
    </UserLayout>
  );
}
