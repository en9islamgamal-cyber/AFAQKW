import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddProject() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState('قيد التنفيذ');
  const [workers, setWorkers] = useState(0);
  const [techs, setTechs] = useState(0);
  const [updateDate, setUpdateDate] = useState(new Date().toISOString().split('T')[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage('⏳ جاري حفظ البيانات...');

    let publicImageUrl = '';
    try {
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile);
        
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        
        publicImageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from('projects')
        .insert([{ 
          project_name: name, 
          location: location, 
          completion_rate: rate, 
          status: status,
          workers_count: status === 'قيد التنفيذ' ? workers : 0,
          techs_count: status === 'قيد التنفيذ' ? techs : 0,
          last_updated: updateDate,
          image_url: publicImageUrl
        }]);

      if (insertError) throw insertError;

      setMessage('✅ تم التحديث بنجاح!');
      setName(''); setLocation(''); setRate(0); setImageFile(null);
    } catch (error: any) {
      setMessage('❌ خطأ: ' + error.message);
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans text-right" dir="rtl">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-blue-100 pb-4">
        <span className="text-4xl">🏗️</span>
        <div>
          <h2 className="text-2xl font-black text-blue-900">نظام تحديث المواقع</h2>
          <p className="text-slate-500 text-sm">برجاء إدخال البيانات بدقة ليراها العميل</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="space-y-8 text-right">
        {/* القسم الأول: معلومات أساسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="md:col-span-2">
            <label className="block text-slate-700 font-bold mb-2">اسم المشروع</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="مثال: فيلا منطقة السرة" className="w-full border-2 border-slate-300 p-3 rounded-xl focus:border-blue-500 outline-none bg-white text-slate-800" />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">الموقع</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="الكويت - حولي" className="w-full border-2 border-slate-300 p-3 rounded-xl focus:border-blue-500 outline-none bg-white text-slate-800" />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">تاريخ التحديث</label>
            <input type="date" value={updateDate} onChange={(e) => setUpdateDate(e.target.value)} className="w-full border-2 border-slate-300 p-3 rounded-xl focus:border-blue-500 outline-none bg-white font-mono text-slate-800" />
          </div>
        </div>

        {/* القسم الثاني: نسبة الإنجاز (Slider) */}
        <div className="bg-white p-6 rounded-2xl border-2 border-blue-50 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <label className="text-blue-900 font-black text-lg">نسبة الإنجاز الفعلية</label>
            <span className="bg-blue-600 text-white px-5 py-2 rounded-full font-black text-xl shadow-lg">
              {rate}%
            </span>
          </div>
          
          <div className="relative pt-1 px-2">
            <input 
              type="range" min="0" max="100" value={rate} 
              onChange={(e) => setRate(parseInt(e.target.value))}
              style={{ direction: 'rtl' }}
              className="w-full h-4 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm text-slate-400 mt-4 font-bold px-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* القسم الثالث: الحالة والعمالة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className={status === 'قيد التنفيذ' ? 'md:col-span-1' : 'md:col-span-3'}>
            <label className="block text-slate-700 font-bold mb-2">حالة العمل</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border-2 border-slate-300 p-3 rounded-xl focus:border-blue-500 outline-none bg-slate-50 cursor-pointer font-bold text-slate-800 px-2">
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="مرحلة التصميم">مرحلة التصميم</option>
              <option value="تم التسليم">تم التسليم</option>
            </select>
          </div>

          {status === 'قيد التنفيذ' && (
            <>
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <label className="block text-orange-700 font-bold mb-2 text-sm text-center">عدد العمال 👷</label>
                <input type="number" value={workers} onChange={(e) => setWorkers(parseInt(e.target.value))} className="w-full border-2 border-orange-200 p-2 rounded-lg outline-none text-slate-800 font-bold text-center" />
              </div>
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <label className="block text-blue-700 font-bold mb-2 text-sm text-center">عدد الفنيين 👨‍🔧</label>
                <input type="number" value={techs} onChange={(e) => setTechs(parseInt(e.target.value))} className="w-full border-2 border-blue-200 p-2 rounded-lg outline-none text-slate-800 font-bold text-center" />
              </div>
            </>
          )}
        </div>

        {/* القسم الرابع: رفع الصور */}
        <div className={`p-6 rounded-2xl border-4 border-dashed transition-all text-center ${imageFile ? 'border-green-400 bg-green-50' : 'border-slate-300 bg-slate-50 hover:border-blue-400'}`}>
          <label className="block text-slate-700 font-black mb-4">صور من الموقع الميداني 📸</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 shadow-md inline-block">
            {imageFile ? `✅ تم اختيار: ${imageFile.name}` : 'إرفاق صورة جديدة'}
          </label>
        </div>

        <button 
          type="submit" disabled={uploading}
          className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${uploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800 text-white'}`}
        >
          {uploading ? 'جاري الحفظ...' : '🚀 حفظ وإرسال التقرير'}
        </button>
      </form>

      {message && (
        <div className={`mt-8 p-5 rounded-2xl text-center font-bold text-lg shadow-lg border-2 ${message.includes('✅') ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
