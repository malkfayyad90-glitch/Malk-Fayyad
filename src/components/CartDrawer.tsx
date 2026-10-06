import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Phone,
  Bike,
  ShoppingBag,
  Utensils,
  CheckCircle,
  Gift,
  Coins,
  Crown,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    restaurantInfo,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    appliedDiscount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    currentMember,
    loginMemberByPhone,
    registerMember,
    appliedReward,
    removeAppliedReward,
    completeOrderLoyaltyProcessing,
    loyaltyConfig
  } = useRestaurant();

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dineIn'>('delivery');
  const [customerName, setCustomerName] = useState(currentMember ? currentMember.name : '');
  const [customerPhone, setCustomerPhone] = useState(currentMember ? currentMember.phone : '');
  const [address, setAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [earnedPointsNotification, setEarnedPointsNotification] = useState<number | null>(null);

  // Quick loyalty phone login inside cart
  const [quickPhone, setQuickPhone] = useState('');
  const [quickLoginError, setQuickLoginError] = useState('');

  if (!isCartOpen) return null;

  // Delivery fee calculation (Gold members get free delivery!)
  const isFreeDeliveryForGold = currentMember?.tier === 'gold';
  const deliveryFee = orderType === 'delivery'
    ? (isFreeDeliveryForGold ? 0 : (restaurantInfo.services.delivery.deliveryFee || 15))
    : 0;

  const grandTotal = cartTotal + deliveryFee;

  // Expected points earned
  const expectedPoints = currentMember
    ? Math.round(grandTotal * loyaltyConfig.pointsPerEGP * loyaltyConfig.tiers[currentMember.tier].multiplier)
    : Math.floor(grandTotal * loyaltyConfig.pointsPerEGP);

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) return;
    const ok = loginMemberByPhone(quickPhone);
    if (!ok) {
      // Register them
      registerMember(customerName || 'عميل الدمشقي', quickPhone);
    }
    setQuickPhone('');
    setQuickLoginError('');
  };

  const handleSendViaWhatsApp = () => {
    if (cart.length === 0) return;

    const orderTypeText =
      orderType === 'delivery' ? 'توصيل للمنزل (دليفري)' : orderType === 'takeaway' ? 'استلام من المطعم (تيك أواي)' : 'تناول داخل الصالة';

    let message = `🍽️ *طلب جديد من مطعم الدمشقي - كفر الزيات*\n`;
    message += `--------------------------------\n`;
    message += `👤 *الاسم:* ${customerName || (currentMember ? currentMember.name : 'عميل محترم')}\n`;
    message += `📞 *رقم العميل:* ${customerPhone || (currentMember ? currentMember.phone : 'غير محدد')}\n`;
    message += `🛵 *نوع الطلب:* ${orderTypeText}\n`;
    if (orderType === 'delivery' && address) {
      message += `📍 *العنوان:* ${address}\n`;
    }
    message += `--------------------------------\n`;
    message += `📋 *تفاصيل الوجبات:*\n`;

    cart.forEach((item, index) => {
      const priceStr = item.isRewardItem ? 'هدية مجانية (0 ج.م)' : `${item.menuItem.price * item.quantity} ج.م`;
      message += `${index + 1}. ${item.menuItem.name} × ${item.quantity} = ${priceStr}\n`;
      if (item.notes) {
        message += `   (ملاحظة: ${item.notes})\n`;
      }
    });

    message += `--------------------------------\n`;
    message += `💵 *المجموع قبل الخصم:* ${cartSubtotal} ج.م\n`;
    if (appliedDiscount > 0) {
      message += `🎁 *خصم الولاء والمكافآت:* -${appliedDiscount} ج.م\n`;
    }
    if (orderType === 'delivery') {
      message += `🛵 *خدمة التوصيل:* ${isFreeDeliveryForGold ? 'مجاناً (ميزة العضوية الذهبية VIP)' : `${deliveryFee} ج.م`}\n`;
    }
    message += `💰 *الإجمالي النهائي:* ${grandTotal} ج.م\n`;

    if (currentMember) {
      message += `⭐ *نادي وفاء الدمشقي:* عضو ${currentMember.tier.toUpperCase()} (${currentMember.points} نقطة)\n`;
      if (appliedReward) {
        message += `🎉 *المكافأة المستبدلة:* ${appliedReward.title} (-${appliedReward.pointsRequired} نقطة)\n`;
      }
      message += `✨ *النقاط المكتسبة من الطلب:* +${expectedPoints} نقطة\n`;
    }

    if (specialNotes) {
      message += `📝 *ملاحظات عامة:* ${specialNotes}\n`;
    }
    message += `\nشكراً لكم ونتطلع لتأكيد الطلب!`;

    // Process points in local state
    const processed = completeOrderLoyaltyProcessing(grandTotal);
    if (processed) {
      setEarnedPointsNotification(processed.pointsEarned);
    }

    const encoded = encodeURIComponent(message);
    const cleanPhone = restaurantInfo.whatsapp.replace(/^0+/, '');
    window.open(`https://wa.me/20${cleanPhone}?text=${encoded}`, '_blank');
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 md:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="text-base font-bold text-stone-900">سلة طلباتك</h2>
              <span className="text-xs font-mono text-stone-500">
                ({cart.reduce((a, b) => a + b.quantity, 0)} صنف)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-lg transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* Loyalty Status Ribbon in Cart */}
            {currentMember ? (
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center text-xs font-bold">
                    <Crown className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-950">
                      مرحباً، {currentMember.name}
                    </p>
                    <p className="text-[11px] text-amber-800">
                      رصيدك: <span className="font-mono font-bold tabular-nums">{currentMember.points}</span> نقطة (عضوية {currentMember.tier})
                    </p>
                  </div>
                </div>
                <a
                  href="#loyalty"
                  onClick={() => setIsCartOpen(false)}
                  className="text-[11px] font-bold text-amber-900 underline"
                >
                  استبدال نقاط
                </a>
              </div>
            ) : (
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-700" />
                    <span>اكسب نقاط وفاء مع هذا الطلب!</span>
                  </span>
                  <span className="text-[10px] text-amber-800 font-semibold bg-amber-100 px-1.5 py-0.5 rounded">
                    +50 نقطة هدية
                  </span>
                </div>
                <form onSubmit={handleQuickLogin} className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="أدخل هاتفك لتفعيل النقاط"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-900 text-white font-bold text-xs rounded-lg whitespace-nowrap"
                  >
                    تفعيل
                  </button>
                </form>
              </div>
            )}

            {/* Active Redeemed Reward Tag */}
            {appliedReward && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-emerald-900 block">{appliedReward.title}</span>
                    <span className="text-[11px] text-emerald-700">تم خصم {appliedReward.pointsRequired} نقطة من الرصيد</span>
                  </div>
                </div>
                <button
                  onClick={removeAppliedReward}
                  className="text-stone-400 hover:text-rose-600 p-1"
                  title="إلغاء المكافأة"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* If Cart is Empty */}
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-800 font-bold text-base">سلتك فارغة حالياً</p>
                <p className="text-stone-500 text-xs mt-1">تصفح المنيو واختر ما تشتهيه من الشاورما والوجبات السورية</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-amber-800 transition-colors"
                >
                  العودة لقائمة الطعام
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                        item.isRewardItem
                          ? 'bg-emerald-50/70 border-emerald-300'
                          : 'bg-stone-50 border-stone-200/80'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate flex items-center gap-1">
                          <span>{item.menuItem.name}</span>
                          {item.isRewardItem && (
                            <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                              مكافأة 🎁
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-amber-900 font-mono tabular-nums">
                            {item.isRewardItem ? '0 ج.م مجاناً' : `${item.menuItem.price * item.quantity} ج.م`}
                          </span>
                          {!item.isRewardItem && (
                            <span className="text-[11px] text-stone-400">
                              ({item.menuItem.price} ج.م للواحد)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls (disabled for free reward items) */}
                      {!item.isRewardItem ? (
                        <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-1">
                          <button
                            onClick={() => updateCartQuantity(item.menuItem.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                            aria-label="إنقاص"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.menuItem.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                            aria-label="زيادة"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded">
                          قطعة 1
                        </span>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.menuItem.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="flex justify-end">
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-stone-400 hover:text-rose-600 underline"
                    >
                      تفريغ السلة بالكامل
                    </button>
                  </div>
                </div>

                {/* Service Type Selection */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <label className="block text-xs font-bold text-stone-700">طريقة استلام الوجبة:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-2 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-colors ${
                        orderType === 'delivery'
                          ? 'border-amber-700 bg-amber-50 text-amber-900'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Bike className="w-4 h-4 text-amber-700" />
                      <span>توصيل دليفري</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`p-2 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-colors ${
                        orderType === 'takeaway'
                          ? 'border-amber-700 bg-amber-50 text-amber-900'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 text-amber-700" />
                      <span>تيك أواي سفري</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('dineIn')}
                      className={`p-2 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-colors ${
                        orderType === 'dineIn'
                          ? 'border-amber-700 bg-amber-50 text-amber-900'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Utensils className="w-4 h-4 text-amber-700" />
                      <span>تناول بالصالة</span>
                    </button>
                  </div>
                </div>

                {/* Customer Info Form */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">اسم العميل</label>
                    <input
                      type="text"
                      placeholder="الاسم الكريم"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">رقم الهاتف للتأكيد</label>
                    <input
                      type="tel"
                      placeholder="مثال: 010... أو 011..."
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">عنوان التوصيل في كفر الزيات</label>
                      <input
                        type="text"
                        placeholder="الشارع، رقم العمارة، علامة مميزة"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">ملاحظات على الطلب (اختياري)</label>
                    <textarea
                      rows={2}
                      placeholder="مثال: زيادة ثومية، بدون خيار مخلل، عيش مقرمش زيادة..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                    />
                  </div>
                </div>
              </>
            )}

            {isSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>تم فتح واتساب وجاري إرسال الطلب للمطعم بنجاح!</span>
                </div>
                {earnedPointsNotification && (
                  <p className="text-[11px] text-emerald-700 font-normal">
                    🎉 تم إضافة +{earnedPointsNotification} نقطة وفاء لرصيدك تلقائياً!
                  </p>
                )}
              </div>
            )}

          </div>

          {/* Footer with Calculations and Ordering Buttons */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono font-bold text-stone-900 tabular-nums">{cartSubtotal} ج.م</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>خصم الولاء والعضوية:</span>
                    <span className="font-mono font-bold tabular-nums">-{appliedDiscount} ج.م</span>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>خدمة التوصيل بكفر الزيات:</span>
                    <span className="font-mono font-bold text-stone-900 tabular-nums">
                      {isFreeDeliveryForGold ? '0 ج.م (مجاناً VIP)' : `${deliveryFee} ج.م`}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>الإجمالي النهائي:</span>
                  <span className="font-mono text-amber-900 tabular-nums">{grandTotal} ج.م</span>
                </div>

                {/* Anticipated Points Badge */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-amber-800 bg-amber-50 px-2 py-1 rounded">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>ستكسب من هذا الطلب:</span>
                  </span>
                  <span className="font-mono font-bold tabular-nums">+{expectedPoints} نقطة وفاء</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>إرسال الطلب عبر واتساب</span>
                </button>

                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>اتصال هاتفي للتأكيد</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
