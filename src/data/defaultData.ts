import { RestaurantInfo, MenuItem, Review, GalleryPhoto } from '../types/restaurant';

export const DEFAULT_RESTAURANT_INFO: RestaurantInfo = {
  name: 'مطعم الدمشقي كفر الزيات',
  tagline: 'أصالة المطبخ السوري والشامي في قلب كفر الزيات',
  description: 'مطعم الدمشقي كفر الزيات هو مطعم متخصص في تقديم أشهى المأكولات السورية والشامية الأصيلة، ويقع في شارع صلاح الدين بمدينة كفر الزيات، محافظة الغربية، مصر. نتميز بالشاورما السورية الفاخرة، الفتات، والوجبات العائلية بنكهة شامية فريدة، مع خدمات الصالة والتيك أواي والتوصيل السريع.',
  address: 'شارع صلاح الدين، مدينة كفر الزيات، محافظة الغربية، مصر',
  city: 'كفر الزيات',
  governorate: 'محافظة الغربية',
  phone: '01117407700',
  whatsapp: '01117407700',
  googleMapsUrl: 'https://maps.google.com/?q=شارع+صلاح+الدين+كفر+الزيات+الغربية+مصر',
  rating: 4.1,
  reviewsCount: 44,
  workingHoursText: 'يومياً من الساعة 11:00 صباحاً حتى 2:00 بعد منتصف الليل',
  openTimeHour: 11,
  closeTimeHour: 2,
  isAlwaysOpenForOrders: false,
  announcement: '🔥 عروض مستمرة وتجدد دائم في فرع شارع صلاح الدين بكفر الزيات! توصيل سريع لجميع المناطق.',
  services: {
    dineIn: {
      enabled: true,
      title: 'تناول الطعام داخل المطعم',
      description: 'صالة مريحة ومكيفة للعائلات والأفراد بأجواء شامية راقية وخدمة مميزة'
    },
    takeaway: {
      enabled: true,
      title: 'طلب تيك أواي (Takeaway)',
      description: 'تحضير سريع لطلبك وتغليف حراري مميز للاستمتاع بالطعام ساخناً أينما كنت'
    },
    delivery: {
      enabled: true,
      title: 'خدمة توصيل الطلبات دليفري',
      description: 'توصيل فوري وسريع لكافة أنحاء كفر الزيات والقرى المجاورة بأسعار رمزية',
      deliveryFee: 15
    },
    phoneBooking: {
      enabled: true,
      title: 'طلب واتصال مباشر بالهاتف',
      description: 'خط ساخن مخصص للطلبات والاستفسارات على الرقم 01117407700'
    },
    whatsappOrdering: {
      enabled: true,
      title: 'الطلب الفوري عبر واتساب',
      description: 'أرسل تفاصيل طلبك مباشرة على واتساب واستلم التأكيد فورياً'
    },
    directions: {
      enabled: true,
      title: 'الموقع والاتجاهات الدقيقة',
      description: 'موقع مميز في شارع صلاح الدين سهل الوصول مع رابط مباشر للخرائط'
    }
  }
};

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // الشاورما الدمشقية
  {
    id: 'shw-1',
    name: 'شاورما فراخ سوري صاج (سوبر)',
    description: 'شرائح شاورما الدجاج المتبلة بالبهارات الشامية في خبز الصاج مع الثومية الأصلية ومخلل الخيار المقرمش',
    price: 65,
    category: 'shawarma',
    image: '/src/assets/images/dimashqi_hero_shawarma_1791287152912.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'shw-2',
    name: 'شاورما لحم سوري صاج (سوبر)',
    description: 'لحم بقري متبل على الطريقة الدمشقية، بقدونس، بصل متبل بالسماق، وصوص الطحينة الفاخر في خبز الصاج',
    price: 85,
    category: 'shawarma',
    image: '/src/assets/images/dimashqi_hero_shawarma_1791287152912.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'shw-3',
    name: 'ساندوتش شاورما فراخ سوري عادي',
    description: 'شاورما دجاج سوري بالثومية والمخلل بخبز الصاج الشامي الطازج',
    price: 45,
    category: 'shawarma',
    isAvailable: true
  },
  {
    id: 'shw-4',
    name: 'ساندوتش شاورما لحمة سوري عادي',
    description: 'شاورما لحم بلدي بنكهة دمشقية مع الطحينة والمخلل في خبز الصاج',
    price: 60,
    category: 'shawarma',
    isAvailable: true
  },
  {
    id: 'shw-5',
    name: 'وجبة عربي شاورما فراخ دمشقي',
    description: 'ساندوتش صاج مقطع قطع شاورما، يقدم مع بطاطس مقلية ذهبية، ثومية، مخلل مشكل، ومشروب غازي',
    price: 90,
    category: 'shawarma',
    image: '/src/assets/images/dimashqi_crispy_broast_saj_1791287189165.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'shw-6',
    name: 'وجبة عربي دبل مكس (لحم وفراخ)',
    description: 'ساندوتشين صاج مقطعين قطع، بطاطس فارم فرايتس، ثومية عادية وثومية سبايسي، طحينة ومخلل',
    price: 155,
    category: 'shawarma',
    isPopular: true,
    isAvailable: true
  },

  // الوجبات والفتات
  {
    id: 'meal-1',
    name: 'فتة شاورما فراخ دمشقية',
    description: 'أرز بسمتي أصفر مبهر، قطع شاورما فراخ سخنة، عيش سوري محمص مقرمش، صوص ثومية وزبادي مميز',
    price: 85,
    category: 'meals',
    image: '/src/assets/images/dimashqi_syrian_platters_1791287165692.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'meal-2',
    name: 'فتة شاورما لحم دمشقية',
    description: 'أرز بسمتي شرقي، شاورما لحم متبلة، عيش محمص، وصوص الطحينة والزبادي الغني مع رشة لوز وسماق',
    price: 110,
    category: 'meals',
    image: '/src/assets/images/dimashqi_syrian_platters_1791287165692.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'meal-3',
    name: 'فتة مكس شاورما (لحم ودجاج)',
    description: 'أكبر طبق فتة دمشقية يجمع بين نكهتي اللحم والدجاج مع الثومية والطحينة والعيش المحمص المقرمش',
    price: 120,
    category: 'meals',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'meal-4',
    name: 'صينية الدمشقي العائلية (4 - 5 أفراد)',
    description: 'مزيج فاخر من فتة شاورما مشكلة، 4 ساندوتشات شاورما صاج، كبيبة مقلية، بطاطس عائلية، وصوصات مشكلة',
    price: 360,
    category: 'meals',
    image: '/src/assets/images/dimashqi_syrian_platters_1791287165692.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'meal-5',
    name: 'وجبة بروستد دجاج سوري كريسبي (4 قطع)',
    description: '4 قطع دجاج مقرمش بالتتبيلة السورية السرية، بطاطس، ثومية، عيش صاج، وكول سلو طازة',
    price: 130,
    category: 'meals',
    image: '/src/assets/images/dimashqi_crispy_broast_saj_1791287189165.jpg',
    isAvailable: true
  },

  // المشاوي والشيش
  {
    id: 'grill-1',
    name: 'وجبة شيش طاووق سوري على الفحم',
    description: 'شيش طاووق فراخ متبل بالزبادي والليمون والبهار الشامي، أرز بسمتي، خضار مشوي، ثومية، عيش صاج',
    price: 115,
    category: 'grills',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'grill-2',
    name: 'ساندوتش شيش طاووق صاج',
    description: 'قطع شيش طاووق مشوية مع الثومية والخس ومخلل الخيار في عيش صاج محمص',
    price: 60,
    category: 'grills',
    isAvailable: true
  },
  {
    id: 'grill-3',
    name: 'وجبة كفتة مشوية شامية',
    description: 'كفتة لحم بلدي متبلة بالبصل والبقدونس ودبس الرمان، تقدم مع الأرز وسلطة الطحينة والعيش',
    price: 125,
    category: 'grills',
    isAvailable: true
  },

  // المقبلات الشامية
  {
    id: 'app-1',
    name: 'ثومية دمشقية أصلية (كبيرة)',
    description: 'خلطة الثومية الشامية الكريمة الناعمة الغنية بالنكهة بدون أي إضافات صناعية',
    price: 18,
    category: 'appetizers',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'app-2',
    name: 'ثومية سبايسي حارة',
    description: 'ثومية شامية مضاف إليها هريسة الشطة الحلبية الحارة لعشاق الطعم الحراق',
    price: 20,
    category: 'appetizers',
    isAvailable: true
  },
  {
    id: 'app-3',
    name: 'حمص بيروتي بزيت الزيتون',
    description: 'حمص ناعم بالطحينة والليمون وزيت الزيتون البكر مع رشة كمون وسماق',
    price: 30,
    category: 'appetizers',
    isAvailable: true
  },
  {
    id: 'app-4',
    name: 'كبيبة شامية مقلية مقرمشة (4 حبات)',
    description: 'برغل فاخر محشو باللحمة المفرومة المعصجة والمكسرات المقرمشة مقلية بالطلب',
    price: 55,
    category: 'appetizers',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'app-5',
    name: 'بطاطس مقلية بالبهار الشامي',
    description: 'طبق بطاطس فارم فرايتس مقرمشة متبلة بخلطة بهارات الشاورما مع باكت ثومية',
    price: 28,
    category: 'appetizers',
    isAvailable: true
  },

  // الساندوتشات والصاج
  {
    id: 'snd-1',
    name: 'ساندوتش زنجر كريسبي سوبر',
    description: 'صدور دجاج كريسبي حارة، جبنة شيدر، خس، مايونيز وصوص خاص في عيش صاج محمص',
    price: 65,
    category: 'sandwiches',
    isAvailable: true
  },
  {
    id: 'snd-2',
    name: 'ساندوتش برجر لحم سوري عالفحم',
    description: 'برجر لحم مشوي مع صوص المشروم، خس، طماطم، وجبنة شيدر سائحة',
    price: 70,
    category: 'sandwiches',
    isAvailable: true
  },
  {
    id: 'snd-3',
    name: 'كريب شاورما مكس أجبان',
    description: 'عجينة كريب مقرمشة محشوة شاورما فراخ ولحم مع جبنة موتزاريلا ورومي وزيتون',
    price: 75,
    category: 'sandwiches',
    isAvailable: true
  },

  // المشروبات والحلويات
  {
    id: 'drk-1',
    name: 'مهلبية شامية بالمكسرات والعسل',
    description: 'حلوى الحليب الشامي مع المستكة الطبيعية، ماء الزهر، الفستق ورشة عسل',
    price: 25,
    category: 'desserts_drinks',
    isAvailable: true
  },
  {
    id: 'drk-2',
    name: 'مشروب غازي كانز (متنوع)',
    description: 'بيبسي، سفن آب، ميرندا، كوكاكولا مثلجة',
    price: 15,
    category: 'desserts_drinks',
    isAvailable: true
  },
  {
    id: 'drk-3',
    name: 'مياه معدنية طبيعية',
    description: 'زجاجة مياه معدنية نقية مثلجة',
    price: 8,
    category: 'desserts_drinks',
    isAvailable: true
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'م. أحمد الشناوي',
    rating: 5,
    date: 'منذ يومين',
    comment: 'بصراحة أفضل شاورما سوري أكلتها في كفر الزيات بدون منازع! العيش الصاج طازج جداً والثومية مظبوطة بالملي واللحمة متبلة صح. وجود المطعم في شارع صلاح الدين موقعه ممتاز وسهل الوصول.',
    tag: 'شاورما فراخ وعربي',
    verifiedVisit: true,
    photoUrl: '/src/assets/images/dimashqi_hero_shawarma_1791287152912.jpg'
  },
  {
    id: 'rev-2',
    authorName: 'د. ياسمين إبراهيم',
    rating: 5,
    date: 'منذ 5 أيام',
    comment: 'فتة الشاورما الدجاج حكاية! كمية الأرز والعيش المحمص متوازنة جداً والطلب وصل سخن ومغلف بطريقة محترمة ونظيفة. خدمة الدليفري سريعة جداً داخل كفر الزيات.',
    tag: 'فتة شاورما دمشقية',
    verifiedVisit: true
  },
  {
    id: 'rev-3',
    authorName: 'كابتن محمود رجب',
    rating: 4,
    date: 'منذ أسبوع',
    comment: 'وجبة العربي ممتازة والبطاطس مقرمشة ونظيفة. المعاملة داخل صالة المطعم محترمة جداً وسريعة، والأسعار مناسبة جداً مقارنة بجودة الأكل الشامي. بنصح به دائماً.',
    tag: 'وجبة عربي دبل',
    verifiedVisit: true,
    photoUrl: '/src/assets/images/dimashqi_crispy_broast_saj_1791287189165.jpg'
  },
  {
    id: 'rev-4',
    authorName: 'أ. طارق عبد المنعم',
    rating: 4,
    date: 'منذ أسبوعين',
    comment: 'المطعم في شارع صلاح الدين مميز بالعروض المتجددة. طلبت صينية الدمشقي العائلية لعزومة وكانت كافية جداً والأكل طعمه رائع خصوصاً الكبيبة الشامية والشاورما.',
    tag: 'صينية عائلية',
    verifiedVisit: true,
    photoUrl: '/src/assets/images/dimashqi_syrian_platters_1791287165692.jpg'
  },
  {
    id: 'rev-5',
    authorName: 'سارة مصطفى',
    rating: 4,
    date: 'منذ 3 أسابيع',
    comment: 'نظافة ممتازة وثومية مظبوطة مش زفرة. الشاورما اللحمة طعمها بلدي وجودة عالية. التواصل عبر الواتساب سريع وردوا على طلبي في ثواني.',
    tag: 'شاورما لحم وتوصيل',
    verifiedVisit: true
  },
  {
    id: 'rev-6',
    authorName: 'خالد عبد الوهاب',
    rating: 4,
    date: 'منذ شهر',
    comment: 'مكان جميل وقعدة الصالة رايقة ومرتبة. الشيش طاووق كان طري ومتبل بنكهة ليمون وزبادي حلوة أوي. تقييمي 4 من 5 علشان الزحمة في الويك إند بس يستاهل التجربة.',
    tag: 'تناول بالصالة',
    verifiedVisit: true
  }
];

