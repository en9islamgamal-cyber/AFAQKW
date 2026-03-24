import { useState } from 'react';
import ClientLogin from './ClientLogin'; 
import ClientDashboard from './ClientDashboard';

// تحديد نوع الـ Props عشان TypeScript ما يزعلش
interface CustomerPortalProps {
  onBack?: () => void;
}

const CustomerPortal = ({ onBack }: CustomerPortalProps) => {
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
        <ClientLogin onLogin={handleLogin} onBack={onBack} />
      )}
    </div>
  );
};

export default CustomerPortal;
