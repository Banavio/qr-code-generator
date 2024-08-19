import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  return (
    <header className="p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="https://media.licdn.com/dms/image/v2/D4D0BAQEwDPXjXTHn2Q/company-logo_100_100/company-logo_100_100/0/1714231767346?e=1731542400&v=beta&t=q0QImFmmTwBz5D0egvgnLPsy69AnpTrflso3kzTTYC8" alt="Logo" className="h-10 mr-4 rounded-lg" />
        <h1 className="text-3xl font-bold">BANAVIO</h1>
      </div>
      <div className="flex space-x-4">
        <a href="https://facebook.com" className="btn btn-square btn-outline rounded-lg" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook fa-lg"></i>
        </a>
        <a href="https://twitter.com" className="btn btn-square btn-outline rounded-lg" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter fa-lg"></i>
        </a>
        <a href="https://instagram.com" className="btn btn-square btn-outline rounded-lg" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram fa-lg"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
