import React, { useState } from 'react';
import { RestaurantProvider } from './context/RestaurantContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesBanner } from './components/ServicesBanner';
import { MenuSection } from './components/MenuSection';
import { LoyaltyProgramSection } from './components/LoyaltyProgramSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { DataEditorModal } from './components/DataEditorModal';
import { ShareModal } from './components/ShareModal';
import { InstallAppModal } from './components/InstallAppModal';
import { Share2, Download } from 'lucide-react';

export default function App() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  return (
    <RestaurantProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-['Cairo',sans-serif]">
        {/* Promotional announcement ticker */}
        <AnnouncementBar />

        {/* Top Navigation */}
        <Header
          onOpenShare={() => setIsShareModalOpen(true)}
          onOpenInstall={() => setIsInstallModalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <ServicesBanner />
          <MenuSection />
          <LoyaltyProgramSection />
          <ReviewsSection />
          <GallerySection />
          <LocationContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Quick Action Buttons on bottom */}
        <div className="fixed bottom-5 left-5 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsInstallModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg backdrop-blur-md border border-amber-500 text-xs font-bold transition-all hover:scale-105 active:scale-95"
            title="تنزيل التطبيق على الهاتف"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">تنزيل التطبيق</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-stone-900/90 hover:bg-stone-900 text-amber-400 hover:text-white rounded-full shadow-lg backdrop-blur-md border border-stone-700 text-xs font-bold transition-all hover:scale-105 active:scale-95"
            title="مشاركة رابط المطعم"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">مشاركة الرابط والباركود</span>
          </button>
        </div>

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <DataEditorModal />
        <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
        <InstallAppModal isOpen={isInstallModalOpen} onClose={() => setIsInstallModalOpen(false)} />
      </div>
    </RestaurantProvider>
  );
}

