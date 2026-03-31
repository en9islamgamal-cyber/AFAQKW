import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login({ onLoginSuccess }: { onLoginSuccess: (role: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      alert('بيانات الدخول غير صحيحة');
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single();

    onLoginSuccess(profile?.role || 'client');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-blue-900">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">بوابة آفاق للتطوير</h2>
          <p className="text-gray-500 mt-2">يرجى تسجيل الدخول للوصول للحساب</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg">
            {loading ? 'جاري التحقق...' : 'دخول النظام'}
          </button>
        </form>
      </div>
    </div>
  );
}
