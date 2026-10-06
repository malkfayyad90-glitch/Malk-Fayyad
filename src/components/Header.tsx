import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Phone, ShoppingBag, Settings, MapPin, Menu, X, MessageCircle, Share2, Download } from 'lucide-react';

interface HeaderProps {
  onOpenShare?: () => void;
  onOpenInstall?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenShare, onOpenInstall }) => {
  const { restaurantInfo, cartItemsCount, setIsCartOpen, setIsEditModalOpen, isRestaurantCurrentlyOpen } = useRestaurant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element Brand Title */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-2 group">
              <span className="w-10 h-10 rounded-lg bg-amber-700 text-amber-50 flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-amber-800 transition-colors">
                د
              </span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-none">
                  {restaurantInfo.name}
                </span>
                <span className="text-xs text-stone-500 font-medium mt-0.5 hidden sm:block">
                  {restaurantInfo.city} · شارع صلاح الدين
                </span>
              </div>
            </a>

            {/* Quiet live indicator */}
            <span className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isRestaurantCurrentlyOpen ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-600'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isRestaurantCurrentlyOpen ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`}></span>
              {isRestaurantCurrentlyOpen ? 'مفتوح الآن' : 'مغلق مؤقتاً'}
            </span>
          </div>

          {/* Zone 2: Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <a href="#hero" className="hover:text-amber-800 transition-colors">الرئيسية</a>
            <a href="#services" className="hover:text-amber-800 transition-colors">خدماتنا</a>
            <a href="#menu" className="hover:text-amber-800 transition-colors">قائمة الطعام</a>
            <a href="#loyalty" className="hover:text-amber-800 text-amber-900 flex items-center gap-1 transition-colors">
              <span>نادي الوفاء</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-full font-bold">نقاط</span>
            </a>
            <a href="#reviews" className="hover:text-amber-800 transition-colors">التقييمات ({restaurantInfo.reviewsCount})</a>
            <a href="#gallery" className="hover:text-amber-800 transition-colors">الصور</a>
            <a href="#location" className="hover:text-amber-800 transition-colors">الموقع</a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
              title="اتصال مباشر بالمطعم"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span className="font-mono tabular-nums dir-ltr">{restaurantInfo.phone}</span>
            </a>

            {/* Quick WhatsApp Action */}
            <a
              href={`https://wa.me/20${restaurantInfo.whatsapp.replace(/^0+/, '')}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن قائمة مطعم الدمشقي بكفر الزيات')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
              title="تواصل عبر واتساب"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">واتساب</span>
            </a>

            {/* Shopping Tray / Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors shadow-sm whitespace-nowrap"
              aria-label="سلة الطلبات"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">طلباتي</span>
              {cartItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 text-[11px] font-mono font-bold flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Share Link Button */}
            {onOpenShare && (
              <button
                onClick={onOpenShare}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors whitespace-nowrap"
                title="مشاركة ونسخ رابط المطعم لأي هاتف"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-800" />
                <span>مشاركة</span>
              </button>
            )}

            {/* Install / Download App Button */}
            {onOpenInstall && (
              <button
                onClick={onOpenInstall}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-900 bg-amber-300 hover:bg-amber-400 rounded-lg transition-colors shadow-sm whitespace-nowrap"
                title="تنزيل التطبيق على الموبايل"
              >
                <Download className="w-3.5 h-3.5 text-stone-900" />
                <span className="hidden sm:inline">تنزيل التطبيق</span>
              </button>
            )}

            {/* Data Editor / Admin Button */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200"
              title="تحديث بيانات المطعم (الهاتف، الأسعار، المواعيد، التقييم)"
              aria-label="تحديث البيانات"
            >
              <Settings className="w-4 h-4 text-stone-700" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 space-y-2">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-stone-800 hover:bg-stone-100 text-sm"
            >
              الرئيسية
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-stone-800 hover:bg-stone-100 text-sm"
            >
              خدمات المطعم
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-stone-800 hover:bg-stone-100 text-sm"
            >
              قائمة الطعام والأسعار
            </a>
            <a
              href="#loyalty"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 text-sm"
            >
              🎁 نادي وفاء الدمشقي ومكافآت النقاط
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-stone-800 hover:bg-stone-100 text-sm"
            >
              آراء الزوار والتقييمات ({restaurantInfo.reviewsCount})
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-stone-800 hover:bg-stone-100 text-sm"
            >
              معرض الصور
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-stone-800 hover:bg-stone-100 text-sm"
            >
              الموقع والاتجاهات
            </a>
            {onOpenShare && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShare();
                }}
                className="w-full text-right px-3 py-2 rounded-md font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 text-sm flex items-center justify-between"
              >
                <span>📲 مشاركة ونسخ رابط المطعم</span>
                <Share2 className="w-4 h-4 text-amber-800" />
              </button>
            )}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                {restaurantInfo.address}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
