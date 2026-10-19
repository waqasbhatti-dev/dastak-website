import React from 'react';
import {
  ShoppingBag,
  Pill,
  UtensilsCrossed,
  Sparkles,
  PackageSearch,
  Truck,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (serviceType: 'standard' | 'parcel', serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const t = translations[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-[#F5B041]" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-[#25D366]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-[#F5B041]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#FFE89E]" />;
      case 'PackageSearch':
        return <PackageSearch className="w-6 h-6 text-[#38BDF8]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#34D399]" />;
      default:
        return <ShoppingBag className="w-6 h-6 text-[#F5B041]" />;
    }
  };

  return (
    <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#091124]">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#162A56]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#F5B041]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{lang === 'ur' ? 'جامع اور تیز ترسیل' : 'Comprehensive & Swift'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.services.title}
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-300">
            {t.services.subtitle}
          </p>

          {/* Honest Transparency Notice */}
          <div className="mt-6 p-4 rounded-xl bg-[#0F1E3D]/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300 flex items-start gap-3 text-start">
            <Info className="w-5 h-5 text-[#F5B041] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.services.notice}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.services.cards.map((card) => {
            const isParcel = card.id.includes('parcel');

            return (
              <div
                key={card.id}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-800 hover:border-[#F5B041]/40 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-[#F5B041]/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Top Bar with Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#162A56]/60 border border-slate-700/80 flex items-center justify-center group-hover:border-[#F5B041]/50 group-hover:bg-[#162A56] transition-colors shadow-inner">
                      {getIcon(card.icon)}
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                        isParcel
                          ? 'bg-sky-950/60 text-sky-300 border-sky-800/60'
                          : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                      }`}
                    >
                      {isParcel
                        ? lang === 'ur'
                          ? 'پیشگی تصدیق'
                          : 'Verification Req.'
                        : lang === 'ur'
                        ? 'مطلوبہ اشیاء'
                        : 'Custom Items'}
                    </span>
                  </div>

                  {/* Card Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FFE89E] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#F5B041]/80 mt-0.5">
                    {card.enTitle}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onSelectService(isParcel ? 'parcel' : 'standard', card.title)}
                    className="w-full inline-flex items-center justify-between text-xs sm:text-sm font-bold text-[#FFE89E] group-hover:text-white px-3 py-2 rounded-lg bg-[#16284F]/40 hover:bg-[#F5B041] hover:text-[#070D1E] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F5B041]"
                  >
                    <span>
                      {lang === 'ur' ? 'اس سروس کے لیے آرڈر لکھیں' : 'Request This Service'}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${lang === 'ur' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
