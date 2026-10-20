/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, Volume2 } from 'lucide-react';
import { Language } from './types';
import { WHATSAPP_URL, WHATSAPP_NUMBER, translations } from './constants/translations';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { WelcomeVoicePanel } from './components/WelcomeVoicePanel';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { OrderFormSection } from './components/OrderFormSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { AboutSection } from './components/AboutSection';
import { FeedbackSection } from './components/FeedbackSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('ur');
  const [orderType, setOrderType] = useState<'standard' | 'parcel'>('standard');
  const [serviceNotice, setServiceNotice] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync html dir and lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  // Scroll listener for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ur' ? 'en' : 'ur'));
  };

  const handleSelectService = (type: 'standard' | 'parcel', serviceTitle: string) => {
    setOrderType(type);
    setServiceNotice(serviceTitle);
    const target = document.querySelector('#order-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans selection:bg-[#E5A93C] selection:text-[#070D1E]">
      {/* 1. Header and Navigation */}
      <Navbar lang={lang} onToggleLanguage={toggleLanguage} />

      {/* Main Content in Logical Sequence */}
      <main className="flex-1">
        {/* 2. Hero Section: Headline, description, 'Place an Order', 'Our Services' */}
        <Hero3D lang={lang} />

        {/* 3. Welcome Voice Experience: Listen and Stop controls, no autoplay */}
        <section
          id="welcome-voice"
          className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-[#081024] border-t border-slate-800/80 scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto">
            {/* Standard Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
                <Volume2 className="w-3.5 h-3.5 text-[#F5B041]" />
                <span>{t.welcomeVoice.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {t.welcomeVoice.title}
              </h2>

              <p className="mt-2.5 text-sm sm:text-base text-slate-300">
                {t.welcomeVoice.subtitle}
              </p>
            </div>

            <WelcomeVoicePanel currentLang={lang} onLanguageChange={setLang} />
          </div>
        </section>

        {/* 4. Services Section: Supported service categories in consistent card layout */}
        <ServicesSection lang={lang} onSelectService={handleSelectService} />

        {/* 5. How It Works: Three simple ordering steps */}
        <HowItWorksSection lang={lang} />

        {/* 6. Order Form: Existing working form, image, voice, WhatsApp workflow */}
        <OrderFormSection
          lang={lang}
          initialOrderType={orderType}
          selectedServiceNotice={serviceNotice}
        />

        {/* 7. Service Area: Jhelum City Housing, Jhelum, Pakistan */}
        <ServiceAreaSection lang={lang} />

        {/* 8. About Dastak: Service purpose and verified local info */}
        <AboutSection lang={lang} />

        {/* 9. Customer Feedback: 5-star rating and WhatsApp transmission */}
        <FeedbackSection lang={lang} />

        {/* 10. Contact and Social Media: Contact details and official social links */}
        <ContactSection lang={lang} />
      </main>

      {/* I. Footer */}
      <Footer lang={lang} onToggleLanguage={toggleLanguage} />

      {/* Floating Action Buttons (Sticky Quick WhatsApp & Scroll to Top) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            type="button"
            className="w-10 h-10 rounded-full bg-[#0F1E3D] text-[#FFE89E] border border-slate-700 hover:border-[#F5B041] shadow-lg flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#070D1E]"
          aria-label={`Chat with Dastak on WhatsApp ${WHATSAPP_NUMBER}`}
        >
          <MessageCircle className="w-5 h-5 fill-white text-transparent group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            {lang === 'ur' ? 'WhatsApp پر رابطہ کریں' : 'Chat on WhatsApp'}
          </span>
        </a>
      </div>
    </div>
  );
}
