import React, { useState } from 'react';
import ClientLogin from './ClientLogin'; // مسار صفحة الدخول بتاعتك اللي في الصورة
import ClientDashboard from './ClientDashboard';

const CustomerPortal = () => {
  // متغير لحفظ حالة تسجيل الدخول: هل العميل سجل دخول ولا لأ؟
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // دالة وهمية بتشتغل لما العميل يدوس "دخول آمن"
  const handleLogin = (e) => {
    e.preventDefault();
    // هنا في المستقبل هنتأكد من الباسوورد من الداتا بيز
    // حالياً هنخليه يدخل على طول للتجربة
    setIsAuthenticated(true);
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      {/* لو مسجل دخول اعرض لوحة التحكم، لو لأ اعرض شاشة الدخول */}
      {isAuthenticated ? (
        <ClientDashboard onLogout={handleLogout} />
      ) : (
        <ClientLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default CustomerPortal;
