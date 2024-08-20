import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => {
  return (
    
    <div className='bg-base-100 text-base-content'>
        <Header />
        <div className="flex flex-col min-h-screen bg-base-200">
            <Outlet />
        </div>
    </div>
  );
};

export default Layout;
