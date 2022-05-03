import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../../partials/Footer';
import Header from '../../partials/Header';

import cl from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className={cl.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
