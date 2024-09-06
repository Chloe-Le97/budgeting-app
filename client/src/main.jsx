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

// Create a Layout component that includes NavigationMenu
const Layout = ({ children }) => (
  <>
    <NavigationMenu />
    {children}
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: '/assets',
    element: (
      <ProtectedRoute>
        <Layout>
          <Assets />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <SignUpForm></SignUpForm>
      </Layout>
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
