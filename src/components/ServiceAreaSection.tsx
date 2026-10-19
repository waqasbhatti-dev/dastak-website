import React from 'react';
import { MapPin, CheckCircle2, AlertTriangle, Navigation, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations, WHATSAPP_INTL_NUMBER } from '../constants/translations';

interface ServiceAreaSectionProps {
  lang: Language;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const verifyLocationWhatsAppUrl = `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
    lang === 'ur'
      ? 'السلام علیکم دستک! میں جہلم سٹی ہاؤسنگ میں ایک مخصوص پتہ / دکان کے لیے ڈیلیوری کی دستیابی معلوم کرنا چاہتا ہوں۔'
      : 'Hello Dastak! I would like to confirm delivery availability for a specific location in Jhelum City Housing.'
  )}`;

  return (
    <section id="service-area" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#070D1E]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{lang === 'ur' ? 'علاقائی دائرہ کار' : 'Geographic Coverage'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.serviceArea.title}
          </h2>

          <div className="mt-3 flex flex-col items-center justify-center gap-1">
            <span className="text-xl sm:text-2xl font-bold text-[#FFE89E]">
              {t.serviceArea.officialNameUrdu}
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-300">
              {t.serviceArea.officialNameEnglish}
            </span>
          </div>
        </div>

        {/* Main Area Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-700/80 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Description & Transparency text */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                {t.serviceArea.desc}
              </p>

              {/* Block & Sector Badges */}
              <div className="p-4 rounded-2xl bg-[#070D1E]/70 border border-slate-800 space-y-2.5">
                <div className="text-xs font-bold text-[#F5B041] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>{lang === 'ur' ? 'احاطہ شدہ علاقے' : 'Covered Sectors'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {t.serviceArea.blocksServed}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Block A', 'Block B', 'Block C', 'Main Boulevard', 'Commercial Center'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#16284F]/60 border border-[#F5B041]/20 text-[11px] font-semibold text-[#FFE89E]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Verified Location Assurance Notice */}
              <div className="p-4 rounded-2xl bg-[#162A56]/30 border border-amber-800/50 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  {t.serviceArea.note}
                </p>
              </div>

              {/* CTA button to confirm availability */}
              <div className="pt-2">
                <a
                  href={verifyLocationWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#25D366]/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>
                    {lang === 'ur'
                      ? 'مقام کی دستیابی واٹس ایپ پر معلوم کریں'
                      : 'Confirm Location Availability on WhatsApp'}
                  </span>
                </a>
              </div>
            </div>

            {/* Visual Vector Representation of Jhelum City Housing */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-2xl bg-[#070D1E] border border-slate-700/80 p-5 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#F5B041]" />
                    <span>Jhelum City Housing</span>
                  </span>
                  <span className="text-[#25D366] text-[10px] bg-[#25D366]/10 px-2 py-0.5 rounded border border-[#25D366]/30 font-bold">
                    ACTIVE ZONE
                  </span>
                </div>

                {/* Vector Layout Map Schematic */}
                <div className="my-4 relative h-48 sm:h-52 rounded-xl bg-gradient-to-br from-[#0B1528] to-[#040814] border border-slate-800 flex items-center justify-center p-3">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#16284f15_1px,transparent_1px),linear-gradient(to_bottom,#16284f15_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* Main Road Line */}
                  <div className="absolute h-1 w-full bg-gradient-to-r from-transparent via-[#F5B041]/50 to-transparent top-1/2 -translate-y-1/2" />
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-slate-700 to-transparent left-1/2 -translate-x-1/2" />

                  {/* Sector Blocks */}
                  <div className="absolute top-4 left-4 p-2 rounded-lg bg-[#0F1E3D] border border-slate-700 text-center">
                    <span className="text-[10px] font-bold text-white block">BLOCK A</span>
                    <span className="text-[8px] text-slate-400">Residential</span>
                  </div>

                  <div className="absolute top-4 right-4 p-2 rounded-lg bg-[#0F1E3D] border border-slate-700 text-center">
                    <span className="text-[10px] font-bold text-white block">BLOCK B</span>
                    <span className="text-[8px] text-slate-400">Residential</span>
                  </div>

                  <div className="absolute bottom-4 left-4 p-2 rounded-lg bg-[#0F1E3D] border border-slate-700 text-center">
                    <span className="text-[10px] font-bold text-white block">BLOCK C</span>
                    <span className="text-[8px] text-slate-400">Residential</span>
                  </div>

                  <div className="absolute bottom-4 right-4 p-2 rounded-lg bg-[#162A56] border border-[#F5B041]/40 text-center">
                    <span className="text-[10px] font-bold text-[#FFE89E] block">MAIN MARKAZ</span>
                    <span className="text-[8px] text-slate-300">Commercial</span>
                  </div>

                  {/* Center Dastak Hub Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#F5B041] opacity-40" />
                      <div className="w-8 h-8 rounded-full bg-[#F5B041] text-[#070D1E] flex items-center justify-center font-black text-xs shadow-lg shadow-[#F5B041]/50">
                        د
                      </div>
                    </div>
                    <span className="mt-1 text-[9px] font-bold text-[#FFE89E] bg-[#070D1E]/90 px-1.5 py-0.5 rounded border border-[#F5B041]/40">
                      DASTAK HUB
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  Jhelum, Punjab, Pakistan • فون اور WhatsApp رسائی
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
