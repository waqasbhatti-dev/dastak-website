import React from 'react';
import { ShieldCheck, HeartHandshake, PhoneCall, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations, WHATSAPP_URL, WHATSAPP_NUMBER } from '../constants/translations';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#091124]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{lang === 'ur' ? 'ہمارا تعارف اور عزم' : 'Our Story & Commitment'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.about.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300">
            {t.about.subtitle}
          </p>
        </div>

        {/* Content Card with Approved Paragraphs */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-700/80 p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Subtle watermark badge */}
          <div
            className="pointer-events-none absolute -bottom-10 -right-10 text-9xl font-black text-slate-800/20 select-none"
            aria-hidden="true"
          >
            دستک
          </div>

          {/* Approved Text Content */}
          <div className="space-y-6 text-slate-200 text-base sm:text-lg leading-relaxed sm:leading-loose text-justify">
            <p className="border-l-4 sm:border-l-0 sm:border-r-4 border-[#F5B041] pl-4 sm:pl-0 sm:pr-4 py-1">
              {t.about.contentParagraph1}
            </p>

            <p>
              {t.about.contentParagraph2}
            </p>

            <p className="bg-[#122347]/40 p-4 sm:p-5 rounded-2xl border border-[#F5B041]/20 font-medium text-white">
              {t.about.contentParagraph3}
            </p>
          </div>

          {/* Three Pillars Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-slate-800">
            {t.about.values.map((v, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#070D1E]/60 border border-slate-800 hover:border-[#F5B041]/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#162A56] flex items-center justify-center text-[#F5B041] mb-2.5">
                  {i === 0 && <ShieldCheck className="w-5 h-5" />}
                  {i === 1 && <PhoneCall className="w-5 h-5 text-[#25D366]" />}
                  {i === 2 && <HeartHandshake className="w-5 h-5 text-[#FFE89E]" />}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{v.title}</h4>
                <p className="text-xs text-slate-400 leading-normal">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick Contact CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#16284F]/60 via-[#0F1E3D] to-[#16284F]/60 border border-[#F5B041]/25">
            <div className="text-center sm:text-start">
              <div className="text-sm font-bold text-white">
                {lang === 'ur' ? 'کوئی سوال ہے یا رہنمائی درکار ہے؟' : 'Have a question or special request?'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'ur' ? `ہم سے فون یا واٹس ایپ پر رابطہ کریں: ${WHATSAPP_NUMBER}` : `Reach us via phone or WhatsApp: ${WHATSAPP_NUMBER}`}
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#25D366]/20 transition-all shrink-0"
            >
              {lang === 'ur' ? 'واٹس ایپ پر رابطہ' : 'Chat on WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
