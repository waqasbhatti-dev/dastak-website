import React from 'react';
import { PenLine, MapPin, Send, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface HowItWorksSectionProps {
  lang: Language;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const steps = [
    {
      num: t.howItWorks.step1Number,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: <PenLine className="w-6 h-6 text-[#F5B041]" />,
      tag: lang === 'ur' ? 'پہلا مرحلہ' : 'Step One',
    },
    {
      num: t.howItWorks.step2Number,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: <MapPin className="w-6 h-6 text-[#38BDF8]" />,
      tag: lang === 'ur' ? 'دوسرا مرحلہ' : 'Step Two',
    },
    {
      num: t.howItWorks.step3Number,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <Send className="w-6 h-6 text-[#25D366]" />,
      tag: lang === 'ur' ? 'تیسرا مرحلہ' : 'Step Three',
    },
  ];

  const handleScrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#order-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#070D1E] border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-800 hover:border-[#F5B041]/35 shadow-xl shadow-black/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Header row with Icon and Step Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#162A56]/60 border border-slate-700/80 flex items-center justify-center shadow-inner">
                    {step.icon}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {step.tag}
                    </span>
                    <span className="text-2xl font-black font-mono text-[#F5B041]/80">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator footer bar */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>
                  {idx === 0
                    ? lang === 'ur'
                      ? 'تحریر، وائس یا تصویر'
                      : 'Text, voice, or photo'
                    : idx === 1
                    ? lang === 'ur'
                      ? 'مکان، گلی اور بلاک'
                      : 'House, street & block'
                    : lang === 'ur'
                    ? 'ایک کلک پر روانگی'
                    : '1-click WhatsApp dispatch'}
                </span>
                <span className="text-[#F5B041]">✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href="#order-form"
            onClick={handleScrollToOrder}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#070D1E] bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#E5A93C] hover:from-[#FFF1BD] hover:to-[#F5B041] shadow-lg shadow-[#F5B041]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
          >
            <span>{t.howItWorks.ctaBtn}</span>
            <ArrowRight className={`w-4 h-4 ${lang === 'ur' ? 'rotate-180' : ''}`} />
          </a>
        </div>
      </div>
    </section>
  );
};
