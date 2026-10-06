import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Apple, Check, X, Share, PlusSquare, ArrowDown, FolderArchive, ExternalLink } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'iphone' | 'code'>('android');

  useEffect(() => {
    // Detect if already installed / standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('لتثبيت التطبيق على جهازك: افتح خيارات المتصفح (⋮) واختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-md">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                تنزيل وتثبيت تطبيق مطعم الدمشقي
              </h3>
              <p className="text-xs text-stone-500">
                على شاشة هاتفك الرئيسية كأي تطبيق رسمي بدون متجر
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-stone-100 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('android')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'android' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>أندرويد (سامسونج/شاومي)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('iphone')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'iphone' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Apple className="w-3.5 h-3.5 text-stone-800" />
            <span>آيفون (iOS Safari)</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'code' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5 text-amber-700" />
            <span>تنزيل الملفات (ZIP)</span>
          </button>
        </div>

        {/* Tab 1: Android Instructions */}
        {activeTab === 'android' && (
          <div className="space-y-4">
            
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>اضغط هنا لتثبيت التطبيق فوراً بنقرة واحدة 📲</span>
              </button>
            )}

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs text-stone-700">
              <p className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">1</span>
                <span>طريقة التثبيت من متصفح Chrome:</span>
              </p>
              
              <div className="space-y-2 pr-6">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-900">•</span>
                  <span>افتح الرابط في متصفح <b>Google Chrome</b> على هاتفك.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-900">•</span>
                  <span>اضغط على زر الخيارات <b>(الثلاث نقاط الرأسية ⋮)</b> في أعلى يمين المتصفح.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-900">•</span>
                  <span>اختر <b>"تثبيت التطبيق" (Install app)</b> أو <b>"إضافة إلى الشاشة الرئيسية" (Add to Home screen)</b>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-stone-900">•</span>
                  <span>سيظهر لك تطبيق مطعم الدمشقي بأيقونته الرسمية على شاشة موبايلك مع باقي التطبيقات ويعمل بملء الشاشة!</span>
                </div>
              </div>
            </div>

            {isInstalled && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>التطبيق مثبت بالفعل على جهازك ويعمل بنجاح!</span>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: iPhone Instructions */}
        {activeTab === 'iphone' && (
          <div className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs text-stone-700">
              <p className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">🍎</span>
                <span>خطوات التثبيت على أجهزة iPhone و iPad (متصفح Safari):</span>
              </p>
              
              <div className="space-y-2.5 pr-2">
                <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-stone-100 flex items-center justify-center shrink-0">
                    <Share className="w-4 h-4 text-blue-600" />
                  </div>
                  <span><b>1.</b> اضغط على زر <b>المشاركة (Share)</b> في الشريط السفلي لمتصفح Safari (أيقونة المربع مع السهم للأعلى ⬆️).</span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-stone-100 flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4 text-stone-700" />
                  </div>
                  <span><b>2.</b> اسحب القائمة لأسفل واختر <b>"إضافة إلى الصفحة الرئيسية" (Add to Home Screen ➕)</b>.</span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span><b>3.</b> اضغط <b>"إضافة" (Add)</b> في أعلى يمين الشاشة.</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 mt-2">
                سيتكون تطبيق مستقل باسم "الدمشقي" على شاشة الآيفون يفتح مباشرة بدون شريط المتصفح!
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Code / Project Files Download */}
        {activeTab === 'code' && (
          <div className="space-y-4 text-xs text-stone-700">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <h4 className="font-bold text-stone-900 text-sm">
                إذا كنت ترغب في تنزيل ملفات المشروع وكود البرمجة كاملاً:
              </h4>

              <div className="space-y-2">
                <p>
                  <b>1. من واجهة Google AI Studio:</b>
                  <br />
                  في أعلى يسار أو يمين نافذة AI Studio، اضغط على زر <b>Export</b> أو <b>Download ZIP</b> لتنزيل جميع ملفات المشروع على كمبيوترك.
                </p>
                <p>
                  <b>2. التصدير إلى GitHub:</b>
                  <br />
                  يمكنك أيضاً ربطه بحساب GitHub الخاص بك لرفع الكود واستضافته على أي استضافة مثل Vercel أو Netlify.
                </p>
                <p>
                  <b>3. تشغيل المشروع على جهازك:</b>
                  <br />
                  افتح المجلد وشغل الأوامر التالية:
                  <code className="block p-2 bg-stone-900 text-amber-300 font-mono text-[11px] rounded mt-1 dir-ltr">
                    npm install<br />
                    npm run dev
                  </code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <p className="text-[11px] text-stone-400">
            مطعم الدمشقي كفر الزيات · يدعم تقنية Progressive Web App (PWA)
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
