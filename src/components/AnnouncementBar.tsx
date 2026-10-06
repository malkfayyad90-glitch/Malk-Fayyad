import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, X, ChevronLeft } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { restaurantInfo } = useRestaurant();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !restaurantInfo.announcement) return null;

  return (
    <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-50 px-4 py-2 text-xs sm:text-sm font-medium border-b border-amber-950/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="truncate">{restaurantInfo.announcement}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-200 hover:text-white underline underline-offset-2"
          >
            <span>شاهد العروض</span>
            <ChevronLeft className="w-3 h-3" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-amber-800/80 rounded transition-colors text-amber-300 hover:text-white"
            aria-label="إغلاق الإعلان"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
