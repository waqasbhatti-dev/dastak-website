import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Globe, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { translations, WHATSAPP_URL, WHATSAPP_NUMBER } from '../constants/translations';

interface NavbarProps {
  lang: Language;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.voice, href: '#welcome-voice' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.order, href: '#order-form' },
    { label: t.nav.area, href: '#service-area' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.feedback, href: '#feedback' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070D1E]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-[#F5B041]/15 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#F5B041] rounded-lg p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#122347] via-[#0A1428] to-[#040814] border border-[#F5B041]/40 flex items-center justify-center shadow-md shadow-[#F5B041]/10 group-hover:border-[#F5B041] transition-all">
              <span className="text-xl font-black bg-gradient-to-b from-[#FFE89E] to-[#D4AF37] bg-clip-text text-transparent">
                د
              </span>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#F5B041]/20 to-transparent blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white group-hover:text-[#FFE89E] transition-colors flex items-center gap-1.5">
                DASTAK
                <span className="text-xs font-bold text-[#F5B041] px-1.5 py-0.5 rounded bg-[#F5B041]/10 border border-[#F5B041]/30">
                  دستک
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Jhelum City Housing
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-md transition-all focus:outline-none focus:ring-1 focus:ring-[#F5B041]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-[#F5B041]/30 bg-[#0B1528] text-[#FFE89E] hover:border-[#F5B041] hover:bg-[#122347] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
              title={lang === 'ur' ? 'Switch to English' : 'اردو میں تبدیل کریں'}
              aria-label="Language Switcher"
            >
              <Globe className="w-3.5 h-3.5 text-[#F5B041]" />
              <span>{lang === 'ur' ? 'English' : 'اردو'}</span>
            </button>

            {/* Direct WhatsApp Action */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-md shadow-[#25D366]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>{t.nav.whatsappDirect}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#0F1E3D] text-slate-300 hover:text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5 text-[#F5B041]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-800 bg-[#070D1E]/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-[#F5B041]/20 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-[#FFE89E] hover:bg-[#0F1E3D] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-[#F5B041] opacity-60">›</span>
                </a>
              ))}

              <div className="pt-3 border-t border-slate-800 mt-2 flex flex-col gap-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>WhatsApp: {WHATSAPP_NUMBER}</span>
                </a>

                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F1E3D] text-slate-300 hover:text-white border border-slate-700"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#F5B041]" />
                  <span>Direct Call: {WHATSAPP_NUMBER}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
