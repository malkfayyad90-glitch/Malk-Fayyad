import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RestaurantInfo,
  MenuItem,
  Review,
  GalleryPhoto,
  CartItem,
  LoyaltyConfig,
  LoyaltyReward,
  LoyaltyMember,
  LoyaltyTier,
  LoyaltyTransaction
} from '../types/restaurant';
import {
  DEFAULT_RESTAURANT_INFO,
  DEFAULT_MENU_ITEMS,
  DEFAULT_REVIEWS,
  DEFAULT_GALLERY_PHOTOS,
  DEFAULT_LOYALTY_CONFIG,
  DEFAULT_LOYALTY_REWARDS,
  DEFAULT_MEMBERS
} from '../data/defaultData';

interface RestaurantContextType {
  restaurantInfo: RestaurantInfo;
  updateRestaurantInfo: (updated: Partial<RestaurantInfo>) => void;
  resetToDefaults: () => void;

  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  updatePrice: (id: string, newPrice: number) => void;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (id: string) => void;

  photos: GalleryPhoto[];
  addPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;

  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string, isRewardItem?: boolean) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  appliedDiscount: number;
  cartTotal: number;
  cartItemsCount: number;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;

  isRestaurantCurrentlyOpen: boolean;

  // Loyalty Program State & Actions
  loyaltyConfig: LoyaltyConfig;
  updateLoyaltyConfig: (updated: Partial<LoyaltyConfig>) => void;
  loyaltyRewards: LoyaltyReward[];
  addLoyaltyReward: (reward: Omit<LoyaltyReward, 'id'>) => void;
  deleteLoyaltyReward: (id: string) => void;
  
  members: LoyaltyMember[];
  currentMember: LoyaltyMember | null;
  loginMemberByPhone: (phone: string) => boolean;
  registerMember: (name: string, phone: string) => LoyaltyMember;
  logoutMember: () => void;
  
  appliedReward: LoyaltyReward | null;
  applyRewardToCart: (reward: LoyaltyReward) => { success: boolean; message: string };
  removeAppliedReward: () => void;
  completeOrderLoyaltyProcessing: (orderTotal: number) => { pointsEarned: number } | null;
}

