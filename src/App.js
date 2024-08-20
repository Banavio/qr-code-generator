import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QRPage from './pages/QRPage';
import DigitalCardPage from './pages/DigitalCardPage';
import Layout from './components/Layout';
import './App.css';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 text-base-content">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl">Page Not Found</p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "qr-code-generator/qr",
        element: <QRPage />,
      },
      {
        path: "qr-code-generator/digital-card",
        element: <DigitalCardPage />,
      },
    ],
  },
  // {
  //   path: "/*",
  //   element: <NotFound />,
  // }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
