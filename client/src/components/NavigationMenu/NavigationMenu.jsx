import { Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const itemsAuth = [
  {
    label: <Link to="/">Login</Link>,
    key: '/',
  },
  {
    label: <Link to="/signup">Sign Up</Link>,
    key: '/signup',
  },
];

const itemUser = [
  {
    label: <Link to="/">Diary</Link>,
    key: '/',
  },
  {
    label: <Link to="/assets">Assets</Link>,
    key: '/assets',
  },
];

const NavigationMenu = ({ user }) => {
  const location = useLocation();

  return (
    <>
      {user === null ? (
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          items={itemsAuth}
        />
      ) : (
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          items={itemUser}
        />
      )}
    </>
  );
};

export default NavigationMenu;
