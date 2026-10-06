import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink, ShieldCheck, Check } from 'lucide-react';

export const LocationContactSection: React.FC = () => {
  const { restaurantInfo, isRestaurantCurrentlyOpen } = useRestaurant();

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('مطعم الدمشقي شارع صلاح الدين كفر الزيات الغربية مصر')}`;

  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider mb-2">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>موقع المطعم وساعات العمل</span>
            <span aria-hidden="true">·</span>
            <span>كفر الزيات</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            موقعنا في شارع صلاح الدين وكيفية الوصول إلينا
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            يقع مطعم الدمشقي في موقع استراتيجي وحيوي بشارع صلاح الدين بمدينة كفر الزيات. تواصل معنا مباشرة أو افتح نظام الملاحة للوصول بدقة.
          </p>
        </div>

        {/* Contact & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Cards (5 cols): Phone, WhatsApp, Hours, Address */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-stone-500">رقم الهاتف للطلب والاستفسار</h3>
                    <a
                      href={`tel:${restaurantInfo.phone}`}
                      className="text-lg sm:text-xl font-bold font-mono text-stone-900 hover:text-amber-800 dir-ltr inline-block mt-0.5"
                    >
                      {restaurantInfo.phone}
                    </a>
                  </div>
                </div>
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold whitespace-nowrap"
                >
                  اتصال الآن
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-300 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-900">تواصل مباشر عبر واتساب</h3>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      لإرسال الطلبات والاستفسار عن المنيو والعروض
                    </p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/20${restaurantInfo.whatsapp.replace(/^0+/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold whitespace-nowrap"
                >
                  محادثة فورية
                </a>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-stone-500">ساعات العمل المؤكدة</h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        isRestaurantCurrentlyOpen
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isRestaurantCurrentlyOpen ? 'bg-emerald-600 animate-pulse' : 'bg-stone-500'}`}></span>
                      {isRestaurantCurrentlyOpen ? 'المطعم مفتوح الآن' : 'مغلق حالياً'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-stone-900 mt-1">
                    {restaurantInfo.workingHoursText}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    * يتم تحديث المواعيد دورياً لضمان الدقة وتجنب أي مواعيد غير مؤكدة.
                  </p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-stone-500">العنوان بالتفصيل</h3>
                  <p className="text-sm font-bold text-stone-900 mt-1 leading-relaxed">
                    {restaurantInfo.address}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>احصل على الاتجاهات (GPS)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Interactive Map Showcase */}
          <div className="lg:col-span-7 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col h-full min-h-[460px]">
            
            {/* Map Top Bar */}
            <div className="p-4 bg-white border-b border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="font-bold text-stone-800">خريطة موقع مطعم الدمشقي كفر الزيات</span>
              </div>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-800 hover:text-amber-900 font-semibold"
              >
                <span>فتح في خرائط Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Map Iframe Embed centered on Salah El-Din St, Kafr El-Zayat */}
            <div className="flex-1 relative min-h-[360px] bg-stone-200">
              <iframe
                title="موقع مطعم الدمشقي كفر الزيات على الخريطة"
                src="https://maps.google.com/maps?q=30.8225,30.8145+(مطعم+الدمشقي+كفر+الزيات+شارع+صلاح+الدين)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                className="w-full h-full min-h-[360px] border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>

              {/* In-Map floating overlay card */}
              <div className="absolute bottom-4 right-4 max-w-xs bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-stone-200 shadow-lg text-xs pointer-events-none">
                <p className="font-black text-stone-900">مطعم الدمشقي كفر الزيات</p>
                <p className="text-stone-600 text-[11px] mt-0.5">شارع صلاح الدين · مأكولات سورية وشامية</p>
                <div className="flex items-center gap-1 text-amber-600 font-bold mt-1 text-[11px]">
                  <span>★ 4.1</span>
                  <span className="text-stone-400">·</span>
                  <span>هاتف: {restaurantInfo.phone}</span>
                </div>
              </div>
            </div>

            {/* Map Bottom Footer */}
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-stone-500 text-[11px] flex items-center justify-between">
              <span>تغطية دليفري سريعة لجميع أحياء وقرى كفر الزيات</span>
              <span className="font-mono text-stone-400">30.8225° N, 30.8145° E</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
