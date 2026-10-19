import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, ShoppingCart, Sparkles, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations, WHATSAPP_URL, WHATSAPP_NUMBER } from '../constants/translations';
import { StarParticlesCanvas } from './StarParticlesCanvas';
import { WelcomeVoicePanel } from './WelcomeVoicePanel';

interface Hero3DProps {
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ lang, onLanguageChange }) => {
  const t = translations[lang];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  // Mouse tilt parallax calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Normalized tilt
    const tiltX = -(y / (rect.height / 2)) * 9;
    const tiltY = (x / (rect.width / 2)) * 12;
    setTilt({ x: tiltX, y: tiltY });
    setIsInteracting(true);
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleScrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#order-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-b from-[#070D1E] via-[#0A152E] to-[#070D1E]"
    >
      {/* Dynamic Star Particles Canvas */}
      <StarParticlesCanvas />

      {/* Layered Lighting & Glow Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Core Golden Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[480px] bg-gradient-to-tr from-[#F5B041]/15 via-[#AA771C]/10 to-transparent rounded-full blur-[90px]" />
        {/* Deep Navy Highlight */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-[#1A3670]/25 rounded-full blur-[110px]" />
        {/* Subtle geometric orbital ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[520px] h-[300px] sm:h-[520px] rounded-full border border-[#F5B041]/10 opacity-60 animate-[spin_40s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[680px] h-[380px] sm:h-[680px] rounded-full border border-dashed border-[#F5B041]/10 opacity-30 animate-[spin_70s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Service Area Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1E3D]/80 border border-[#F5B041]/35 shadow-lg shadow-black/40 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-top-3 duration-500">
          <MapPin className="w-4 h-4 text-[#F5B041] animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-[#FFE89E] tracking-wide">
            {t.hero.badge}
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
        </div>

        {/* 3D Cinematic Wordmark Stage */}
        <div className="hero-3d-stage my-2 sm:my-4 w-full flex flex-col items-center select-none">
          <div
            className="floating-3d-card relative px-4 py-3 sm:px-8 sm:py-6"
            style={{
              transform: isInteracting
                ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`
                : undefined,
              transition: isInteracting ? 'transform 0.1s ease-out' : 'transform 0.8s ease-out',
            }}
          >
            {/* Ambient Back Glow Behind Logo */}
            <div className="absolute inset-0 bg-[#F5B041]/10 filter blur-2xl rounded-3xl -z-10" />

            {/* Urdu Brand Display (Calligraphic / Arabic typography) */}
            <div className="urdu-3d-title text-4xl sm:text-5xl md:text-6xl mb-1 tracking-normal font-black drop-shadow-2xl">
              دستک
            </div>

            {/* Main 3D DASTAK Extruded Wordmark */}
            <div className="relative glint-effect inline-block py-1">
              <h1 className="dastak-3d-wordmark text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-[0.14em]">
                DASTAK
              </h1>
            </div>

            {/* Orbiting Golden Star Accents */}
            <div
              className="hidden sm:flex items-center justify-center gap-3 mt-1 text-[#F5B041] text-xs font-semibold tracking-widest uppercase opacity-85"
              aria-hidden="true"
            >
              <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#F5B041]" />
              <Sparkles className="w-3.5 h-3.5 text-[#FFE89E] animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-[11px] text-[#FFE89E]">EXPRESS DELIVERY</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FFE89E] animate-spin" style={{ animationDuration: '8s' }} />
              <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#F5B041]" />
            </div>
          </div>
        </div>

        {/* Primary Slogans (Urdu & English) */}
        <div className="mt-4 sm:mt-6 max-w-2xl mx-auto space-y-2">
          {/* Urdu Slogan */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#FFE89E] to-[#FFFFFF] drop-shadow-md leading-relaxed">
            “{t.taglineUrdu}”
          </p>

          {/* English Slogan */}
          <p className="text-base sm:text-lg md:text-xl font-medium text-slate-300 tracking-wide">
            “{t.taglineEnglish}”
          </p>
        </div>

        {/* Brand Status Box (Service Operating / App Coming Soon) */}
        <div className="mt-6 sm:mt-8 max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0F1E3D]/90 to-[#0A1428]/90 border border-[#F5B041]/30 shadow-xl shadow-black/50 backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#25D366] text-xs sm:text-sm font-bold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
            </span>
            <span>سروس فعال ہے • SERVICE IS CURRENTLY OPERATING</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {t.statusUrdu}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {t.statusEnglish}
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-center gap-1.5 text-[11px] text-amber-300/80">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{t.statusSubtext}</span>
          </div>
        </div>

        {/* Bilingual Welcome Voice Experience Panel */}
        <WelcomeVoicePanel currentLang={lang} onLanguageChange={onLanguageChange} />

        {/* Two Prominent Action Hero Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md px-2">
          {/* Button 1: Direct WhatsApp Contact */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 group relative inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#070D1E]"
          >
            <MessageCircle className="w-5 h-5 fill-white text-transparent group-hover:scale-110 transition-transform" />
            <span>{t.hero.btnWhatsApp}</span>
          </a>

          {/* Button 2: Order on Website */}
          <a
            href="#order-form"
            onClick={handleScrollToOrder}
            className="w-full sm:w-auto flex-1 group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-[#070D1E] bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#E5A93C] hover:from-[#FFF1BD] hover:to-[#F5B041] shadow-lg shadow-[#F5B041]/25 hover:shadow-xl hover:shadow-[#F5B041]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-[#F5B041] focus:ring-offset-2 focus:ring-offset-[#070D1E]"
          >
            <ShoppingCart className="w-5 h-5 text-[#070D1E] group-hover:scale-110 transition-transform" />
            <span>{t.hero.btnOrder}</span>
          </a>
        </div>

        {/* Assurance badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>کوئی رجسٹریشن یا پاس ورڈ کی ضرورت نہیں</span>
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B041]" />
            <span>03049457463 پر فون اور واٹس ایپ رابطہ</span>
          </span>
        </div>
      </div>
    </section>
  );
};
