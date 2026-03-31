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
      // 1. جلب الجلسة الحالية
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // 2. جلب الرول مباشرة وبدون كاش
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle(); // استخدام maybeSingle لتجنب الأخطاء لو البروفايل لسه مسمعش
        
        if (profile) {
          console.log("تم اكتشاف الرول:", profile.role);
          setUserRole(profile.role);
        } else {
          setUserRole('client');
        }
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
    return (
      <div className="h-screen flex items-center justify-center bg-blue-900 text-white font-sans font-bold">
        جاري فحص الصلاحيات...
      </div>
    );
  }

  if (!session) {
    return <Login onLoginSuccess={() => window.location.reload()} />;
  }

  // التحويل بناءً على الرول
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
