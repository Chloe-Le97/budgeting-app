import { Button, Input, Form } from 'antd';
import React, { useState } from 'react';

import userService from '../../services/users';

const SignUpForm = () => {
  const [form] = Form.useForm();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSignUp = async () => {
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
      form.resetFields()
    } catch (exception) {
      setMessage('Something wrong');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {message !== null ? (<div className="py-6">{message}</div>) :(<></>)}
      <Form name="basic" onFinish={handleSignUp} form={form}>        
          <Form.Item name="username" label="Username">
          <Input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          </Form.Item>
          <Form.Item name="name" label="Name">
          <Input
            type="text"
            value={name}
            name="Name"
            onChange={({ target }) => setName(target.value)}
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
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
