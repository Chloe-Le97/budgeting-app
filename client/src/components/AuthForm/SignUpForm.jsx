import { Button, Input } from 'antd';
import React, { useState } from 'react';

import userService from '../../services/users';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      await userService.signup({
        username,
        name,
        password,
      });
      setUsername('');
      setPassword('');
      setMessage('Sign up successfully, please log in');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage('Something wrong');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
        Name
        <Input
          type="text"
          value={name}
          name="Username"
          onChange={({ target }) => setName(target.value)}
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
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;
