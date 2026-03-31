import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Login from './sections/Login';
import ClientDashboard from './sections/ClientDashboard';
import AdminDashboard from './sections/AdminDashboard';

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSessionAndRole() {
      // 1. التأكد من جلسة الدخول
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // 2. سحب الرول (admin أو client) مباشرة من جدول profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        console.log("الرول المكتشف:", profile?.role);
        setUserRole(profile?.role || 'client');
      }
      setLoading(false);
    }
    getSessionAndRole();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); 
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center font-sans">جاري التحقق من الصلاحيات...</div>;
  }

  // لو مش مسجل دخول -> صفحة اللوجن
  if (!session) {
    return <Login onLoginSuccess={() => window.location.reload()} />;
  }

  // لو مسجل دخول -> التحويل حسب الرول
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
