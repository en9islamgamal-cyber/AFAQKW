import React, { useState } from 'react';
// تأكد أن ملف supabase.ts موجود في مجلد lib داخل src
import { supabase } from './lib/supabase'; 
import { Building2, Lock, Mail, AlertCircle } from 'lucide-react';

export default function Login({ onLoginSuccess }: { onLoginSuccess: (role: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setErrorMsg('بيانات الدخول غير صحيحة، تأكد من الإيميل وكلمة المرور');
        setLoading(false);
        return;
      }

      // جلب الصلاحية من جدول الـ profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .maybeSingle();

      onLoginSuccess(profile?.role || 'client');
      
    } catch (err) {
      setErrorMsg('حدث خطأ غير متوقع في النظام');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a101e] px-4" dir="rtl">
      <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border-t-[10px] border-[#e86024]">
        
        <div className="text-center mb-10">
          <div className="bg-slate-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Building2 className="text-[#0a101e]" size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#0a101e]">بوابة <span className="text-[#e86024]">آفاق</span></h2>
          <p className="text-slate-500 mt-2 font-bold uppercase tracking-widest text-xs">AFAQ AL-TATWEER PORTAL</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-r-4 border-red-500 text-red-700 flex items-center gap-3 animate-shake">
            <AlertCircle size={20} />
            <span className="text-sm font-bold">{errorMsg}</span>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 mr-1">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="email@domain.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full border-2 border-slate-100 p-4 pr-12 rounded-2xl outline-none focus:border-[#e86024] transition-all bg-slate-50 text-slate-900 font-bold placeholder-slate-300" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 mr-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full border-2 border-slate-100 p-4 pr-12 rounded-2xl outline-none focus:border-[#e86024] transition-all bg-slate-50 text-slate-900 font-bold placeholder-slate-300" 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#0a101e] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#e86024] transition-all shadow-xl active:scale-95 disabled:bg-slate-400"
          >
            {loading ? 'جاري التحقق من الهوية...' : 'دخول النظام 🚀'}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-slate-100 pt-6 text-slate-400 font-bold text-[10px]">
          تطوير وإشراف هندسي: شركة آفاق للتطوير © 2026
        </div>
      </div>
    </div>
  );
}
