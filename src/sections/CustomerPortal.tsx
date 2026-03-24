import React, { useState } from 'react';
import ClientLogin from './ClientLogin'; 
import ClientDashboard from './ClientDashboard';

// ضفنا استقبال onBack هنا
const CustomerPortal = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="w-full min-h-screen">
      {isAuthenticated ? (
        <ClientDashboard onLogout={handleLogout} />
      ) : (
        // مررنا onBack لصفحة اللوجين
        <ClientLogin onLogin={handleLogin} onBack={onBack} />
      )}
    </div>
  );
};

export default CustomerPortal;
