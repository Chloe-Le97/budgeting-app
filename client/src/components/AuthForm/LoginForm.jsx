import { Button, Input, Form } from 'antd';
import React, { useState } from 'react';

import { useAuth } from '../AuthProvider/AuthProvider';

const LoginForm = () => {
  const [form] = Form.useForm();
  const {
    handleLogin,
  } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const login = async () => {
    await handleLogin(username, password);
    setUsername('');
    setPassword('');
    form.resetFields()
  };

  return (
    <div>
      <div>{message}</div>
      <Form name="basic" onFinish={login} form={form}>
        <Form.Item name="name" label="Username">
        <Input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        </Form.Item>

        <Form.Item name="password" label="Password">
          <Input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
