import React from 'react';
import { Truck, Car, MessageCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { translations, WHATSAPP_URL } from '../constants/translations';

export const DualServicesSection: React.FC = () => {
  const t = translations.dualServices;

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="dual-services"
      className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#070D1E] border-t border-slate-800/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/35 text-xs font-semibold text-[#FFE89E] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>TWO SERVICES • ONE LOCAL NAME</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.heading}
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-300">
            {t.subheading}
          </p>
        </div>

        {/* Dual Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Service 1: Local Delivery (Existing) */}
          <div className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-800 hover:border-emerald-500/40 shadow-xl shadow-black/40 transition-all duration-300">
            <div>
              {/* Badge & Icon Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-[#25D366] shadow-inner">
                  <Truck className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>{t.statusActive}</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                {t.deliveryTitle}
              </h3>
              <p className="text-xs font-bold text-[#F5B041] mt-1">
                {t.deliveryTagline}
              </p>

              {/* Main Description */}
              <p className="mt-4 text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
                {t.deliveryDesc}
              </p>

              {/* Detailed Context */}
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.deliveryDetail}
              </p>

              {/* Feature Points */}
              <ul className="mt-5 space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Groceries, medicines, food & custom parcel pickup/drop-off</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Doorstep delivery in Jhelum City Housing via WhatsApp dispatch</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-all shadow-md shadow-[#25D366]/20 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>{t.btnContactDelivery}</span>
              </a>

              <a
                href="#services"
                onClick={(e) => scrollToSection(e, '#services')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#FFE89E] hover:text-white bg-[#0F1E3D] hover:bg-[#162A56] border border-slate-700 hover:border-[#F5B041] transition-all"
              >
                <span>Browse Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Service 2: Pick & Drop (New Ride Service Concept) */}
          <div className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#132244] via-[#0C1730] to-[#070D1E] border border-[#F5B041]/40 hover:border-[#F5B041] shadow-2xl shadow-[#F5B041]/5 transition-all duration-300">
            <div>
              {/* Badge & Icon Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-950/40 border border-[#F5B041]/40 flex items-center justify-center text-[#FFE89E] shadow-inner">
                  <Car className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-950/70 text-[#FFE89E] border border-[#F5B041]/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B041] animate-ping" />
                  <span>{t.statusIntro}</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
                <span>{t.pickDropTitle}</span>
                <span className="text-xs font-normal text-slate-400 font-sans">• Local Ride Service</span>
              </h3>
              <p className="text-xs font-bold text-[#FFE89E] mt-1">
                {t.pickDropSubtitle} — {t.pickDropTagline}
              </p>

              {/* Main Description */}
              <p className="mt-4 text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
                {t.pickDropDesc}
              </p>

              {/* Detailed Context */}
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.pickDropDetail}
              </p>

              {/* Feature Points */}
              <ul className="mt-5 space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B041] shrink-0" />
                  <span>Passenger transportation concept similar to inDrive</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B041] shrink-0" />
                  <span>Connecting your pickup point to your chosen destination across Jhelum City</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#blog"
                onClick={(e) => scrollToSection(e, '#blog')}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#070D1E] bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#E5A93C] hover:opacity-95 transition-all shadow-md shadow-[#F5B041]/20 focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
              >
                <span>{t.btnLearnMore}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-[#0F1E3D] hover:bg-[#162A56] border border-slate-700 hover:border-[#F5B041] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Suggested Slogan Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F1E3D]/90 via-[#122347]/90 to-[#0F1E3D]/90 border border-[#F5B041]/30 text-center shadow-xl">
          <p className="text-base sm:text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#FFE89E] tracking-wide">
            {t.sloganBanner}
          </p>
          <p className="mt-1.5 text-xs text-slate-400 max-w-2xl mx-auto">
            Parcel delivery and passenger rides are separate services, each designed for a different customer need with the Dastak commitment to convenience and community-focused reliability.
          </p>
        </div>
      </div>
    </section>
  );
};
