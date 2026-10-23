import React from 'react';
import { MessageCircle, MapPin, CheckCircle2, ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import {
  translations,
  WHATSAPP_URL,
  WHATSAPP_LOCAL_PHONE,
  WHATSAPP_DISPLAY_PHONE,
} from '../constants/translations';

export const HowItWorksSection: React.FC = () => {
  const t = translations;

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircle':
        return <MessageCircle className="w-6 h-6 text-[#25D366]" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-[#F5B041]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-[#FFE89E]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#F5B041]" />;
    }
  };

  return (
    <section
      id="how-it-works"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#070D1E] border-t border-slate-800/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{t.howItWorks.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.howItWorks.title}
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-300">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {t.howItWorks.steps.map((step, index) => {
            return (
              <div
                key={step.stepNumber}
                className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-800 hover:border-[#F5B041]/40 shadow-xl shadow-black/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#162A56]/60 border border-slate-700/80 flex items-center justify-center group-hover:border-[#F5B041]/40 group-hover:bg-[#162A56] transition-colors shadow-inner">
                      {getStepIcon(step.icon)}
                    </div>

                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFE89E] to-[#F5B041] font-mono tracking-wider">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFE89E] transition-colors mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {step.desc}
                  </p>

                  <div className="p-2.5 rounded-xl bg-[#070D1E]/80 border border-slate-800 text-[11px] text-slate-400">
                    {step.detail}
                  </div>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-[#FFE89E] font-medium">
                  <span>{index === 0 ? WHATSAPP_LOCAL_PHONE : 'Jhelum City Housing'}</span>
                  {index < 2 && (
                    <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                      <span>{t.howItWorks.nextStepLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Note & Direct Action Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F1E3D] via-[#0A1428] to-[#0F1E3D] border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-start">
            <div className="text-sm font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>{t.howItWorks.note}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Official Dispatch Line & WhatsApp: {WHATSAPP_DISPLAY_PHONE}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#25D366]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>{t.howItWorks.actionContact}</span>
            </a>

            <a
              href="tel:03049574463"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#16284F] hover:bg-[#1C3366] border border-[#F5B041]/30 text-[#FFE89E] text-xs sm:text-sm font-semibold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#F5B041]" />
              <span>{t.howItWorks.callContact}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
