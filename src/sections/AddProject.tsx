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
    setMessage('جاري الحفظ...');

    const { error } = await supabase
      .from('projects')
      .insert([{ 
        project_name: name, 
        location: location, 
        completion_rate: rate, 
        status: status 
      }]);

    if (error) {
      setMessage('حدث خطأ: ' + error.message);
    } else {
      setMessage('✅ تم إضافة المشروع بنجاح!');
      setName(''); setLocation(''); setRate(0);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg font-sans" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b pb-2">إضافة مشروع جديد</h2>
      <form onSubmit={handleAdd} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">اسم المشروع:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required 
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">الموقع:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} 
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">نسبة الإنجاز (%):</label>
          <input type="number" value={rate} onChange={(e) => setRate(parseInt(e.target.value))} min="0" max="100"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">حالة المشروع:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none">
            <option>قيد التنفيذ</option>
            <option>مرحلة التصميم</option>
            <option>تم التسليم</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
          حفظ المشروع
        </button>
      </form>
      {message && <p className="mt-4 text-center font-bold text-blue-600">{message}</p>}
    </div>
  );
}
