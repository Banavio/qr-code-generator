import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QRPage from './pages/QRPage';
import DigitalCardPage from './pages/DigitalCardPage';
import Layout from './components/Layout';
import './App.css';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound'; 

const router = createBrowserRouter([
  {
    path: "qr-code-generator",
    element: <Layout />,
    children: [
      {
        path: "qr",
        element: <QRPage />,
      },
      {
        path: "digital-card",
        element: <DigitalCardPage />,
      },
    ],
  },
  {
    path: "qr-code-generator/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
