import React from 'react';
import { ExternalLink, Sparkles, Video, PlayCircle } from 'lucide-react';
import { Language } from '../types';
import { translations, SOCIAL_LINKS } from '../constants/translations';

interface SocialSectionProps {
  lang: Language;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const socialCards = [
    {
      id: 'tiktok',
      title: t.social.tiktokTitle,
      desc: t.social.tiktokDesc,
      url: SOCIAL_LINKS.tiktok,
      badge: 'Official TikTok',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.48c1.4-1.39 2.18-3.3 2.18-5.3V8.8a8.3 8.3 0 0 0 4.59 1.39V6.74a4.83 4.83 0 0 1-1-.05Z" />
        </svg>
      ),
      color: 'hover:border-[#FF0050]/50 hover:shadow-[#FF0050]/20 text-[#00F2FE]',
      actionText: lang === 'ur' ? 'ٹک ٹاک پروفائل دیکھیں' : 'View TikTok Profile',
    },
    {
      id: 'facebook',
      title: t.social.facebookTitle,
      desc: t.social.facebookDesc,
      url: SOCIAL_LINKS.facebook,
      badge: 'Shared Video / Reel',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: 'hover:border-[#1877F2]/50 hover:shadow-[#1877F2]/20 text-[#1877F2]',
      actionText: lang === 'ur' ? 'فیس بک ویڈیو دیکھیں' : 'Watch Facebook Video',
    },
    {
      id: 'instagram',
      title: t.social.instagramTitle,
      desc: t.social.instagramDesc,
      url: SOCIAL_LINKS.instagram,
      badge: 'Official Reel',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: 'hover:border-[#E1306C]/50 hover:shadow-[#E1306C]/20 text-[#E1306C]',
      actionText: lang === 'ur' ? 'انسٹاگرام ریل دیکھیں' : 'Watch Instagram Reel',
    },
  ];

  return (
    <section id="social" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#091124]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{lang === 'ur' ? 'آن لائن رابطہ' : 'Stay Connected'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.social.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300">
            {t.social.subtitle}
          </p>

          <p className="mt-3 text-xs text-amber-400/80 max-w-xl mx-auto">
            {t.social.reelNote}
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialCards.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} - ${item.desc}`}
              className={`group flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-700/80 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${item.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#070D1E] border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#FFE89E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-[#FFE89E]">
                <span>{item.actionText}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
