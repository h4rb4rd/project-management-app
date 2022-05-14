import React, { ReactNode } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

import { RouteNames } from '../components/AppRouter/types';

const PrivateRoutes = () => {
  const location = useLocation();

  const { user } = useAppSelector((state) => state.AuthReducer);

  if (!user) {
    return <Navigate to={RouteNames.HOME} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
