import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { LoyaltyReward, LoyaltyTier } from '../types/restaurant';
import {
  Award,
  Gift,
  Coins,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Crown,
  History,
  LogOut,
  UserCheck,
  ArrowRight,
  TrendingUp,
  Percent,
  Bike,
  Flame,
  ShoppingBag
} from 'lucide-react';

export const LoyaltyProgramSection: React.FC = () => {
  const {
    loyaltyConfig,
    loyaltyRewards,
    currentMember,
    loginMemberByPhone,
    registerMember,
    logoutMember,
    applyRewardToCart,
    appliedReward
  } = useRestaurant();

  // Auth / Switch form state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [memberName, setMemberName] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [redemptionSuccessMsg, setRedemptionSuccessMsg] = useState('');

  // Interactive points calculator
  const [calcSpendAmount, setCalcSpendAmount] = useState<number>(300);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      const ok = loginMemberByPhone(phoneNumber);
      if (!ok) {
        setAuthError('رقم الهاتف غير مسجل بالنادي. يمكنك تسجيل حساب جديد والحصول على 50 نقطة ترحيبية فوراً!');
        setAuthMode('register');
      } else {
        setPhoneNumber('');
      }
    } else {
      if (!memberName.trim() || !phoneNumber.trim()) {
        setAuthError('يرجى كتابة الاسم ورقم الهاتف بالكامل');
        return;
      }
      registerMember(memberName, phoneNumber);
      setMemberName('');
      setPhoneNumber('');
    }
  };

  const handleRedeem = (reward: LoyaltyReward) => {
    const res = applyRewardToCart(reward);
    if (res.success) {
      setRedemptionSuccessMsg(res.message);
      setTimeout(() => setRedemptionSuccessMsg(''), 4000);
    } else {
      setAuthError(res.message);
      setTimeout(() => setAuthError(''), 4000);
    }
  };

  // Tier info helpers
  const getTierDetails = (tier: LoyaltyTier) => {
    switch (tier) {
      case 'gold':
        return {
          title: loyaltyConfig.tiers.gold.nameAr,
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
          cardGradient: 'from-amber-950 via-amber-900 to-stone-900',
          accent: 'text-amber-400',
          nextGoal: 'أعلى مستوى (VIP)',
          progressPercent: 100
        };
      case 'silver':
        return {
          title: loyaltyConfig.tiers.silver.nameAr,
          badgeColor: 'bg-slate-200 text-slate-800 border-slate-300',
          cardGradient: 'from-slate-800 via-stone-800 to-slate-900',
          accent: 'text-slate-300',
          nextGoal: `المتبقي للذهبي: ${loyaltyConfig.tiers.gold.minPoints - (currentMember?.points || 0)} نقطة`,
          progressPercent: Math.min(100, Math.round(((currentMember?.points || 0) / loyaltyConfig.tiers.gold.minPoints) * 100))
        };
      case 'bronze':
      default:
        return {
          title: loyaltyConfig.tiers.bronze.nameAr,
          badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
          cardGradient: 'from-amber-900 via-stone-900 to-amber-950',
          accent: 'text-amber-300',
          nextGoal: `المتبقي للفضي: ${Math.max(0, loyaltyConfig.tiers.silver.minPoints - (currentMember?.points || 0))} نقطة`,
          progressPercent: Math.min(100, Math.round(((currentMember?.points || 0) / loyaltyConfig.tiers.silver.minPoints) * 100))
        };
    }
  };

  const tierDetails = currentMember ? getTierDetails(currentMember.tier) : getTierDetails('bronze');

  // Calculator earned points projection
  const calcPointsEarned = Math.round(calcSpendAmount * loyaltyConfig.pointsPerEGP);

  return (
    <section id="loyalty" className="py-16 sm:py-24 bg-[#F5F2EB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{loyaltyConfig.programName}</span>
              <span aria-hidden="true">·</span>
              <span>مكافآت حصرية لكفر الزيات</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              اجمع نقاطك مع كل طلب.. واكسب وجبات وشاورما مجانية!
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl">
              نقدر وفاءكم لمطعم الدمشقي. نمنحك 1 نقطة عن كل 10 جنيهات، مع هدايا فورية وخصومات متصاعدة وترقيات لمستويات أعلى.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded-lg border border-amber-200">
              🎁 هدية ترحيبية {loyaltyConfig.welcomeBonusPoints} نقطة مجاناً عند التسجيل
            </span>
          </div>
        </div>

        {/* Member Status Banner & Digital Membership Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Card Left: Digital Loyalty Card */}
          <div className="lg:col-span-5">
            {currentMember ? (
              <div className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-br ${tierDetails.cardGradient} text-white shadow-xl border border-white/10 relative overflow-hidden`}>
                
                {/* Damascus Arabesque Watermark */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px]"></div>

                <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
                  
                  {/* Top: Brand & Tier Badge */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-amber-300 font-bold tracking-wider">{loyaltyConfig.programName}</p>
                      <h3 className="text-lg font-black text-white mt-0.5">مطعم الدمشقي كفر الزيات</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/20 text-white">
                      <Crown className="w-3.5 h-3.5 text-amber-300" />
                      <span>{tierDetails.title}</span>
                    </span>
                  </div>

                  {/* Middle: Points Balance */}
                  <div className="my-5">
                    <p className="text-xs text-stone-300 mb-1">رصيد نقاطك الحالي المتاح للاستبدال:</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums text-amber-300">
                        {currentMember.points}
                      </span>
                      <span className="text-sm font-bold text-stone-200">نقطة وفاء</span>
                    </div>

                    {/* Progress Bar to next tier */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-stone-300 mb-1">
                        <span>مستوى العضوية: {currentMember.tier.toUpperCase()}</span>
                        <span>{tierDetails.nextGoal}</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-500"
                          style={{ width: `${tierDetails.progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Member Data & History Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                    <div>
                      <p className="font-bold text-stone-100">{currentMember.name}</p>
                      <p className="text-stone-400 font-mono text-[11px] dir-ltr">{currentMember.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowHistoryModal(true)}
                        className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium flex items-center gap-1 transition-colors"
                      >
                        <History className="w-3.5 h-3.5" />
                        <span>سجل النقاط</span>
                      </button>
                      <button
                        onClick={logoutMember}
                        className="p-1.5 text-stone-400 hover:text-white transition-colors"
                        title="تسجيل خروج العضو"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="p-7 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-center mb-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
                    <Coins className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">سجل رقم هاتفك وابدأ كسب النقاط</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    أدخل رقم الهاتف لتتبع رصيدك واستبدال الشاورما والوجبات المجانية فورياً
                  </p>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-3">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">الاسم الكريم</label>
                      <input
                        type="text"
                        required
                        placeholder="اسمك (مثال: محمد السيد)"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">رقم الهاتف (المحمول)</label>
                    <input
                      type="tel"
                      required
                      placeholder="010XXXXXXXX أو 011XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                    />
                  </div>

                  {authError && (
                    <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                      {authError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
                  >
                    {authMode === 'login' ? 'الدخول والاطلاع على رصيدي' : 'تسجيل حساب جديد وحصد 50 نقطة'}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode(authMode === 'login' ? 'register' : 'login');
                        setAuthError('');
                      }}
                      className="text-xs text-amber-800 hover:underline"
                    >
                      {authMode === 'login' ? 'عميل جديد؟ اضغط هنا للتسجيل ونيل الهدية' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Card Right: Three Tiers Explanation & Interactive Calculator */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 3 Tiers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Bronze */}
              <div className={`p-4 rounded-xl border bg-white ${currentMember?.tier === 'bronze' ? 'border-amber-600 ring-2 ring-amber-600/20 shadow-sm' : 'border-stone-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-900">المستوى البرونزي</span>
                  <span className="text-[10px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">0 - 200 نقطة</span>
                </div>
                <p className="text-xs font-semibold text-stone-700 mb-2">صديق الدمشقي</p>
                <ul className="text-[11px] text-stone-500 space-y-1">
                  <li>• كسب 1x نقاط على المشتريات</li>
                  <li>• 50 نقطة ترحيبية فورية</li>
                  <li>• عروض شارع صلاح الدين</li>
                </ul>
              </div>

              {/* Silver */}
              <div className={`p-4 rounded-xl border bg-white ${currentMember?.tier === 'silver' ? 'border-slate-600 ring-2 ring-slate-600/20 shadow-sm' : 'border-stone-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">المستوى الفضي</span>
                  <span className="text-[10px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">201 - 500 نقطة</span>
                </div>
                <p className="text-xs font-semibold text-stone-700 mb-2">عاشق الشامية</p>
                <ul className="text-[11px] text-stone-500 space-y-1">
                  <li>• كسب 1.25x نقاط متسارعة</li>
                  <li>• خصم 5% دائم على السلة</li>
                  <li>• ثومية أو مخلل مجاني</li>
                </ul>
              </div>

              {/* Gold */}
              <div className={`p-4 rounded-xl border bg-white ${currentMember?.tier === 'gold' ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-sm' : 'border-stone-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-amber-500" />
                    المستوى الذهبي
                  </span>
                  <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold">501+ نقطة</span>
                </div>
                <p className="text-xs font-semibold text-stone-700 mb-2">سفير الدمشقي VIP</p>
                <ul className="text-[11px] text-stone-500 space-y-1">
                  <li>• كسب 1.5x نقاط مضاعفة</li>
                  <li>• خصم 10% VIP على كل طلب</li>
                  <li>• توصيل دليفري مجاني دائم</li>
                </ul>
              </div>

            </div>

            {/* Interactive Points Calculator */}
            <div className="p-5 bg-white rounded-xl border border-stone-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-700" />
                  <span>حاسبة نقاط وفاء الدمشقي: كم ستكسب من وجبتك؟</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md">
                  {calcSpendAmount} ج.م مشتريات
                </span>
              </div>

              <input
                type="range"
                min={50}
                max={1000}
                step={25}
                value={calcSpendAmount}
                onChange={(e) => setCalcSpendAmount(Number(e.target.value))}
                className="w-full accent-amber-700 cursor-pointer mb-3"
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="p-2.5 bg-stone-50 rounded-lg">
                  <span className="text-[11px] text-stone-500 block">النقاط المكتسبة</span>
                  <span className="text-lg font-black font-mono text-amber-800 tabular-nums">+{calcPointsEarned}</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg">
                  <span className="text-[11px] text-stone-500 block">هدية يمكن فتحها</span>
                  <span className="text-xs font-bold text-stone-800 block truncate">
                    {calcSpendAmount >= 400 ? 'وجبة عربي دبل' : calcSpendAmount >= 200 ? 'شاورما صاج سوبر' : 'علبة ثومية دمشقية'}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-2.5 bg-stone-50 rounded-lg">
                  <span className="text-[11px] text-stone-500 block">قيمة العائد المالي</span>
                  <span className="text-xs font-bold text-emerald-700 font-mono tabular-nums">~{Math.round(calcSpendAmount * 0.1)} ج.م وفراً</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Redemption Catalog Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-700" />
              <span>سوق مكافآت النقاط: استبدل نقاطك بوجبات وهدايا فورية</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              اضغط على أي مكافأة لتطبيقها مباشرة في سلة طلباتك أثناء الطلب عبر واتساب أو الهاتف
            </p>
          </div>

          {appliedReward && (
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>المكافأة النشطة: {appliedReward.title}</span>
            </div>
          )}
        </div>

        {redemptionSuccessMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{redemptionSuccessMsg} تم تحديث سلتك بنجاح!</span>
          </div>
        )}

        {/* Rewards Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loyaltyRewards.map((reward) => {
            const canAfford = currentMember && currentMember.points >= reward.pointsRequired;
            const isApplied = appliedReward?.id === reward.id;

            return (
              <div
                key={reward.id}
                className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between group ${
                  isApplied
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-stone-200 hover:border-amber-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      <Coins className="w-3.5 h-3.5 text-amber-700" />
                      <span>{reward.pointsRequired} نقطة</span>
                    </span>

                    {reward.minTierRequired && reward.minTierRequired !== 'bronze' && (
                      <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        مستوى {reward.minTierRequired === 'gold' ? 'ذهبي' : 'فضي'} فما فوق
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-stone-900 mb-1 group-hover:text-amber-800 transition-colors">
                    {reward.title}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed mb-4">
                    {reward.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-400">
                    {reward.rewardType === 'free_item' ? (
                      <span className="text-amber-800 font-semibold">وجبة مجانية بالكامل (0 ج.م)</span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">خصم {reward.discountAmount} ج.م فوري</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={isApplied}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-emerald-600 text-white cursor-default'
                        : canAfford
                        ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-sm active:scale-95'
                        : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>مفعلة بالسلة</span>
                      </>
                    ) : canAfford ? (
                      <>
                        <Gift className="w-3.5 h-3.5" />
                        <span>استبدل الآن</span>
                      </>
                    ) : (
                      <span>تحتاج {reward.pointsRequired - (currentMember?.points || 0)} نقطة</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Member Points History Modal */}
        {showHistoryModal && currentMember && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-amber-700" />
                    <span>سجل حركات نقاطك</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{currentMember.name} · {currentMember.phone}</p>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                {currentMember.history.length === 0 ? (
                  <p className="text-xs text-stone-400 text-center py-6">لا توجد حركات سابقة حتى الآن</p>
                ) : (
                  currentMember.history.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-stone-800">{tx.description}</p>
                        <span className="text-[10px] text-stone-400">{tx.date}</span>
                      </div>
                      <span
                        className={`font-mono font-bold tabular-nums text-sm ${
                          tx.points > 0 ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {tx.points > 0 ? `+${tx.points}` : tx.points}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
