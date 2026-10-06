import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import {
  X,
  RotateCcw,
  Save,
  Phone,
  Clock,
  Star,
  MapPin,
  Settings,
  Gift,
  Coins,
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { LoyaltyReward } from '../types/restaurant';

export const DataEditorModal: React.FC = () => {
  const {
    restaurantInfo,
    updateRestaurantInfo,
    resetToDefaults,
    isEditModalOpen,
    setIsEditModalOpen,
    loyaltyConfig,
    updateLoyaltyConfig,
    loyaltyRewards,
    addLoyaltyReward,
    deleteLoyaltyReward
  } = useRestaurant();

  // Local state for editing form
  const [phone, setPhone] = useState(restaurantInfo.phone);
  const [whatsapp, setWhatsapp] = useState(restaurantInfo.whatsapp);
  const [address, setAddress] = useState(restaurantInfo.address);
  const [rating, setRating] = useState(restaurantInfo.rating);
  const [reviewsCount, setReviewsCount] = useState(restaurantInfo.reviewsCount);
  const [workingHoursText, setWorkingHoursText] = useState(restaurantInfo.workingHoursText);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(restaurantInfo.isAlwaysOpenForOrders);
  const [deliveryFee, setDeliveryFee] = useState(restaurantInfo.services.delivery.deliveryFee || 15);
  const [announcement, setAnnouncement] = useState(restaurantInfo.announcement);

  // Loyalty Config state
  const [pointsPerEGP, setPointsPerEGP] = useState(loyaltyConfig.pointsPerEGP);
  const [welcomeBonus, setWelcomeBonus] = useState(loyaltyConfig.welcomeBonusPoints);

  // New reward state
  const [showAddReward, setShowAddReward] = useState(false);
  const [newRewTitle, setNewRewTitle] = useState('');
  const [newRewDesc, setNewRewDesc] = useState('');
  const [newRewPoints, setNewRewPoints] = useState(100);
  const [newRewType, setNewRewType] = useState<LoyaltyReward['rewardType']>('free_item');
  const [newRewDiscount, setNewRewDiscount] = useState(30);

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isEditModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurantInfo({
      phone: phone.trim(),
      whatsapp: whatsapp.trim(),
      address: address.trim(),
      rating: Number(rating),
      reviewsCount: Number(reviewsCount),
      workingHoursText: workingHoursText.trim(),
      isAlwaysOpenForOrders: isAlwaysOpen,
      announcement: announcement.trim(),
      services: {
        ...restaurantInfo.services,
        delivery: {
          ...restaurantInfo.services.delivery,
          deliveryFee: Number(deliveryFee)
        }
      }
    });

    updateLoyaltyConfig({
      pointsPerEGP: Number(pointsPerEGP),
      welcomeBonusPoints: Number(welcomeBonus)
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsEditModalOpen(false);
    }, 1200);
  };

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRewTitle.trim() || newRewPoints <= 0) return;
    addLoyaltyReward({
      title: newRewTitle.trim(),
      description: newRewDesc.trim(),
      pointsRequired: newRewPoints,
      rewardType: newRewType,
      discountAmount: newRewType === 'discount_fixed' ? newRewDiscount : undefined,
      freeItemName: newRewType === 'free_item' ? newRewTitle : undefined
    });
    setNewRewTitle('');
    setNewRewDesc('');
    setNewRewPoints(100);
    setShowAddReward(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                لوحة تحديث بيانات المطعم ونادي الوفاء
              </h2>
              <p className="text-xs text-stone-500">
                تحديث أرقام التواصل، التقييمات، المواعيد، الأسعار، وبرنامج النقاط
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>تم حفظ جميع التحديثات بنجاح وحفظها في التخزين الدائم!</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Contact info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 border-b pb-1">
              <Phone className="w-3.5 h-3.5" />
              <span>بيانات الاتصال والتواصل المباشر</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">رقم الهاتف للاتصال المباشر</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">رقم واتساب للطلبات</label>
                <input
                  type="text"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">العنوان بالتفصيل</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Ratings & Working Hours */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 border-b pb-1">
              <Star className="w-3.5 h-3.5" />
              <span>التقييمات وساعات العمل المؤكدة</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">التقييم العام (من 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">عدد المراجعات والتقييمات</label>
                <input
                  type="number"
                  min="1"
                  value={reviewsCount}
                  onChange={(e) => setReviewsCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">نص مواعيد وساعات العمل</label>
                <input
                  type="text"
                  value={workingHoursText}
                  onChange={(e) => setWorkingHoursText(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="alwaysOpen"
                  checked={isAlwaysOpen}
                  onChange={(e) => setIsAlwaysOpen(e.target.checked)}
                  className="w-4 h-4 accent-amber-700 rounded"
                />
                <label htmlFor="alwaysOpen" className="text-xs text-stone-700 font-medium">
                  المطعم يستقبل الطلبات على مدار 24 ساعة
                </label>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">سعر توصيل الدليفري (ج.م)</label>
                <input
                  type="number"
                  min="0"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Announcement */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 border-b pb-1">
              <span>شريط العروض والإعلانات</span>
            </h3>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">نص العرض بأعلى الموقع</label>
              <input
                type="text"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
              />
            </div>
          </div>

          {/* Section 4: Loyalty Program Configuration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-1">
              <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                <span>إعدادات نادي وفاء الدمشقي ومكافآت النقاط</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddReward(!showAddReward)}
                className="text-[11px] font-bold text-amber-800 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>إضافة مكافأة جديدة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">معدل كسب النقاط (لكل 10 ج.م)</label>
                <input
                  type="number"
                  step="0.05"
                  value={pointsPerEGP}
                  onChange={(e) => setPointsPerEGP(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                />
                <span className="text-[10px] text-stone-500">القيمة 0.1 تعني نقطة واحدة لكل 10 جنيه</span>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">نقاط الترحيب للعضو الجديد</label>
                <input
                  type="number"
                  min="0"
                  value={welcomeBonus}
                  onChange={(e) => setWelcomeBonus(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                />
              </div>
            </div>

            {/* List of active loyalty rewards */}
            <div className="space-y-1.5 pt-2">
              <p className="text-xs font-bold text-stone-700">المكافآت المتاحة حالياً ({loyaltyRewards.length}):</p>
              <div className="max-h-36 overflow-y-auto space-y-1 bg-stone-50 p-2 rounded-lg border border-stone-200">
                {loyaltyRewards.map((rew) => (
                  <div key={rew.id} className="flex items-center justify-between text-xs py-1 px-2 bg-white rounded border border-stone-100">
                    <span className="font-semibold text-stone-800 truncate">{rew.title}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-amber-800 font-bold">{rew.pointsRequired} نقطة</span>
                      <button
                        type="button"
                        onClick={() => deleteLoyaltyReward(rew.id)}
                        className="text-stone-400 hover:text-rose-600 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Reward Form Accordion */}
            {showAddReward && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3 text-xs">
                <p className="font-bold text-amber-950">إضافة مكافأة أو وجبة مجانية جديدة:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="اسم الهدية (مثال: كانز بيبسي مجاني)"
                    value={newRewTitle}
                    onChange={(e) => setNewRewTitle(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="النقاط المطلوبة"
                    value={newRewPoints}
                    onChange={(e) => setNewRewPoints(Number(e.target.value))}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg font-mono"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReward(false)}
                    className="px-3 py-1 bg-white border rounded text-stone-600"
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateReward}
                    className="px-3 py-1 bg-amber-700 text-white rounded font-bold"
                  >
                    إضافة المكافأة
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={resetToDefaults}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
              title="إعادة ضبط جميع البيانات للقيم الأصلية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة البيانات الافتراضية</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg"
              >
                إغلاق
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
