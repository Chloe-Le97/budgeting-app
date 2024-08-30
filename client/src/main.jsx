import { purple } from '@ant-design/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
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
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </Router>,
);
