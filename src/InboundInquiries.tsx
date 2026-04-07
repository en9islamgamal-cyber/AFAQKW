import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // تأكد من مسار الملف عندك
import { Mail, Phone, Clock, MessageSquare, Tag, Loader2 } from 'lucide-react';

export default function InboundInquiries() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // دالة جلب البيانات من الجدول اللي في الصورة
  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="animate-spin text-[#FF6A00]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#0F172A] flex items-center gap-3">
          📩 طلبات التسعير الجديدة
          <span className="bg-[#FF6A00]/10 text-[#FF6A00] text-sm px-3 py-1 rounded-full">
            {requests.length} طلب
          </span>
        </h3>
        <button 
          onClick={fetchRequests}
          className="text-sm font-bold text-gray-500 hover:text-[#FF6A00] transition-colors"
        >
          🔄 تحديث القائمة
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FF6A00]/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-black text-[#0F172A] text-xl mb-1">{req.full_name}</h4>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                  <Clock size={12} />
                  {new Date(req.created_at).toLocaleString('ar-KW')}
                </div>
              </div>
              <div className={`px-4 py-1.5 rounded-xl text-xs font-black ${req.status === 'جديد' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                {req.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <a href={`mailto:${req.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#FF6A00]/5 transition-colors group">
                <Mail size={18} className="text-[#FF6A00]" />
                <span className="text-sm font-bold text-gray-600 truncate">{req.email}</span>
              </a>
              <a href={`tel:${req.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#FF6A00]/5 transition-colors">
                <Phone size={18} className="text-[#FF6A00]" />
                <span className="text-sm font-bold text-gray-600">{req.phone}</span>
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#FF6A00] font-black text-sm">
                <Tag size={16} />
                {req.service_type || 'غير محدد'}
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-[#1F2937] leading-relaxed text-sm font-medium relative">
                <MessageSquare size={14} className="absolute top-4 left-4 opacity-10" />
                {req.message}
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
               <button className="flex-1 py-3 bg-[#0F172A] text-white rounded-xl font-bold text-sm hover:bg-black transition-all">
                 رد عبر الإيميل
               </button>
               <button className="px-4 py-3 border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 transition-all">
                 أرشفة
               </button>
            </div>
          </div>
        ))}
        
        {requests.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-black text-xl">لا توجد طلبات تسعير حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}
