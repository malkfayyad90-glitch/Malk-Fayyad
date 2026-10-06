import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';
import { Search, Plus, Check, Edit3, Flame, Utensils, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'جميع الأصناف' },
  { id: 'shawarma', label: 'الشاورما الدمشقية' },
  { id: 'meals', label: 'الوجبات والفتات' },
  { id: 'grills', label: 'المشاوي والشيش' },
  { id: 'appetizers', label: 'المقبلات الشامية' },
  { id: 'sandwiches', label: 'الساندوتشات والصاج' },
  { id: 'desserts_drinks', label: 'الحلويات والمشروبات' }
];

export const MenuSection: React.FC = () => {
  const { menuItems, addToCart, updatePrice, addMenuItem } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(50);
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('shawarma');

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  const handleSavePrice = (id: string) => {
    if (tempPrice > 0) {
      updatePrice(id, tempPrice);
    }
    setEditingPriceId(null);
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemPrice <= 0) return;
    addMenuItem({
      name: newItemName.trim(),
      description: newItemDesc.trim(),
      price: newItemPrice,
      category: newItemCategory,
      isAvailable: true,
      isPopular: false
    });
    setNewItemName('');
    setNewItemDesc('');
    setNewItemPrice(50);
    setIsAddingNewItem(false);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider mb-2">
              <span>قائمة طعام الدمشقي</span>
              <span aria-hidden="true">·</span>
              <span>أسعار محدثة 2026</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              أشهى المأكولات الشامية والشاورما
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl">
              جميع الوجبات محضرة يومياً بأجود المكونات الطازجة والتوابل السورية الأصلية. يمكنك تعديل أي سعر أو إضافة صنف جديد في أي وقت.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingNewItem(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>إضافة صنف جديد للقائمة</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="space-y-4 mb-10">
          
          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وجبة أو سندوتش (شاورما، فتة، كبيبة، بروستد...)"
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                مسح
              </button>
            )}
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add New Item Modal / Accordion */}
        {isAddingNewItem && (
          <div className="mb-10 p-6 bg-white rounded-2xl border-2 border-amber-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-700" />
                <span>إضافة صنف أو وجبة جديدة للمنيو</span>
              </h3>
              <button
                onClick={() => setIsAddingNewItem(false)}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                إلغاء
              </button>
            </div>
            <form onSubmit={handleCreateItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">اسم الصنف</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ساندوتش فاهيتا سوري"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">السعر (ج.م)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">القسم</label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700 bg-white"
                >
                  <option value="shawarma">الشاورما الدمشقية</option>
                  <option value="meals">الوجبات والفتات</option>
                  <option value="grills">المشاوي والشيش</option>
                  <option value="appetizers">المقبلات الشامية</option>
                  <option value="sandwiches">الساندوتشات والصاج</option>
                  <option value="desserts_drinks">الحلويات والمشروبات</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <label className="block text-xs font-medium text-stone-700 mb-1">الوصف والمكونات</label>
                <input
                  type="text"
                  placeholder="مكونات الوجبة أو الساندوتش والصوصات المرفقة"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-amber-700"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNewItem(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg"
                >
                  حفظ الصنف في المنيو
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200">
            <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-base font-bold text-stone-700">لم يتم العثور على وجبات مطابقة</p>
            <p className="text-xs text-stone-500 mt-1">جرّب البحث باسم آخر أو اختر قسماً مختلفاً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isEditingThisPrice = editingPriceId === item.id;
              const wasJustAdded = recentlyAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Item Image slot or fallback */}
                    {item.image ? (
                      <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        {item.isPopular && (
                          <div className="absolute top-3 right-3 bg-amber-700/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                            <Flame className="w-3 h-3 fill-amber-300 text-amber-300" />
                            <span>الأكثر طلباً</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-28 bg-gradient-to-br from-stone-50 to-amber-50/40 p-4 flex items-center justify-between border-b border-stone-100">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                          {item.name.charAt(0)}
                        </div>
                        {item.isPopular && (
                          <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-amber-600 text-amber-600" />
                            الأكثر طلباً
                          </span>
                        )}
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed min-h-[32px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: Price & Purchase Action */}
                  <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                    
                    {/* Price Block (with instant inline edit capability) */}
                    <div>
                      {isEditingThisPrice ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={1}
                            value={tempPrice}
                            onChange={(e) => setTempPrice(Number(e.target.value))}
                            className="w-16 px-1.5 py-1 text-xs border border-amber-600 rounded font-mono font-bold"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSavePrice(item.id)}
                            className="p-1 bg-emerald-600 text-white rounded text-[11px] font-bold"
                          >
                            حفظ
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg font-black text-amber-900 font-mono tabular-nums">
                            {item.price}
                          </span>
                          <span className="text-xs font-semibold text-stone-500">ج.م</span>
                          <button
                            onClick={() => {
                              setEditingPriceId(item.id);
                              setTempPrice(item.price);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-stone-700 transition-opacity"
                            title="تعديل السعر"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Add to order action */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        wasJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-900 hover:bg-amber-800 text-white active:scale-95'
                      }`}
                    >
                      {wasJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تمت الإضافة</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>أضف للطلب</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
