import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GalleryPhoto } from '../types/restaurant';
import { Image, Plus, X, Maximize2, Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { photos, addPhoto } = useRestaurant();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'shawarma' | 'food' | 'restaurant'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New photo form
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCategory, setPhotoCategory] = useState<'food' | 'restaurant' | 'shawarma'>('food');
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploaderName, setUploaderName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedUrl || !photoTitle.trim()) return;

    addPhoto({
      title: photoTitle.trim(),
      category: photoCategory,
      url: uploadedUrl,
      uploadedBy: uploaderName.trim() || 'أحد رواد المطعم'
    });

    setPhotoTitle('');
    setUploadedUrl(null);
    setUploaderName('');
    setShowUploadModal(false);
  };

  const filteredPhotos = photos.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider mb-2">
              <span>ألبوم الصور</span>
              <span aria-hidden="true">·</span>
              <span>جولة بصرية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              صور مطعم الدمشقي وأشهى الأطباق
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl">
              شاهد كواليس تحضير الشاورما، الأطباق والولائم، وصالة استقبال العائلات في شارع صلاح الدين بكفر الزيات قبل زيارتك.
            </p>
          </div>

          <div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>إضافة صورة جديدة للمطعم</span>
            </button>
          </div>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            جميع الصور ({photos.length})
          </button>
          <button
            onClick={() => setActiveTab('shawarma')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'shawarma'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            الشاورما السورية ({photos.filter((p) => p.category === 'shawarma').length})
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'food'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            الأطباق والولائم ({photos.filter((p) => p.category === 'food').length})
          </button>
          <button
            onClick={() => setActiveTab('restaurant')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'restaurant'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            صالة المطعم ({photos.filter((p) => p.category === 'restaurant').length})
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-stone-900 shadow-md cursor-pointer aspect-4/3 border border-stone-200"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <span className="text-[11px] text-amber-300 font-semibold block mb-0.5">
                  {photo.category === 'shawarma' ? 'شاورما سورية' : photo.category === 'restaurant' ? 'صالة المطعم' : 'مأكولات دمشقية'}
                </span>
                <h4 className="text-xs sm:text-sm font-bold line-clamp-2">
                  {photo.title}
                </h4>
                {photo.uploadedBy && (
                  <span className="text-[10px] text-stone-300 block mt-1">
                    بواسطة: {photo.uploadedBy}
                  </span>
                )}
              </div>

              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
              
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 text-white flex items-center justify-between border-t border-stone-800 bg-stone-900">
                <div>
                  <h3 className="text-base font-bold text-stone-100">{selectedPhoto.title}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    مطعم الدمشقي كفر الزيات · شارع صلاح الدين {selectedPhoto.uploadedBy ? `· نشرت بواسطة ${selectedPhoto.uploadedBy}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-bold rounded-lg text-stone-200"
                >
                  إغلاق
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Add Photo Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-700" />
                  <span>إضافة صورة لألبوم مطعم الدمشقي</span>
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-stone-400 hover:text-stone-700 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">عنوان أو وصف الصورة</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: وجبة شاورما عربي مع الصوصات"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">القسم</label>
                    <select
                      value={photoCategory}
                      onChange={(e) => setPhotoCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 bg-white"
                    >
                      <option value="food">الأطباق والولائم</option>
                      <option value="shawarma">الشاورما السورية</option>
                      <option value="restaurant">صالة المطعم</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">اسم المشارك (اختياري)</label>
                    <input
                      type="text"
                      placeholder="اسمك أو الإدارة"
                      value={uploaderName}
                      onChange={(e) => setUploaderName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">اختر ملف الصورة</label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-amber-700 rounded-xl cursor-pointer bg-stone-50 transition-colors">
                    <Image className="w-8 h-8 text-stone-400 mb-2" />
                    <span className="text-xs font-semibold text-stone-700">اضغط لرفع صورة من جهازك</span>
                    <span className="text-[11px] text-stone-400 mt-1">PNG, JPG حتى 10 ميجابايت</span>
                    <input
                      type="file"
                      accept="image/*"
                      required={!uploadedUrl}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadedUrl && (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-stone-200">
                    <img src={uploadedUrl} alt="معاينة" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm"
                  >
                    حفظ ونشر في الألبوم
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
