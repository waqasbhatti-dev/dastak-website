import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import {
  translations,
  WHATSAPP_DISPLAY_PHONE,
  WHATSAPP_LOCAL_PHONE,
  WHATSAPP_URL,
  SOCIAL_LINKS,
} from '../constants/translations';

export const Footer: React.FC = () => {
  const t = translations;
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#040814] border-t border-slate-800 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F1E3D] border border-[#F5B041]/40 flex items-center justify-center font-black text-lg text-[#FFE89E]">
                د
              </div>
              <span className="text-xl font-black text-white tracking-wider flex items-center gap-2">
                <span>Dastak</span>
                <span className="text-slate-500 font-normal">|</span>
                <span className="text-xs text-[#F5B041] font-bold px-1.5 py-0.5 rounded bg-[#F5B041]/10 border border-[#F5B041]/30">
                  دستک
                </span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.footer.brandDesc}
            </p>

            <div className="p-2.5 rounded-xl bg-[#0B1528] border border-slate-800 text-[11px] text-[#FFE89E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>{t.footer.serviceNotice}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3.5 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, '#how-it-works')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a
                  href="#service-area"
                  onClick={(e) => handleNavClick(e, '#service-area')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.area}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={(e) => handleNavClick(e, '#blog')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.blog}
                </a>
              </li>
              <li>
                <a
                  href="#feedback"
                  onClick={(e) => handleNavClick(e, '#feedback')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.feedback}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, '#faq')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="hover:text-[#FFE89E] transition-colors"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Service Area & Direct Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3.5 tracking-wide">
              Area & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5B041] shrink-0 mt-0.5" />
                <span>{t.footer.locationLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a href="tel:03049574463" className="hover:text-white font-mono">
                  {WHATSAPP_DISPLAY_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-transparent shrink-0" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline"
                >
                  WhatsApp: {WHATSAPP_LOCAL_PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Social Follow */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3.5 tracking-wide">
              Official Social Channels
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center justify-between p-2 rounded-lg bg-[#0B1528] hover:bg-[#122347] transition-all"
              >
                <span>TikTok (@dastakdeliveryservice)</span>
                <span className="text-[10px] text-[#00F2FE]">Follow ›</span>
              </a>

              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center justify-between p-2 rounded-lg bg-[#0B1528] hover:bg-[#122347] transition-all"
              >
                <span>Facebook Video</span>
                <span className="text-[10px] text-[#1877F2]">Watch ›</span>
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center justify-between p-2 rounded-lg bg-[#0B1528] hover:bg-[#122347] transition-all"
              >
                <span>Instagram Reel</span>
                <span className="text-[10px] text-[#E1306C]">Watch ›</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Dynamic Year */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} Dastak | دستک. {t.footer.copyright}
          </p>

          <p className="text-[11px] text-slate-500">
            Official delivery service in Jhelum City Housing, Jhelum, Pakistan.
          </p>
        </div>
      </div>
    </footer>
  );
};
