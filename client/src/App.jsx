import { Button } from 'antd';
import { Dropdown, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Assets from './components/Assets/Assets';
import LoginForm from './components/AuthForm/LoginForm';
import { useAuth } from './components/AuthProvider/AuthProvider';
import Expenses from './components/Expenses/Expenses';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Notification from './components/Notification/Notification';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import service from './services/helper';
import loginService from './services/login';
import userService from './services/users';

function App() {
  const { authToken, setAuthToken, setCurrentUser } = useAuth();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBugettingappUser',
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setCurrentUser(user);
      setAuthToken(user.token);
      service.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Notification message={message} />
      <div>{authToken ? <Expenses /> : <LoginForm />}</div>
    </>
  );
}

export default App;
