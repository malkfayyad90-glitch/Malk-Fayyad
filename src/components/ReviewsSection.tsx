import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Star, MessageSquarePlus, CheckCircle2, Camera, ThumbsUp, Sparkles, Filter, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { restaurantInfo, reviews, addReview } = useRestaurant();
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // New review form fields
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [tag, setTag] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      authorName: name.trim(),
      rating,
      comment: comment.trim(),
      tag: tag.trim() || 'تجربة زيارة وتذوق',
      photoUrl: photoPreview || undefined
    });

    setName('');
    setComment('');
    setTag('');
    setPhotoPreview(null);
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setShowAddForm(false);
    }, 1800);
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider mb-2">
              <span>آراء وتجارب الزوار</span>
              <span aria-hidden="true">·</span>
              <span>شارع صلاح الدين</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              ماذا يقول عملاء مطعم الدمشقي بكفر الزيات؟
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl">
              تجارب حقيقية من زبائننا الكرام. نعتز بآرائكم ومستمرون في تقديم أعلى جودة للشاورما والمأكولات الشامية.
            </p>
          </div>

          <div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>أضف تقييمك ورأيك بعد الزيارة</span>
            </button>
          </div>
        </div>

        {/* Ratings Summary Card */}
        <div className="p-6 sm:p-8 bg-stone-50 rounded-2xl border border-stone-200/90 mb-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Main Average Score */}
          <div className="md:col-span-4 text-center md:text-right border-b md:border-b-0 md:border-l md:border-stone-200 pb-6 md:pb-0 md:pl-8">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black text-stone-900 font-mono tabular-nums">
                {restaurantInfo.rating.toFixed(1)}
              </span>
              <span className="text-xl font-bold text-stone-400">/ 5.0</span>
            </div>
            
            <div className="flex justify-center md:justify-start text-amber-500 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(restaurantInfo.rating) ? 'fill-amber-500 text-amber-500' : 'fill-stone-200 text-stone-200'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-stone-700">
              بناءً على <span className="font-mono tabular-nums font-bold">{restaurantInfo.reviewsCount}</span> مراجعة موثقة للزوار
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              موقع متميز بشارع صلاح الدين، كفر الزيات
            </p>
          </div>

          {/* Rating Breakdown & Highlights */}
          <div className="md:col-span-8 space-y-3">
            <h4 className="text-xs font-bold text-stone-800 mb-2">أبرز ما يميز تجربة المطعم بشهادة الزوار:</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-xs font-bold text-stone-900 block mb-1">الشاورما السورية</span>
                <span className="text-[11px] text-stone-500 leading-relaxed block">
                  إشادة خاصة بنكهة التتبيلة والعيش الصاج الطازج المقرمش
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-xs font-bold text-stone-900 block mb-1">عروض شارع صلاح الدين</span>
                <span className="text-[11px] text-stone-500 leading-relaxed block">
                  عروض ووجبات عائلية متجددة ومناسبة لمختلف المناسبات
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-xs font-bold text-stone-900 block mb-1">سرعة التوصيل</span>
                <span className="text-[11px] text-stone-500 leading-relaxed block">
                  خدمة دليفري سريعة للأكل الساخن داخل وخارج كفر الزيات
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Add Review Modal / Form */}
        {showAddForm && (
          <div className="mb-12 p-6 bg-stone-50 rounded-2xl border-2 border-amber-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>شاركنا رأيك في مطعم الدمشقي كفر الزيات</span>
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
                aria-label="إلغاء"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmittedSuccess ? (
              <div className="py-8 text-center bg-emerald-50 rounded-xl text-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <p className="font-bold text-sm">شكراً لك! تم إضافة تقييمك ورأيك بنجاح وتحديث إحصائيات المطعم.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">اسمك الكريم</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد عبد الله"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">تقييمك بالنجوم</label>
                    <div className="flex items-center gap-2 py-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 cursor-pointer transition-colors ${
                              star <= rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-stone-700 mr-2">
                        {rating === 5 ? 'ممتاز جداً' : rating === 4 ? 'جيد جداً' : rating === 3 ? 'متوسط' : 'أقل من المتوقع'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">نوع الوجبة أو التجربة (اختياري)</label>
                    <input
                      type="text"
                      placeholder="مثال: شاورما فراخ، وجبة عربي، توصيل دليفري..."
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">إرفاق صورة للوجبة (اختياري)</label>
                    <label className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-dashed border-stone-300 hover:border-amber-700 rounded-lg cursor-pointer text-xs text-stone-600 transition-colors">
                      <Camera className="w-4 h-4 text-stone-500" />
                      <span>{photoPreview ? 'تم اختيار الصورة (اضغط للتغيير)' : 'اختر صورة من هاتفك أو جهازك'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {photoPreview && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-stone-200">
                    <img src={photoPreview} alt="معاينة الصورة" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-1 right-1 p-0.5 bg-black/70 text-white rounded-full text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">تفاصيل تجربتك ورأيك الصادق</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="اكتب عن جودة الطعام، النظافة، طعم الشاورما، المعاملة والخدمة..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 bg-white border border-stone-200 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm"
                  >
                    نشر التقييم الآن
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Filter Reviews Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs text-stone-500 flex items-center gap-1 shrink-0 ml-2">
            <Filter className="w-3.5 h-3.5" />
            <span>تصفية:</span>
          </span>
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterRating === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            جميع المراجعات ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterRating === 5
                ? 'bg-amber-700 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            5 نجوم فقط ({reviews.filter((r) => r.rating === 5).length})
          </button>
          <button
            onClick={() => setFilterRating(4)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterRating === 4
                ? 'bg-amber-700 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            4 نجوم ({reviews.filter((r) => r.rating === 4).length})
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between hover:border-amber-200 transition-colors"
            >
              <div>
                
                {/* Author & Rating Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                      <span>{rev.authorName}</span>
                      {rev.verifiedVisit && (
                        <span title="زيارة موثقة">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      <span>{rev.date}</span>
                      {rev.tag && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 font-medium">{rev.tag}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>

                {/* Optional Customer Attached Photo */}
                {rev.photoUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden h-36 border border-stone-200">
                    <img
                      src={rev.photoUrl}
                      alt="صورة ملتقطة من زوار مطعم الدمشقي"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-stone-400" />
                  <span>تقييم موثق لفرع شارع صلاح الدين</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
