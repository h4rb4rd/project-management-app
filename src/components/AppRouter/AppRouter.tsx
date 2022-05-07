import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { authSlice } from '../../store/reducers/AuthSlice';
import Boards from '../../pages/Boards';
import Board from '../../pages/Board';
import Home from '../../pages/Home';
import { getValueWithExpiry } from '../../utils/storage';
import Login from '../../pages/Login';
import MainLayout from '../../Layouts/MainLayout';
import NotFound from '../../pages/NotFound';
import PrivateRoute from '../../hoc/PrivateRoute';
import OnlyPublicRoute from '../../hoc/OnlyPublicRoute';
import { RouteNames } from './types';
import SignUp from '../../pages/SignUp';
import { useAppDispatch } from '../../hooks/redux';
import UserService from '../../services/UserService';

const AppRouter = () => {
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const checkIsAuth = async () => {
    const userId = getValueWithExpiry('userId');

    if (userId) {
      const userResponse = await UserService.getUser(userId);
      dispatch(setUser(userResponse.data));
    }
  };

  useEffect(() => {
    checkIsAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to={RouteNames.HOME} />} />
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route
          path={RouteNames.BOARDS}
          element={
            <PrivateRoute>
              <Boards />
            </PrivateRoute>
          }
        />
        <Route
          path={RouteNames.BOARD}
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path={RouteNames.LOGIN}
        element={
          <OnlyPublicRoute>
            <Login />
          </OnlyPublicRoute>
        }
      />
      <Route
        path={RouteNames.SIGN_UP}
        element={
          <OnlyPublicRoute>
            <SignUp />
          </OnlyPublicRoute>
        }
      />
      <Route path={RouteNames.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
