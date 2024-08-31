import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the homepage after 3 seconds
    const timer = setTimeout(() => {
      navigate('qr-code-generator/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Redirecting to the homepage...</p>
    </div>
  );
};

export default NotFound;
