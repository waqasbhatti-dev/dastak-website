import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Sparkles, PhoneCall } from 'lucide-react';
import { translations, WHATSAPP_URL, WHATSAPP_DISPLAY_PHONE } from '../constants/translations';

export const FaqSection: React.FC = () => {
  const t = translations;
  // Default first item open
  const [openId, setOpenId] = useState<string | null>('area');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#070D1E] border-t border-slate-800/80 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{t.faq.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.faq.title}
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-300">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {t.faq.items.map((item, index) => {
            const isOpen = openId === item.id;
            const headingId = `faq-heading-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border-[#F5B041]/40 shadow-xl shadow-black/40'
                    : 'bg-[#0B1528] border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full min-h-[48px] p-4 sm:p-5 flex items-center justify-between gap-4 text-start rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F5B041] cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#162A56] border border-slate-700/80 text-[#FFE89E] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? 'text-[#FFE89E]' : 'text-white'
                      }`}>
                        {item.q}
                      </span>
                    </span>

                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#070D1E] border border-slate-800 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#F5B041] border-[#F5B041]/30' : 'text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-200"
                  >
                    <p className="mt-2 text-start">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Questions Card */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-[#0F1E3D] via-[#0A1428] to-[#0F1E3D] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F5B041]" />
              <span>{t.faq.askQuestionTitle}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Contact our team directly on WhatsApp or call: {WHATSAPP_DISPLAY_PHONE}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md shadow-[#25D366]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>{t.faq.askWhatsAppBtn}</span>
            </a>

            <a
              href="tel:03049574463"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#070D1E] hover:bg-[#162A56] border border-slate-700 text-[#FFE89E] text-xs font-semibold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#F5B041]" />
              <span>{t.faq.callBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
