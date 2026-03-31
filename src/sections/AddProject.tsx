import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddProject() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [workType, setWorkType] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('⏳ جاري تأسيس ملف العميل والمشروع...');

    const { error } = await supabase
      .from('projects')
      .insert([{ 
        project_name: `مشروع ${clientName}`, // اسم مبدئي
        client_name: clientName,
        client_email: clientEmail,
        work_type: workType,
        location: location,
        completion_rate: 0,
        status: 'مرحلة التصميم',
        workers_count: 0,
        techs_count: 0
      }]);

    setLoading(false);
    if (error) {
      setMessage('❌ خطأ في الحفظ: ' + error.message);
    } else {
      setMessage('✅ تم إنشاء ملف العميل والمشروع بنجاح!');
      setClientName(''); setClientEmail(''); setWorkType(''); setLocation('');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100" dir="rtl">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-black text-blue-950 flex items-center gap-2">
          <span>📝</span> إنشاء ملف عميل ومشروع جديد
        </h2>
        <p className="text-slate-500 mt-1">أدخل بيانات العميل الأساسية لبدء المشروع</p>
      </div>

      <form onSubmit={handleCreate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-700 font-bold mb-2">اسم العميل / الشركة</label>
            <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="مثال: شركة الغانم" className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none" />
          </div>
          
          <div>
            <label className="block text-slate-700 font-bold mb-2">البريد الإلكتروني (اسم المستخدم)</label>
            <input type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@domain.com" className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none text-left" dir="ltr" />
            <p className="text-xs text-orange-500 mt-1 font-bold">هذا هو الإيميل الذي سيستخدمه العميل للدخول للبوابة</p>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-2">طبيعة الأعمال</label>
            <input type="text" required value={workType} onChange={(e) => setWorkType(e.target.value)} placeholder="مثال: تكييف مركزي وتشطيبات" className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-2">عنوان المشروع</label>
            <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="الكويت - الخيران" className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-950 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all mt-6">
          {loading ? 'جاري الحفظ...' : '🚀 حفظ بيانات العميل وإنشاء المشروع'}
        </button>
        
        {message && <div className="p-4 mt-4 text-center font-bold bg-blue-50 text-blue-800 rounded-xl">{message}</div>}
      </form>
    </div>
  );
}
