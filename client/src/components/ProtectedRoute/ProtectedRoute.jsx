import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../AuthProvider/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }
  if (currentUser === null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoute;
