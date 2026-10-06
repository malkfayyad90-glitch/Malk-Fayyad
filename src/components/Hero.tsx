import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Phone, MessageCircle, Star, MapPin, UtensilsCrossed, Clock, ArrowDown, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { restaurantInfo, isRestaurantCurrentlyOpen } = useRestaurant();

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(`مرحباً مطعم الدمشقي كفر الزيات، أود طلب وجبة شاورما ومعرفة أحدث العروض المتاحة اليوم.`);
    window.open(`https://wa.me/20${restaurantInfo.whatsapp.replace(/^0+/, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="relative bg-gradient-to-b from-stone-100 via-stone-50 to-[#FAF8F5] pt-8 pb-16 sm:pb-24 border-b border-stone-200 overflow-hidden">
      
      {/* Subtle Damascus geometric backdrop accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (Right in RTL): Editorial Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Metadata & Trust Kicker (Zero-Pill discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600">
              <span className="text-amber-800 font-bold">المطبخ السوري الأصيل</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>كفر الزيات، شارع صلاح الدين</span>
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className={`inline-flex items-center gap-1 ${isRestaurantCurrentlyOpen ? 'text-emerald-700' : 'text-stone-500'}`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{isRestaurantCurrentlyOpen ? 'مستعدون لاستقبال طلبك الآن' : 'خارج مواعيد العمل الرسمية'}</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              مطعم الدمشقي كفر الزيات
              <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-amber-800 mt-2 font-['Tajawal']">
                أصالة النكهة الشامية والشاورما على أصولها
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
              {restaurantInfo.description}
            </p>

            {/* Quantitative Social Proof (Adjacency principle) */}
            <div className="flex flex-wrap items-center gap-6 py-2 border-y border-stone-200/80 my-4 text-stone-700">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(restaurantInfo.rating) ? 'fill-amber-500' : 'fill-amber-200'}`}
                    />
                  ))}
                </div>
                <span className="font-mono font-bold text-stone-900 tabular-nums text-lg">
                  {restaurantInfo.rating.toFixed(1)}
                </span>
                <span className="text-xs text-stone-500">
                  ({restaurantInfo.reviewsCount} تقييماً موثقاً للزوار)
                </span>
              </div>

              <span className="hidden sm:inline text-stone-300">|</span>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>شاورما طازجة يومياً بخبز الصاج وتتبيلة دمشقية</span>
              </div>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppDirect}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>اطلب عبر واتساب</span>
              </button>

              <a
                href={`tel:${restaurantInfo.phone}`}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال مباشر: {restaurantInfo.phone}</span>
              </a>

              <a
                href="#menu"
                className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-bold rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-700" />
                <span>تصفح قائمة الطعام</span>
              </a>
            </div>

            {/* Live Service Availability Indicators */}
            <div className="pt-2 text-xs text-stone-500 flex items-center gap-3">
              <span>الخدمات المتاحة:</span>
              <span className="font-medium text-stone-700">تناول بالصالة</span>
              <span>·</span>
              <span className="font-medium text-stone-700">تيك أواي Takeaway</span>
              <span>·</span>
              <span className="font-medium text-stone-700">توصيل سريع (دليفري)</span>
            </div>

          </div>

          {/* Right Column (Left in RTL): Visual Anchor (Hero Photography) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
              <img
                src="/src/assets/images/dimashqi_hero_shawarma_1791287152912.jpg"
                alt="شاورما سوري طازجة من مطعم الدمشقي كفر الزيات"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>

              {/* In-photo metadata badge */}
              <div className="absolute bottom-4 right-4 left-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-stone-100 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-amber-800">شاورما دمشقية على أصولها</p>
                    <p className="text-xs text-stone-600">شرائح شاورما طازجة، خبز صاج، ثومية مميزة</p>
                  </div>
                  <a
                    href="#location"
                    className="flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-amber-700 transition-colors bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-lg"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>شارع صلاح الدين</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Trust Marker */}
            <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-stone-900 text-white p-3.5 rounded-xl shadow-xl border border-stone-800 flex items-center gap-3 max-w-[240px]">
              <div className="w-9 h-9 rounded-lg bg-amber-600/30 text-amber-400 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-stone-100">تقييم ممتاز 4.1 من 5</p>
                <p className="text-stone-400 text-[11px]">مفضل لدى أهالي كفر الزيات</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
