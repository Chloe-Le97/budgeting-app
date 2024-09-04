import { Button, Input } from 'antd';
import React, { useState } from 'react';

import { useAuth } from '../AuthProvider/AuthProvider';

const LoginForm = () => {
  const {
    authToken,
    setAuthToken,
    currentUser,
    setCurrentUser,
    handleLogin,
    handleLogout,
  } = useAuth();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={login}>
      <div>
        Username
        <Input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <Input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
