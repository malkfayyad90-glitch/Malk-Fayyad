import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Utensils, ShoppingBag, Bike, PhoneCall, MessageSquare, MapPinned, ArrowUpRight } from 'lucide-react';

export const ServicesBanner: React.FC = () => {
  const { restaurantInfo } = useRestaurant();

  const servicesList = [
    {
      id: 'dineIn',
      title: restaurantInfo.services.dineIn.title,
      description: restaurantInfo.services.dineIn.description,
      icon: Utensils,
      actionText: 'تفضل بزيارتنا',
      actionHref: '#location',
      accentColor: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      id: 'takeaway',
      title: restaurantInfo.services.takeaway.title,
      description: restaurantInfo.services.takeaway.description,
      icon: ShoppingBag,
      actionText: 'اطلب واستلم سريعاً',
      actionHref: '#menu',
      accentColor: 'text-amber-800 bg-orange-50 border-orange-200'
    },
    {
      id: 'delivery',
      title: restaurantInfo.services.delivery.title,
      description: restaurantInfo.services.delivery.description,
      icon: Bike,
      actionText: 'طلب دليفري للمنزل',
      actionHref: '#menu',
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'phoneBooking',
      title: restaurantInfo.services.phoneBooking.title,
      description: restaurantInfo.services.phoneBooking.description,
      icon: PhoneCall,
      actionText: `اتصل: ${restaurantInfo.phone}`,
      actionHref: `tel:${restaurantInfo.phone}`,
      accentColor: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      id: 'whatsappOrdering',
      title: restaurantInfo.services.whatsappOrdering.title,
      description: restaurantInfo.services.whatsappOrdering.description,
      icon: MessageSquare,
      actionText: 'محادثة فورية',
      actionHref: `https://wa.me/20${restaurantInfo.whatsapp.replace(/^0+/, '')}`,
      isExternal: true,
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'directions',
      title: restaurantInfo.services.directions.title,
      description: restaurantInfo.services.directions.description,
      icon: MapPinned,
      actionText: 'فتح الخريطة',
      actionHref: restaurantInfo.googleMapsUrl,
      isExternal: true,
      accentColor: 'text-rose-700 bg-rose-50 border-rose-200'
    }
  ];

  return (
    <section id="services" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider mb-2">
            <span>خدماتنا المتكاملة</span>
            <span aria-hidden="true">·</span>
            <span>كفر الزيات</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            كل ما تحتاجه لتجربة طعام شامية سهلة وسريعة
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            سواء كنت ترغب في تناول وجبتك داخل صالة المطعم في شارع صلاح الدين أو طلب تيك أواي وتوصيل للمنزل.
          </p>
        </div>

        {/* 6 Grid Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="p-6 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center border mb-4 transition-transform group-hover:scale-105 ${service.accentColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60">
                  <a
                    href={service.actionHref}
                    target={service.isExternal ? '_blank' : undefined}
                    rel={service.isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-800 group-hover:text-amber-800 transition-colors"
                  >
                    <span>{service.actionText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