export const DEFAULT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'سيخ الشاورما السورية الفاخرة أثناء التقطيع',
    category: 'shawarma',
    url: '/src/assets/images/dimashqi_hero_shawarma_1791287152912.jpg',
    uploadedBy: 'إدارة مطعم الدمشقي'
  },
  {
    id: 'gal-2',
    title: 'وليمة الأطباق الشامية والفتة والمقبلات',
    category: 'food',
    url: '/src/assets/images/dimashqi_syrian_platters_1791287165692.jpg',
    uploadedBy: 'شيف المطعم'
  },
  {
    id: 'gal-3',
    title: 'صالة المطعم العائلية بشارع صلاح الدين',
    category: 'restaurant',
    url: '/src/assets/images/dimashqi_restaurant_ambiance_1791287177900.jpg',
    uploadedBy: 'فريق العمل'
  },
  {
    id: 'gal-4',
    title: 'وجبات العربي المقرمشة والبروستد الذهبي',
    category: 'food',
    url: '/src/assets/images/dimashqi_crispy_broast_saj_1791287189165.jpg',
    uploadedBy: 'أحد زوار المطعم'
  }
];

export const DEFAULT_LOYALTY_CONFIG: import('../types/restaurant').LoyaltyConfig = {
  enabled: true,
  programName: 'نادي وفاء الدمشقي',
  pointsPerEGP: 0.1, // 1 point per 10 EGP
  welcomeBonusPoints: 50,
  tiers: {
    bronze: {
      minPoints: 0,
      nameAr: 'المستوى البرونزي (صديق الدمشقي)',
      multiplier: 1.0,
      perks: ['كسب 1 نقطة لكل 10 ج.م مشتريات', 'هدية 50 نقطة ترحيبية فورية', 'عروض حصرية في شارع صلاح الدين']
    },
    silver: {
      minPoints: 200,
      nameAr: 'المستوى الفضي (عاشق الشامية)',
      multiplier: 1.25,
      perks: ['كسب 1.25x نقاط على كل طلب', 'طبق ثومية أو مخلل مجاني مع كل وجبة', 'أولوية في تحضير وتوصيل الطلبات']
    },
    gold: {
      minPoints: 500,
      nameAr: 'المستوى الذهبي (سفير الدمشقي VIP)',
      multiplier: 1.5,
      perks: ['كسب 1.5x نقاط مضاعفة', 'توصيل دليفري مجاني دائم', 'ساندوتش شاورما مجاني في عيد ميلادك', 'طاولة مخصصة محجوزة بالصالة']
    }
  }
};

