import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../../components/Footer';

import LocationBar from '../../components/LocationBar';

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <LocationBar />
      <Footer />
    </>
  );
};

export default MainLayout;
