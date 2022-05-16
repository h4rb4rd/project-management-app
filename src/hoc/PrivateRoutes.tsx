import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { RouteNames } from '../components/AppRouter/types';
import { getValueWithExpiry } from '../utils/storage';

const PrivateRoutes = () => {
  const location = useLocation();
  const token = getValueWithExpiry('token');

  if (!token) {
    return <Navigate to={RouteNames.BOARDS} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