export const DEFAULT_LOYALTY_REWARDS: import('../types/restaurant').LoyaltyReward[] = [
  {
    id: 'rew-1',
    title: 'علبة ثومية دمشقية أصلية مجانية',
    description: 'ثومية شامية طازجة وكريمة مجاناً تضاف لطلبك',
    pointsRequired: 50,
    rewardType: 'free_item',
    freeItemName: 'ثومية دمشقية أصلية',
    minTierRequired: 'bronze'
  },
  {
    id: 'rew-2',
    title: 'طبق بطاطس مقلية بالبهار الشامي مجاناً',
    description: 'بطاطس فارم فرايتس مقرمشة مع بهار الشاورما والخلطة',
    pointsRequired: 80,
    rewardType: 'free_item',
    freeItemName: 'بطاطس مقلية بالبهار الشامي',
    minTierRequired: 'bronze'
  },
  {
    id: 'rew-3',
    title: 'ساندوتش شاورما فراخ صاج سوبر مجاناً',
    description: 'ساندوتش شاورما دجاج سوري كبير بالثومية والمخلل والعيش الصاج',
    pointsRequired: 120,
    rewardType: 'free_item',
    freeItemName: 'شاورما فراخ سوري صاج (سوبر)',
    minTierRequired: 'bronze'
  },
  {
    id: 'rew-4',
    title: 'خصم فوري بقيمة 50 جنيه على طلبك',
    description: 'يخصم مباشرة من إجمالي الفاتورة في السلة',
    pointsRequired: 180,
    rewardType: 'discount_fixed',
    discountAmount: 50,
    minTierRequired: 'silver'
  },
  {
    id: 'rew-5',
    title: 'طبق فتة شاورما فراخ دمشقية مجاناً',
    description: 'أرز بسمتي مبهر، شاورما فراخ، عيش محمص وصوص ثومية وزبادي',
    pointsRequired: 250,
    rewardType: 'free_item',
    freeItemName: 'فتة شاورما فراخ دمشقية',
    minTierRequired: 'silver'
  },
  {
    id: 'rew-6',
    title: 'وجبة عربي دبل مكس مجانية كاملة',
    description: 'ساندوتشين صاج مقطعين، بطاطس، ثومية، مخلل وكانز مجاناً',
    pointsRequired: 400,
    rewardType: 'free_item',
    freeItemName: 'وجبة عربي دبل مكس (لحم وفراخ)',
    minTierRequired: 'gold'
  }
];

export const DEFAULT_MEMBERS: import('../types/restaurant').LoyaltyMember[] = [
  {
    id: 'mem-1',
    name: 'أحمد كمال (زبون دائم)',
    phone: '01001234567',
    points: 140,
    lifetimePoints: 240,
    tier: 'bronze',
    joinDate: '15/01/2026',
    history: [
      { id: 'tx-1', date: '15/01/2026', action: 'bonus', points: 50, description: 'مكافأة الانضمام الترحيبية لنادي وفاء الدمشقي' },
      { id: 'tx-2', date: '02/02/2026', action: 'earn', points: 40, description: 'نقاط طلب وجبة عربي وصينية فتة (400 ج.م)' },
      { id: 'tx-3', date: '20/02/2026', action: 'earn', points: 50, description: 'نقاط طلب شاورما وتوصيل شارع صلاح الدين (500 ج.م)' }
    ]
  }
];

