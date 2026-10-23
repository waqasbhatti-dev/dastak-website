import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import {
  translations,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY_PHONE,
  WHATSAPP_LOCAL_PHONE,
  WHATSAPP_URL,
  SOCIAL_LINKS,
} from '../constants/translations';

export const ContactSection: React.FC = () => {
  const t = translations;

  const socialLinks = [
    {
      id: 'tiktok',
      title: t.social.tiktokTitle,
      desc: t.social.tiktokDesc,
      url: SOCIAL_LINKS.tiktok,
      badge: 'Official TikTok',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.48c1.4-1.39 2.18-3.3 2.18-5.3V8.8a8.3 8.3 0 0 0 4.59 1.39V6.74a4.83 4.83 0 0 1-1-.05Z" />
        </svg>
      ),
      hoverBorder: 'hover:border-[#00F2FE]/50',
      actionText: 'View TikTok',
    },
    {
      id: 'facebook',
      title: t.social.facebookTitle,
      desc: t.social.facebookDesc,
      url: SOCIAL_LINKS.facebook,
      badge: 'Shared Video',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      hoverBorder: 'hover:border-[#1877F2]/50',
      actionText: 'Watch Video',
    },
    {
      id: 'instagram',
      title: t.social.instagramTitle,
      desc: t.social.instagramDesc,
      url: SOCIAL_LINKS.instagram,
      badge: 'Official Reel',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      hoverBorder: 'hover:border-[#E1306C]/50',
      actionText: 'Watch Reel',
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#070D1E] border-t border-slate-800/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#25D366]/30 text-xs font-semibold text-[#25D366] mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>{t.contact.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            <span>Contact</span>
            <span className="text-[#FFE89E]">Dastak | دستک</span>
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-300">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Unified Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-6 lg:gap-8">
          {/* Primary Phone & WhatsApp Card (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-800 hover:border-[#F5B041]/35 shadow-xl shadow-black/30">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 fill-[#25D366] text-transparent" />
                </div>
                <span className="text-[11px] font-semibold text-[#F5B041] px-2.5 py-1 rounded-full bg-[#070D1E] border border-slate-800">
                  {t.contact.phoneCardTitle}
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight block">
                  {WHATSAPP_DISPLAY_PHONE}
                </span>
                <span className="text-xs text-slate-400 block font-mono">
                  Local dial: {WHATSAPP_LOCAL_PHONE}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {t.contact.hoursNote}
              </p>

              {/* Assurances */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>{t.contact.assurances[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#F5B041] shrink-0" />
                  <span>{t.contact.assurances[1]}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-slate-800/80">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold shadow-lg shadow-[#25D366]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>{t.contact.btnWhatsApp}</span>
              </a>

              <a
                href={`tel:03049574463`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#16284F] hover:bg-[#1C3366] border border-[#F5B041]/30 text-[#FFE89E] text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
              >
                <Phone className="w-4 h-4 text-[#F5B041]" />
                <span>{t.contact.btnCall}</span>
              </a>
            </div>
          </div>

          {/* Location & Social Media Stack (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Location Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-800 shadow-xl shadow-black/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#162A56] border border-[#F5B041]/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#F5B041]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#F5B041] uppercase tracking-wider block">
                    {t.contact.locationCardTitle}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {t.contact.locationText}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.contact.locationDesc}
              </p>
            </div>

            {/* Social Media Links Card */}
            <div className="flex-1 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-800 shadow-xl shadow-black/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#FFE89E] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5B041]" />
                    <span>{t.social.title}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Verified Channels
                  </span>
                </div>

                <div className="space-y-2.5">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 rounded-xl bg-[#070D1E] border border-slate-800 text-xs text-slate-200 transition-all group ${s.hoverBorder}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-400 group-hover:text-white transition-colors">
                          {s.icon}
                        </span>
                        <div>
                          <span className="font-bold block group-hover:text-white">{s.title}</span>
                          <span className="text-[10px] text-slate-400 block">{s.desc}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#FFE89E]">
                        <span>{s.actionText}</span>
                        <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-slate-500 mt-3 pt-2.5 border-t border-slate-800/80">
                {t.social.reelNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
