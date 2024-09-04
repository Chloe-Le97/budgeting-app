import { purple } from '@ant-design/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Assets from './components/Assets/Assets';
import SignUpForm from './components/AuthForm/SignUpForm';
import AuthProvider from './components/AuthProvider/AuthProvider';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <NavigationMenu></NavigationMenu>
        <App />
      </>
    ),
  },
  {
    path: '/assets',
    element: (
      <ProtectedRoute>
        <NavigationMenu></NavigationMenu>
        <Assets />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <>
        <NavigationMenu></NavigationMenu>
        <SignUpForm></SignUpForm>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: purple.primary,
          colorLink: purple.primary,
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  </QueryClientProvider>,
);
