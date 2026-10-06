import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Share2, Copy, Check, MessageSquare, QrCode, X, Globe, Smartphone } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { restaurantInfo } = useRestaurant();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // The public URL that opens for everyone on any mobile without Google login
  const PUBLIC_SHARE_URL = 'https://ais-pre-eodgkwhtsml5u24g2xfjp3-87552212103.europe-west2.run.app';
  const currentUrl = PUBLIC_SHARE_URL;

  const shareText = `مطعم الدمشقي كفر الزيات - شارع صلاح الدين 🍽️\nشاهد قائمة الطعام، الشاورما السورية، واكسب نقاط وهدايا مع كل طلب من خلال الرابط:\n${currentUrl}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurantInfo.name,
        text: `قائمة طعام وطلبات مطعم الدمشقي كفر الزيات - شارع صلاح الدين`,
        url: currentUrl
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  // QR code URL using public reliable QR generation service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-700 text-white flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">مشاركة ونشر رابط المطعم</h3>
              <p className="text-xs text-stone-500">ليفتحه الزبائن من أي هاتف محمول مباشرة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          
          {/* Direct Link Box */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              رابط الموقع المباشر (جاهز للمشاركة):
            </label>
            <div className="flex items-center gap-2 p-2 bg-stone-50 border border-stone-200 rounded-xl">
              <Globe className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-transparent text-xs text-stone-800 font-mono focus:outline-none dir-ltr truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ'}</span>
              </button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleShareWhatsApp}
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>إرسال عبر واتساب</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="py-2.5 px-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Smartphone className="w-4 h-4" />
              <span>مشاركة مع التطبيقات</span>
            </button>
          </div>

          {/* QR Code Section for Restaurant tables / posters */}
          <div className="pt-3 border-t border-stone-100 text-center">
            <p className="text-xs font-bold text-stone-800 mb-1 flex items-center justify-center gap-1.5">
              <QrCode className="w-4 h-4 text-amber-700" />
              <span>رمز الاستجابة السريعة (QR Code) للمطعم:</span>
            </p>
            <p className="text-[11px] text-stone-500 mb-3">
              يمكنك طباعة هذا الباركود ووضعه على طاولات المطعم في شارع صلاح الدين أو على أكياس الدليفري
            </p>
            <div className="w-36 h-36 mx-auto p-2 bg-white rounded-xl border border-stone-200 shadow-sm flex items-center justify-center">
              <img
                src={qrCodeUrl}
                alt="QR Code لمطعم الدمشقي"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-stone-100 text-center">
          <p className="text-[11px] text-stone-400">
            يعمل الرابط على أي متصفح (Chrome, Safari) وعلى كافة هواتف iPhone و Android بدون الحاجة لتحميل أي تطبيق.
          </p>
        </div>

      </div>
    </div>
  );
};
