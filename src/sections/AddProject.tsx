import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { createClient } from '@supabase/supabase-js'; 

export default function AddProject() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');
  const [workType, setWorkType] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (clientPassword.length < 6) {
      setMessage('❌ كلمة المرور يجب أن تكون 6 خانات على الأقل.');
      return;
    }

    setLoading(true);
    setMessage('⏳ جاري تأسيس الحساب والمشروع...');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const tempClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false }
      });

      const { error: authError } = await tempClient.auth.signUp({
        email: clientEmail,
        password: clientPassword,
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase
        .from('projects')
        .insert([{ 
          project_name: `مشروع ${clientName}`,
          client_name: clientName,
          client_email: clientEmail,
          work_type: workType,
          location: location,
          completion_rate: 0,
          status: 'مرحلة التصميم',
          workers_count: 0,
          techs_count: 0
        }]);

      if (dbError) throw dbError;

      setMessage('✅ تم إنشاء حساب العميل والمشروع بنجاح! يمكنك إرسال البيانات له الآن.');
      setClientName(''); setClientEmail(''); setClientPassword(''); setWorkType(''); setLocation('');

    } catch (error: any) {
      setMessage('❌ حدث خطأ: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 6000);
    }
  };

  // كلاس موحد للخانات عشان نضمن إن الخط غامق وواضح
  const inputStyles = "w-full border-2 border-slate-200 p-3 rounded-xl focus:border-[#e86024] outline-none text-slate-900 bg-white placeholder-slate-400 font-bold";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100" dir="rtl">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-black text-blue-950 flex items-center gap-2">
          <span>📝</span> إنشاء ملف عميل ومشروع جديد
        </h2>
        <p className="text-slate-500 mt-1">تأسيس بيانات الدخول وتفاصيل المشروع للعميل الجديد</p>
      </div>

      <form onSubmit={handleCreate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* اسم العميل */}
          <div>
            <label className="block text-slate-700 font-bold mb-2">اسم العميل / الشركة</label>
            <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="مثال: شركة آفاق" className={inputStyles} />
          </div>
          
          {/* عنوان المشروع */}
          <div>
            <label className="block text-slate-700 font-bold mb-2">عنوان المشروع</label>
            <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="الكويت - الخيران" className={inputStyles} />
          </div>

          {/* طبيعة الأعمال */}
          <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label className="block text-slate-700 font-bold mb-2">طبيعة الأعمال المطلوبة</label>
            <input type="text" required value={workType} onChange={(e) => setWorkType(e.target.value)} placeholder="مثال: تكييف مركزي، تشطيبات داخلية، وأعمال كهرباء..." className={inputStyles} />
          </div>

          <div className="md:col-span-2 mt-4 mb-2"><hr className="border-slate-200" /></div>

          {/* بيانات الدخول (الإيميل) */}
          <div>
            <label className="block text-slate-700 font-bold mb-2">البريد الإلكتروني للعميل</label>
            <input type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@domain.com" className={`${inputStyles} text-left`} dir="ltr" />
            <p className="text-xs text-blue-500 mt-2 font-bold">هذا هو الإيميل الذي سيستخدمه العميل للدخول</p>
          </div>

          {/* بيانات الدخول (الباسوورد) */}
          <div>
            <label className="block text-slate-700 font-bold mb-2">كلمة المرور (أرسلها للعميل)</label>
            <input type="text" required value={clientPassword} onChange={(e) => setClientPassword(e.target.value)} placeholder="Afaq2026" className={`${inputStyles} text-left text-[#e86024]`} dir="ltr" />
            <p className="text-xs text-orange-500 mt-2 font-bold">يجب أن تكون 6 أحرف أو أرقام على الأقل</p>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#e86024] hover:bg-[#c04b19] text-white font-bold py-5 rounded-xl shadow-lg transition-all mt-8 text-lg">
          {loading ? 'جاري الحفظ...' : '🚀 إنشاء حساب العميل وتأسيس المشروع'}
        </button>
        
        {message && (
           <div className={`p-4 mt-6 text-center font-bold rounded-xl border-2 ${message.includes('✅') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {message}
           </div>
        )}
      </form>
    </div>
  );
}
