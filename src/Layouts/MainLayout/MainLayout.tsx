import React from 'react';
import { Outlet } from 'react-router-dom';
import LocationBar from '../../components/LocationBar';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import cl from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className={cl.main}>
        <Outlet />
        <LocationBar />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
