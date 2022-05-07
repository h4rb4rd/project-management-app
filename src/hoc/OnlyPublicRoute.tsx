import React, { ReactNode } from 'react';

import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

import { RouteNames } from '../components/AppRouter/types';

interface RequireAuthProps {
  children: ReactNode;
}

const OnlyPublicRoute = ({ children }: RequireAuthProps) => {
  const location = useLocation();

  const { user } = useAppSelector((state) => state.AuthReducer);

  if (user) {
    return <Navigate to={RouteNames.HOME} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default OnlyPublicRoute;
