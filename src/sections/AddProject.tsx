import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddProject() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState('قيد التنفيذ');
  const [message, setMessage] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('⏳ جاري حفظ البيانات...');

    const { error } = await supabase
      .from('projects')
      .insert([{ 
        project_name: name, 
        location: location, 
        completion_rate: rate, 
        status: status 
      }]);

    if (error) {
      setMessage('❌ حدث خطأ: ' + error.message);
    } else {
      setMessage('✅ تم إضافة المشروع بنجاح!');
      setName(''); setLocation(''); setRate(0);
      // إخفاء الرسالة بعد 3 ثواني
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans" dir="rtl">
      <div className="flex items-center gap-2 mb-8 border-b-2 border-blue-100 pb-4">
        <span className="text-3xl">📝</span>
        <h2 className="text-2xl font-black text-blue-900">إضافة مشروع جديد</h2>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* اسم المشروع */}
        <div className="md:col-span-2">
          <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide">
            اسم المشروع
          </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="مثلاً: فيلا منطقة السالمية"
            className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-800 bg-white" 
          />
        </div>

        {/* الموقع */}
        <div>
          <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide">
            الموقع / المنطقة
          </label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="الكويت، العاصمة"
            className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-800 bg-white" 
          />
        </div>

        {/* نسبة الإنجاز */}
        <div>
          <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide">
            نسبة الإنجاز (%)
          </label>
          <input 
            type="number" 
            value={rate} 
            onChange={(e) => setRate(parseInt(e.target.value))} 
            min="0" 
            max="100"
            className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-800 bg-white font-mono" 
          />
        </div>

        {/* حالة المشروع */}
        <div className="md:col-span-2">
          <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide">
            حالة المشروع الحالية
          </label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-800 bg-white appearance-none cursor-pointer"
          >
            <option>قيد التنفيذ</option>
            <option>مرحلة التصميم</option>
            <option>تم التسليم</option>
            <option>معلق مؤقتاً</option>
          </select>
        </div>

        {/* زر الحفظ */}
        <div className="md:col-span-2 pt-4">
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>💾</span>
            حفظ بيانات المشروع
          </button>
        </div>
      </form>

      {/* رسائل التنبيه */}
      {message && (
        <div className={`mt-6 p-4 rounded-xl text-center font-bold animate-bounce ${
          message.includes('success') || message.includes('بنجاح') 
          ? 'bg-green-100 text-green-700 border border-green-200' 
          : 'bg-blue-50 text-blue-700 border border-blue-100'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
