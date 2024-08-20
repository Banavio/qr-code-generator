import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QRPage from './pages/QRPage';
import DigitalCardPage from './pages/DigitalCardPage';
import Layout from './components/Layout';
import './App.css';

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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
