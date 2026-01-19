import { Button, Dropdown, Menu } from 'antd';
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
  {
    label: <Link to="/budget">Budget</Link>,
    key: '/budget',
  },
  {
    label: <Link to="/bill">Bill</Link>,
    key: '/bill',
  },
];

const NavigationMenu = () => {
  const { currentUser, handleLogout } = useAuth();
  const location = useLocation();

  const menuDropdownItems = [
    {
      label: (
        <Link to="/category" className="dropdown-link">
          Category
        </Link>
      ),
      key: 'category',
    },
    {
      label: (
        <Button
          danger
          onClick={handleLogout}
          type="link"
          className="logout-btn"
        >
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
