import React from 'react';

import Header from '../../components/Header';

interface PageLayoutProps {
  isHeader: boolean;
  children: React.ReactNode;
}

import cl from './PageLayout.module.scss';

const PageLayout = ({ isHeader, children }: PageLayoutProps) => {
  return (
    <>
      {isHeader && <Header />}
      <main className={cl.main}>{children}</main>
    </>
  );
};

export default PageLayout;
