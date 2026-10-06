export interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  governorate: string;
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  rating: number;
  reviewsCount: number;
  workingHoursText: string;
  openTimeHour: number; // e.g. 11 for 11 AM
  closeTimeHour: number; // e.g. 2 for 2 AM (next day)
  isAlwaysOpenForOrders: boolean;
  announcement: string;
  services: {
    dineIn: { enabled: boolean; title: string; description: string };
    takeaway: { enabled: boolean; title: string; description: string };
    delivery: { enabled: boolean; title: string; description: string; deliveryFee: number };
    phoneBooking: { enabled: boolean; title: string; description: string };
    whatsappOrdering: { enabled: boolean; title: string; description: string };
    directions: { enabled: boolean; title: string; description: string };
  };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'shawarma' | 'meals' | 'grills' | 'appetizers' | 'sandwiches' | 'desserts_drinks';
  image?: string;
  isPopular?: boolean;
  isAvailable: boolean;
  spicyOption?: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  photoUrl?: string;
  tag?: string;
  verifiedVisit?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'food' | 'restaurant' | 'shawarma';
  url: string;
  uploadedBy?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  isRewardItem?: boolean;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold';

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  rewardType: 'free_item' | 'discount_fixed' | 'free_delivery';
  discountAmount?: number;
  freeItemName?: string;
  minTierRequired?: LoyaltyTier;
}

export interface LoyaltyTransaction {
  id: string;
  date: string;
  action: 'earn' | 'redeem' | 'bonus';
  points: number;
  description: string;
}

export interface LoyaltyMember {
  id: string;
  name: string;
  phone: string;
  points: number;
  lifetimePoints: number;
  tier: LoyaltyTier;
  joinDate: string;
  history: LoyaltyTransaction[];
}

export interface LoyaltyConfig {
  enabled: boolean;
  programName: string;
  pointsPerEGP: number; // 0.1 means 1 pt per 10 EGP
  welcomeBonusPoints: number;
  tiers: {
    bronze: { minPoints: number; nameAr: string; multiplier: number; perks: string[] };
    silver: { minPoints: number; nameAr: string; multiplier: number; perks: string[] };
    gold: { minPoints: number; nameAr: string; multiplier: number; perks: string[] };
  };
}
