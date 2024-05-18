import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    {
      name: 'Profile',
      url: '/me/profile',
      icon: 'fas fa-user',
    },
    {
      name: 'Update profile',
      url: '/me/update_profile',
      icon: 'fas fa-user',
    },
    {
      name: 'Upload avatar',
      url: '/me/upload_avatar',
      icon: 'fas fa-user-circle',
    },
    {
      name: 'Update Password',
      url: '/me/update_password',
      icon: 'fas fa-lock',
    },
  ];
  return (
    <div className="list-group mt-5 pl-4">
      {menuItems.map(menu => (
        <>
          <NavLink
            to={menu.url}
            className="fw-bold list-group-item list-group-item-action"
          >
            <i className={`${menu.icon} fa-fw pe-2`}></i> {menu.name}
          </NavLink>
        </>
      ))}
    </div>
  );
}
