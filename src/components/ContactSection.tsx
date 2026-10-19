import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import {
  translations,
  WHATSAPP_NUMBER,
  WHATSAPP_INTL_NUMBER,
  WHATSAPP_URL,
} from '../constants/translations';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#070D1E]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#25D366]/30 text-xs font-semibold text-[#25D366] mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'براہِ راست رابطہ' : 'Direct Communication'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.contact.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Phone & WhatsApp Card */}
          <div className="rounded-3xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-700/80 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6 fill-[#25D366] text-transparent" />
              </div>

              <span className="text-xs font-bold text-[#F5B041] uppercase tracking-wider">
                {t.contact.phoneCardTitle}
              </span>

              <h3 className="text-3xl sm:text-4xl font-black text-white mt-1 mb-2 font-mono tracking-tight">
                {WHATSAPP_NUMBER}
              </h3>

              <p className="text-xs text-slate-400 mb-6">
                International: +{WHATSAPP_INTL_NUMBER}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {t.contact.hoursNote}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold shadow-lg shadow-[#25D366]/25 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>{t.contact.btnWhatsApp}</span>
              </a>

              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#16284F] hover:bg-[#1C3366] border border-[#F5B041]/30 text-[#FFE89E] text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4 text-[#F5B041]" />
                <span>{t.contact.btnCall}</span>
              </a>
            </div>
          </div>

          {/* Location & Future Readiness Card */}
          <div className="rounded-3xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-700/80 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#162A56] border border-[#F5B041]/40 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6 text-[#F5B041]" />
              </div>

              <span className="text-xs font-bold text-[#F5B041] uppercase tracking-wider">
                {t.contact.locationCardTitle}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-3">
                {t.contact.locationText}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ur'
                      ? 'مقامی تصدیق شدہ سروس — براہ راست رابطہ'
                      : 'Locally verified delivery operations with direct dispatch'}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#F5B041] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'ur'
                      ? 'موبائل ایپ کی تیاری جاری ہے — فون اور واٹس ایپ فعال ہے'
                      : 'Mobile application is in progress — Phone & WhatsApp are active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Ready for verified contact additions in Prompt 2 */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              {lang === 'ur'
                ? 'کسی بھی سوال یا پارسل بکنگ کے لیے آپ ہم سے صبح یا شام کسی بھی وقت فون یا واٹس ایپ پر رہنمائی لے سکتے ہیں۔'
                : 'For inquiries or parcel arrangements, reach our team via phone or WhatsApp.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
