import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MapPin, Phone, MessageSquare, Heart, Settings, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { restaurantInfo, setIsEditModalOpen } = useRestaurant();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1 (5 cols): Brand & About */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-black text-xl">
                د
              </span>
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {restaurantInfo.name}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              أصالة المطبخ السوري والشامي في مدينة كفر الزيات، محافظة الغربية. نفتخر بتقديم ألذ ساندوتشات ووجبات الشاورما الدمشقية والفتات والمشاوي بخبرة شامية أصيلة.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>لحوم وفراخ طازجة يومياً</span>
              </span>
              <span>·</span>
              <span>خبز صاج سوري طازج</span>
              <span>·</span>
              <span>ثومية أصلية</span>
            </div>
          </div>

          {/* Col 2 (3 cols): Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">أقسام الموقع</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">خدمات المطعم (صالة، سفري، دليفري)</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">قائمة الطعام والأسعار</a>
              </li>
              <li>
                <a href="#loyalty" className="hover:text-amber-400 transition-colors font-bold">نادي وفاء الدمشقي ومكافآت النقاط</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">آراء وتقييمات العملاء ({restaurantInfo.reviewsCount})</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">ألبوم صور المطعم والأطعمة</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">العنوان والاتجاهات وساعات العمل</a>
              </li>
            </ul>
          </div>

          {/* Col 3 (4 cols): Direct Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">التواصل والطلبات</h4>
            
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{restaurantInfo.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${restaurantInfo.phone}`} className="font-mono text-white hover:text-amber-400 dir-ltr font-bold text-sm">
                  {restaurantInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/20${restaurantInfo.whatsapp.replace(/^0+/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 font-bold"
                >
                  واتساب: {restaurantInfo.whatsapp}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs transition-colors border border-stone-700"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>تحديث وتعديل بيانات المطعم ⚙️</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 مطعم الدمشقي كفر الزيات - جميع الحقوق محفوظة. شارع صلاح الدين، كفر الزيات، الغربية.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors"
              aria-label="العودة لأعلى الصفحة"
            >
              <span>للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
