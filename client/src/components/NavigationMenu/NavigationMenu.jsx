import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../AuthProvider/AuthProvider';

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

const NavigationMenu = () => {
  const { currentUser, handleLogout } = useAuth();
  const location = useLocation();

  const menuDropdownItems = [
    {
      label: (
        <Link to="/budget" className="dropdown-link">
          Budget
        </Link>
      ),
      key: 'budget',
    },
    {
      label: (
        <Button danger onClick={handleLogout} type="primary" className="w-full">
          Logout
        </Button>
      ),
      key: 'logout',
    },
  ];

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex-1 pe-10">
        {currentUser === null ? (
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
      </div>
      {currentUser !== null ? (
        <Dropdown
          menu={{ items: menuDropdownItems }}
          overlayClassName="custom-dropdown"
          trigger={['hover']}
        >
          <a onClick={(e) => e.preventDefault()}>
            Welcome, <span className="font-bold">{currentUser?.username}</span>
          </a>
        </Dropdown>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavigationMenu;
