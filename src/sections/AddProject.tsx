import { useState } from 'react';
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

  // دالة لتنظيف النموذج بالكامل بعد النجاح
  const resetForm = () => {
    setName('');
    setLocation('');
    setRate(0);
    setStatus('قيد التنفيذ');
    setWorkers(0);
    setTechs(0);
    setImageFile(null);
    // إعادة تعيين حقل الملف يدوياً لأن React لا يتحكم فيه بشكل كامل
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage('⏳ جاري الحفظ ورفع البيانات...');

    let publicImageUrl = '';

    try {
      // 1. رفع الصورة (إذا وجدت)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`; // استخدام الوقت لضمان اسم فريد
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        
        publicImageUrl = publicUrlData.publicUrl;
      }

      // 2. إدخال البيانات في الجدول
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

      setMessage('✅ تم تحديث المشروع بنجاح!');
      resetForm();
    } catch (error: any) {
      setMessage('❌ فشل الاختبار/الحفظ: ' + (error.message || 'خطأ غير معروف'));
      console.error("Error details:", error);
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans text-right" dir="rtl">
      <div className="flex items-center gap-3 mb-8 border-b-4 border-blue-600 pb-4">
        <span className="text-4xl">🏗️</span>
        <div>
          <h2 className="text-2xl font-black text-blue-900">نظام تحديث المواقع</h2>
          <p className="text-slate-500 text-sm">تأكد من دقة البيانات قبل الحفظ</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="space-y-8">
        
        {/* معلومات أساسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="md:col-span-2">
            <label className="block text-slate-700 font-bold mb-2">اسم المشروع (مطلوب للتيست)</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="مثال: برج آفاق 1" className="w-full border-2 border-slate-300 p-3 rounded-xl focus:border-blue-500 outline-none transition-all bg-white text-slate-800" />
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

        {/* السلايدر المطور */}
        <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <label className="text-blue-900 font-black text-lg">نسبة الإنجاز الفعلية</label>
            <div className="flex items-center gap-2">
               <span className="bg-blue-600 text-white px-5 py-2 rounded-full font-black text-xl shadow-lg animate-pulse">
                 {rate}%
               </span>
            </div>
          </div>
          
          <div className="relative pt-1 px-2">
            <input 
              type="range" min="0" max="100" value={rate} 
              onChange={(e) => setRate(parseInt(e.target.value))}
              className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            {/* أرقام توضيحية تحت السلايدر */}
            <div className="flex justify-between text-sm text-slate-500 mt-4 font-bold px-1" dir="ltr">
              <span className={rate === 0 ? "text-blue-600 scale-125 transition-all" : ""}>0%</span>
              <span className={rate === 50 ? "text-blue-600 scale-125 transition-all" : ""}>50%</span>
              <span className={rate === 100 ? "text-blue-600 scale-125 transition-all" : ""}>100%</span>
            </div>
          </div>
        </div>

        {/* الحالة والعمالة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className={status === 'قيد التنفيذ' ? 'md:col-span-1' : 'md:col-span-3'}>
            <label className="block text-slate-700 font-bold mb-2">حالة العمل</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border-2 border-slate-300 p-3 rounded-xl focus:border-blue-500 outline-none bg-slate-50 cursor-pointer font-bold text-slate-800">
              <option>قيد التنفيذ</option>
              <option>مرحلة التصميم</option>
              <option>تم التسليم</option>
            </select>
          </div>

          {status === 'قيد التنفيذ' && (
            <>
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <label className="block text-orange-700 font-bold mb-2 text-sm">عدد العمال 👷</label>
                <input type="number" value={workers} onChange={(e) => setWorkers(parseInt(e.target.value))} className="w-full border-2 border-orange-200 p-2 rounded-lg focus:border-orange-500 outline-none text-slate-800 font-bold" />
              </div>
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <label className="block text-blue-700 font-bold mb-2 text-sm">عدد الفنيين 👨‍🔧</label>
                <input type="number" value={techs} onChange={(e) => setTechs(parseInt(e.target.value))} className="w-full border-2 border-blue-200 p-2 rounded-lg focus:border-blue-500 outline-none text-slate-800 font-bold" />
              </div>
            </>
          )}
        </div>

        {/* رفع الصور */}
        <div className={`p-6 rounded-2xl border-4 border-dashed transition-all text-center ${imageFile ? 'border-green-400 bg-green-50' : 'border-slate-300 bg-slate-50 hover:border-blue-400'}`}>
          <label className="block text-slate-700 font-black mb-4">صور من الموقع الميداني 📸</label>
          <input 
            type="file" accept="image/*" 
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            className="hidden" id="file-upload" 
          />
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 shadow-md inline-block transition-transform hover:scale-105">
            {imageFile ? `✅ تم اختيار: ${imageFile.name}` : 'إرفاق صورة جديدة'}
          </label>
          {imageFile && (
             <p className="mt-2 text-green-600 text-sm font-bold animate-pulse">جاهز للرفع!</p>
          )}
        </div>

        {/* زر الحفظ والاختبار */}
        <button 
          type="submit" disabled={uploading}
          className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${uploading ? 'bg-slate-400 cursor-wait' : 'bg-blue-700 hover:bg-blue-900 text-white'}`}
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              جاري معالجة البيانات...
            </>
          ) : (
            '🚀 حفظ وإرسال التقرير'
          )}
        </button>
      </form>

      {/* رسالة الحالة */}
      {message && (
        <div className={`mt-8 p-5 rounded-2xl text-center font-bold text-lg shadow-lg border-2 animate-in fade-in zoom-in ${message.includes('✅') ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
