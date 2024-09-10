import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useState } from 'react';

import service from '../../services/helper';
import loginService from '../../services/login';

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const queryClient = useQueryClient();

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBugettingappUser',
        JSON.stringify(user),
      );

      setAuthToken(user.token);
      setCurrentUser(user);
      service.setToken(user.token);
    } catch (e) {
      setAuthToken(null);
      setCurrentUser(null);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBugettingappUser');
    setCurrentUser(null);
    setAuthToken(null);
    service.setToken(null);
    queryClient.removeQueries();
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        currentUser,
        setCurrentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside of a AuthProvider');
  }

  return context;
}