const STORAGE_KEYS = {
  INFO: 'dimashqi_restaurant_info_v2',
  MENU: 'dimashqi_menu_items_v2',
  REVIEWS: 'dimashqi_reviews_v2',
  PHOTOS: 'dimashqi_photos_v2',
  LOYALTY_CONFIG: 'dimashqi_loyalty_config_v2',
  LOYALTY_REWARDS: 'dimashqi_loyalty_rewards_v2',
  LOYALTY_MEMBERS: 'dimashqi_loyalty_members_v2',
  CURRENT_MEMBER_PHONE: 'dimashqi_current_member_phone_v2'
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Restaurant Info
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      return saved ? JSON.parse(saved) : DEFAULT_RESTAURANT_INFO;
    } catch {
      return DEFAULT_RESTAURANT_INFO;
    }
  });

  // Menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      return saved ? JSON.parse(saved) : DEFAULT_MENU_ITEMS;
    } catch {
      return DEFAULT_MENU_ITEMS;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  // Photos
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PHOTOS);
      return saved ? JSON.parse(saved) : DEFAULT_GALLERY_PHOTOS;
    } catch {
      return DEFAULT_GALLERY_PHOTOS;
    }
  });

  // Loyalty Config
  const [loyaltyConfig, setLoyaltyConfig] = useState<LoyaltyConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOYALTY_CONFIG);
      return saved ? JSON.parse(saved) : DEFAULT_LOYALTY_CONFIG;
    } catch {
      return DEFAULT_LOYALTY_CONFIG;
    }
  });

  // Loyalty Rewards
  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOYALTY_REWARDS);
      return saved ? JSON.parse(saved) : DEFAULT_LOYALTY_REWARDS;
    } catch {
      return DEFAULT_LOYALTY_REWARDS;
    }
  });

  // Loyalty Members
  const [members, setMembers] = useState<LoyaltyMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOYALTY_MEMBERS);
      return saved ? JSON.parse(saved) : DEFAULT_MEMBERS;
    } catch {
      return DEFAULT_MEMBERS;
    }
  });

  // Active Logged-in Loyalty Member
  const [currentMemberPhone, setCurrentMemberPhone] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_MEMBER_PHONE) || '01001234567'; // Default sample member
    } catch {
      return '01001234567';
    }
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedReward, setAppliedReward] = useState<LoyaltyReward | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(restaurantInfo)); } catch {}
  }, [restaurantInfo]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems)); } catch {}
  }, [menuItems]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews)); } catch {}
  }, [reviews]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos)); } catch {}
  }, [photos]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.LOYALTY_CONFIG, JSON.stringify(loyaltyConfig)); } catch {}
  }, [loyaltyConfig]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.LOYALTY_REWARDS, JSON.stringify(loyaltyRewards)); } catch {}
  }, [loyaltyRewards]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.LOYALTY_MEMBERS, JSON.stringify(members)); } catch {}
  }, [members]);

  useEffect(() => {
    try {
      if (currentMemberPhone) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_MEMBER_PHONE, currentMemberPhone);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_MEMBER_PHONE);
      }
    } catch {}
  }, [currentMemberPhone]);

  // Derived currentMember
  const currentMember = members.find((m) => m.phone === currentMemberPhone) || null;

  // Helper to calculate tier
  const calculateTier = (points: number): LoyaltyTier => {
    if (points >= loyaltyConfig.tiers.gold.minPoints) return 'gold';
    if (points >= loyaltyConfig.tiers.silver.minPoints) return 'silver';
    return 'bronze';
  };

  // Update Restaurant Info
  const updateRestaurantInfo = (updated: Partial<RestaurantInfo>) => {
    setRestaurantInfo((prev) => ({ ...prev, ...updated }));
  };

  const updateLoyaltyConfig = (updated: Partial<LoyaltyConfig>) => {
    setLoyaltyConfig((prev) => ({ ...prev, ...updated }));
  };

  // Reset to original seeds
  const resetToDefaults = () => {
    setRestaurantInfo(DEFAULT_RESTAURANT_INFO);
    setMenuItems(DEFAULT_MENU_ITEMS);
    setReviews(DEFAULT_REVIEWS);
    setPhotos(DEFAULT_GALLERY_PHOTOS);
    setLoyaltyConfig(DEFAULT_LOYALTY_CONFIG);
    setLoyaltyRewards(DEFAULT_LOYALTY_REWARDS);
    setMembers(DEFAULT_MEMBERS);
    setCurrentMemberPhone('01001234567');
    setAppliedReward(null);
    setCart([]);
  };

  // Menu actions
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `menu-custom-${Date.now()}`
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updatePrice = (id: string, newPrice: number) => {
    if (newPrice < 0) return;
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
  };

  // Review actions
  const addReview = (newRev: Omit<Review, 'id' | 'date'>) => {
    const created: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'الآن',
      verifiedVisit: true
    };
    setReviews((prev) => [created, ...prev]);

    // Recalculate average
    setRestaurantInfo((prev) => {
      const allRatings = [created.rating, ...reviews.map((r) => r.rating)];
      const avg = Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
      return {
        ...prev,
        rating: avg,
        reviewsCount: prev.reviewsCount + 1
      };
    });

    // If logged in, reward customer with 20 bonus review points!
    if (currentMember) {
      setMembers((prev) =>
        prev.map((m) => {
          if (m.phone === currentMember.phone) {
            const newPoints = m.points + 20;
            return {
              ...m,
              points: newPoints,
              lifetimePoints: m.lifetimePoints + 20,
              tier: calculateTier(newPoints),
              history: [
                {
                  id: `tx-rev-${Date.now()}`,
                  date: new Date().toLocaleDateString('ar-EG'),
                  action: 'bonus',
                  points: 20,
                  description: 'مكافأة كتابة تقييم وتجربة طعام في مطعم الدمشقي'
                },
                ...m.history
              ]
            };
          }
          return m;
        })
      );
    }
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Gallery actions
  const addPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `photo-${Date.now()}`
    };
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  // Loyalty Rewards management
  const addLoyaltyReward = (reward: Omit<LoyaltyReward, 'id'>) => {
    const newReward: LoyaltyReward = {
      ...reward,
      id: `rew-${Date.now()}`
    };
    setLoyaltyRewards((prev) => [...prev, newReward]);
  };

  const deleteLoyaltyReward = (id: string) => {
    setLoyaltyRewards((prev) => prev.filter((r) => r.id !== id));
    if (appliedReward?.id === id) {
      setAppliedReward(null);
    }
  };

  // Loyalty Membership Auth / Registration
  const loginMemberByPhone = (phone: string): boolean => {
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const found = members.find((m) => m.phone === cleanPhone);
    if (found) {
      setCurrentMemberPhone(cleanPhone);
      return true;
    }
    return false;
  };

  const registerMember = (name: string, phone: string): LoyaltyMember => {
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const existing = members.find((m) => m.phone === cleanPhone);
    if (existing) {
      setCurrentMemberPhone(cleanPhone);
      return existing;
    }

    const bonus = loyaltyConfig.welcomeBonusPoints;
    const newMember: LoyaltyMember = {
      id: `mem-${Date.now()}`,
      name: name.trim(),
      phone: cleanPhone,
      points: bonus,
      lifetimePoints: bonus,
      tier: calculateTier(bonus),
      joinDate: new Date().toLocaleDateString('ar-EG'),
      history: [
        {
          id: `tx-welcome-${Date.now()}`,
          date: new Date().toLocaleDateString('ar-EG'),
          action: 'bonus',
          points: bonus,
          description: `مكافأة الانضمام الترحيبية لنادي وفاء الدمشقي (${bonus} نقطة)`
        }
      ]
    };

    setMembers((prev) => [newMember, ...prev]);
    setCurrentMemberPhone(cleanPhone);
    return newMember;
  };

  const logoutMember = () => {
    setCurrentMemberPhone(null);
    setAppliedReward(null);
  };

  // Apply Reward to Cart
  const applyRewardToCart = (reward: LoyaltyReward) => {
    if (!currentMember) {
      return { success: false, message: 'يرجى تسجيل الدخول برقم هاتفك أولاً لاستبدال النقاط' };
    }
    if (currentMember.points < reward.pointsRequired) {
      return { success: false, message: `رصيد نقاطك (${currentMember.points}) غير كافٍ. تحتاج إلى ${reward.pointsRequired} نقطة.` };
    }

    setAppliedReward(reward);

    // If it's a free item reward, auto add to cart with price 0
    if (reward.rewardType === 'free_item' && reward.freeItemName) {
      const matchingMenuItem = menuItems.find((m) => m.name.includes(reward.freeItemName!) || reward.freeItemName!.includes(m.name));
      const freeItem: MenuItem = matchingMenuItem
        ? { ...matchingMenuItem, id: `reward-${reward.id}`, name: `[هدية ولاء 🎁] ${reward.freeItemName}`, price: 0 }
        : {
            id: `reward-${reward.id}`,
            name: `[هدية ولاء 🎁] ${reward.freeItemName}`,
            description: 'وجبة مجانية مستبدلة بنقاط برنامج وفاء الدمشقي',
            price: 0,
            category: 'shawarma',
            isAvailable: true
          };

      // Add to cart with zero price tag
      addToCart(freeItem, 1, 'هدية مستبدلة بالنقاط', true);
    }

    return { success: true, message: `تم تفعيل مكافأة "${reward.title}" بنجاح!` };
  };

  const removeAppliedReward = () => {
    if (appliedReward?.rewardType === 'free_item') {
      setCart((prev) => prev.filter((item) => !item.isRewardItem));
    }
    setAppliedReward(null);
  };

  // Cart actions
  const addToCart = (item: MenuItem, quantity: number = 1, notes: string = '', isRewardItem: boolean = false) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.menuItem.id === item.id
            ? { ...c, quantity: c.quantity + quantity, notes: notes || c.notes }
            : c
        );
      }
      return [...prev, { menuItem: item, quantity, notes, isRewardItem }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const removing = prev.find((c) => c.menuItem.id === itemId);
      if (removing?.isRewardItem && appliedReward) {
        setAppliedReward(null);
      }
      return prev.filter((c) => c.menuItem.id !== itemId);
    });
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.menuItem.id === itemId) {
            // Reward item cannot have quantity > 1
            if (c.isRewardItem && delta > 0) return c;
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedReward(null);
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  // Applied discount from rewards or tier
  let appliedDiscount = 0;
  if (appliedReward?.rewardType === 'discount_fixed' && appliedReward.discountAmount) {
    appliedDiscount += appliedReward.discountAmount;
  }
  // Silver/Gold tier extra discounts if applicable
  if (currentMember?.tier === 'silver') {
    // 5% additional customer loyalty discount
    appliedDiscount += Math.round(cartSubtotal * 0.05);
  } else if (currentMember?.tier === 'gold') {
    // 10% VIP loyalty discount
    appliedDiscount += Math.round(cartSubtotal * 0.10);
  }

  // Ensure discount doesn't exceed subtotal
  appliedDiscount = Math.min(appliedDiscount, cartSubtotal);

  const cartTotal = Math.max(0, cartSubtotal - appliedDiscount);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Complete loyalty points processing after order submission
  const completeOrderLoyaltyProcessing = (orderFinalAmount: number) => {
    if (!currentMember) return null;

    // Deduct points if reward was redeemed
    const pointsDeducted = appliedReward ? appliedReward.pointsRequired : 0;

    // Calculate points earned based on spending & tier multiplier
    const tierMultiplier = loyaltyConfig.tiers[currentMember.tier].multiplier;
    const basePoints = Math.floor(orderFinalAmount * loyaltyConfig.pointsPerEGP);
    const earned = Math.round(basePoints * tierMultiplier);

    const netChange = earned - pointsDeducted;
    const updatedPoints = Math.max(0, currentMember.points + netChange);
    const updatedLifetime = currentMember.lifetimePoints + earned;
    const newTier = calculateTier(updatedLifetime);

    const newTransactions: LoyaltyTransaction[] = [];
    if (pointsDeducted > 0 && appliedReward) {
      newTransactions.push({
        id: `tx-red-${Date.now()}`,
        date: new Date().toLocaleDateString('ar-EG'),
        action: 'redeem' as const,
        points: -pointsDeducted,
        description: `استبدال مكافأة: ${appliedReward.title}`
      });
    }
    if (earned > 0) {
      newTransactions.push({
        id: `tx-earn-${Date.now()}`,
        date: new Date().toLocaleDateString('ar-EG'),
        action: 'earn' as const,
        points: earned,
        description: `نقاط مشتريات وجبة بقيمة ${orderFinalAmount} ج.م (مضاعف: ${tierMultiplier}x)`
      });
    }

    setMembers((prev) =>
      prev.map((m) =>
        m.phone === currentMember.phone
          ? {
              ...m,
              points: updatedPoints,
              lifetimePoints: updatedLifetime,
              tier: newTier,
              history: [...newTransactions, ...m.history]
            }
          : m
      )
    );

    // Reset applied reward
    setAppliedReward(null);

    return { pointsEarned: earned };
  };

  // Check if open
  const isRestaurantCurrentlyOpen = (() => {
    if (restaurantInfo.isAlwaysOpenForOrders) return true;
    const now = new Date();
    const currentHour = now.getHours();
    const { openTimeHour, closeTimeHour } = restaurantInfo;
    if (closeTimeHour < openTimeHour) {
      return currentHour >= openTimeHour || currentHour < closeTimeHour;
    } else {
      return currentHour >= openTimeHour && currentHour < closeTimeHour;
    }
  })();

  return (
    <RestaurantContext.Provider
      value={{
        restaurantInfo,
        updateRestaurantInfo,
        resetToDefaults,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updatePrice,
        reviews,
        addReview,
        deleteReview,
        photos,
        addPhoto,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        appliedDiscount,
        cartTotal,
        cartItemsCount,
        isCartOpen,
        setIsCartOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isRestaurantCurrentlyOpen,
        
        // Loyalty
        loyaltyConfig,
        updateLoyaltyConfig,
        loyaltyRewards,
        addLoyaltyReward,
        deleteLoyaltyReward,
        members,
        currentMember,
        loginMemberByPhone,
        registerMember,
        logoutMember,
        appliedReward,
        applyRewardToCart,
        removeAppliedReward,
        completeOrderLoyaltyProcessing
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
