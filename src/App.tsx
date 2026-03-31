import { useState, useEffect } from 'react';
import Login from './sections/Login';
import ClientDashboard from './sections/ClientDashboard';
import AdminDashboard from './sections/AdminDashboard';
import { supabase } from './lib/supabase';

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(true); // حالة التحقق

  useEffect(() => {
    async function getSessionAndRole() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        console.log("الرول الحالي في الداتا بيز هو:", profile?.role);
        setUserRole(profile?.role || 'client');
      }
      setIsChecking(false);
    }
    getSessionAndRole();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); 
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="text-xl font-bold text-blue-900 animate-pulse text-center">
          جاري التحقق من الصلاحيات... <br/> آفاق للتطوير
        </div>
      </div>
    );
  }

  if (!session) {
    return <Login onLoginSuccess={() => window.location.reload()} />;
  }

  return (
    <>
      {userRole === 'admin' ? (
        <AdminDashboard /> 
      ) : (
        <ClientDashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
