import { Button } from 'antd';
import { Dropdown, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Assets from './components/Assets/Assets';
import Expenses from './components/Expenses/Expenses';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Notification from './components/Notification/Notification';
import assetService from './services/assets';
import expenseService from './services/expenses';
import incomeService from './services/income';
import loginService from './services/login';
import userService from './services/users';

function App() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBugettingappUser',
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      expenseService.setToken(user.token);
      assetService.setToken(user.token);
      incomeService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBugettingappUser',
        JSON.stringify(user),
      );
      setUser(user);
      expenseService.setToken(user.token);
      assetService.setToken(user.token);
      incomeService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong credentials');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

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

  const logOut = () => {
    window.localStorage.removeItem('loggedBugettingappUser');
    setUser(null);
  };

  const signUpForm = () => (
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex-1 pe-10">
          <NavigationMenu user={user} />
        </div>
        {user !== null ? (
          <Dropdown
            dropdownRender={() => (
              <Button danger onClick={logOut} type="primary" className="w-full">
                Logout
              </Button>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              Welcome, <span className="font-bold">{user?.username}</span>
            </a>
          </Dropdown>
        ) : (
          <></>
        )}
      </div>

      <Notification message={message} />
      <div>
        {user === null ? (
          <Routes>
            <Route path="/" element={loginForm()}></Route>
            <Route path="/signup" element={signUpForm()}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Expenses />}></Route>
            <Route path="/assets" element={<Assets />}></Route>
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
