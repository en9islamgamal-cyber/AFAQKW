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
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // جلب الدور (Role) من قاعدة البيانات بدون إظهار رسائل تنبيه
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error("Error fetching role:", error.message);
          setUserRole('client');
        } else {
          setUserRole(profile?.role || 'client');
        }
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); 
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-blue-900 text-white font-sans" dir="rtl">
        جاري التحقق من الصلاحيات...
      </div>
    );
  }

  if (!session) {
    return <Login onLoginSuccess={() => window.location.reload()} />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {userRole === 'admin' ? (
        <AdminDashboard /> 
      ) : (
        <ClientDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
