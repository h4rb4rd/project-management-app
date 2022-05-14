import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Account from '../../pages/Account';
import Boards from '../../pages/Boards';
import Board from '../../pages/Board';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import MainLayout from '../../Layouts/MainLayout';
import NotFound from '../../pages/NotFound';
import PrivateRoutes from '../../hoc/PrivateRoutes';
import OnlyPublicRoutes from '../../hoc/OnlyPublicRoutes';
import { RouteNames } from './types';
import SignUp from '../../pages/SignUp';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to={RouteNames.HOME} />} />
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path={RouteNames.BOARDS} element={<Boards />} />
          <Route path={RouteNames.BOARDS + '/:id'} element={<Board />} />
          <Route path={RouteNames.BOARD} element={<Board />} />
          <Route path={RouteNames.ACCOUNT} element={<Account />} />
        </Route>
      </Route>
      <Route element={<OnlyPublicRoutes />}>
        <Route path={RouteNames.LOGIN} element={<Login />} />
        <Route path={RouteNames.SIGN_UP} element={<SignUp />} />
      </Route>
      <Route path={RouteNames.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
