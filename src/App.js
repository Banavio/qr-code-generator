import React from 'react';
import QRGenerator from './QRGenerator';
import './App.css';
import Header from './Header';

function App() {
  return (
    <div className='bg-base-100 text-base-content'>
      <Header />
      <QRGenerator />
    </div>
  );
}

export default App;
