import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteNames } from './types';

import MainLayout from '../../Layouts/MainLayout';
import NotFound from '../../pages/NotFound';

import PrivateRoute from '../../hoc/PrivateRoute';
import Home from '../../pages/Home';
import Boards from '../../pages/Boards';
import Board from '../../pages/Board';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';

const AppRouter = () => {
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
      <Route path={RouteNames.LOGIN} element={<Login />} />
      <Route path={RouteNames.SIGN_UP} element={<SignUp />} />
      <Route path={RouteNames.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
