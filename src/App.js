// import React from 'react';
// import QRGenerator from './QRGenerator';
// import './App.css';
// import Header from './Header';

// function App() {
//   return (
//     <div className='bg-base-100 text-base-content'>
//       <Header />
//       <QRGenerator />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import QRPage from './pages/QRPage';
import DigitalCardPage from './pages/DigitalCardPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="qr" element={<QRPage />} />
          <Route path="digital-card" element={<DigitalCardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
