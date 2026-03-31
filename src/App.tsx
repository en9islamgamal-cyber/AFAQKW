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
        // جلب البيانات مع طباعة النتيجة للتأكد
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          alert("خطأ في قراءة البيانات: " + error.message);
          setUserRole('client');
        } else {
          // السطر اللي جاي ده هيعرفنا المشكلة فين فوراً
          alert("أهلاً بك! الموقع تعرف عليك بصلاحية: " + (profile?.role || "لا يوجد"));
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

  if (loading) return <div className="h-screen flex items-center justify-center bg-blue-900 text-white">جاري التحقق...</div>;

  if (!session) {
    return <Login onLoginSuccess={() => window.location.reload()} />;
  }

  return (
    <>
      {userRole === 'admin' ? (
        <AdminDashboard /> 
      ) : (
        <div className="border-t-4 border-red-500">
          <ClientDashboard onLogout={handleLogout} />
        </div>
      )}
    </>
  );
}

export default App;
