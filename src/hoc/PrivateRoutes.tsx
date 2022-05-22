import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { RouteNames } from '../components/AppRouter/types';
import { useAppDispatch } from '../hooks/redux';
import { authSlice } from '../store/reducers/AuthSlice';
import { getValueWithExpiry } from '../utils/storage';

const PrivateRoutes = () => {
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const token = getValueWithExpiry('token');

  if (!token) {
    dispatch(setUser(null));
    localStorage.removeItem('userId');
    return <Navigate to={RouteNames.HOME} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
