/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { Language } from './types';
import { WHATSAPP_URL, WHATSAPP_NUMBER } from './constants/translations';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { ServicesSection } from './components/ServicesSection';
import { OrderFormSection } from './components/OrderFormSection';
import { AboutSection } from './components/AboutSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { FeedbackSection } from './components/FeedbackSection';
import { ContactSection } from './components/ContactSection';
import { SocialSection } from './components/SocialSection';
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

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans selection:bg-[#E5A93C] selection:text-[#070D1E]">
      {/* Navbar */}
      <Navbar lang={lang} onToggleLanguage={toggleLanguage} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* A. Hero Section with 3D Wordmark & Slogans & Welcome Voice */}
        <Hero3D lang={lang} onLanguageChange={setLang} />

        {/* B. Our Services */}
        <ServicesSection lang={lang} onSelectService={handleSelectService} />

        {/* C. Place an Order */}
        <OrderFormSection
          lang={lang}
          initialOrderType={orderType}
          selectedServiceNotice={serviceNotice}
        />

        {/* D. About Dastak */}
        <AboutSection lang={lang} />

        {/* E. Service Area */}
        <ServiceAreaSection lang={lang} />

        {/* F. Ratings & Feedback */}
        <FeedbackSection lang={lang} />

        {/* G. Contact Us */}
        <ContactSection lang={lang} />

        {/* H. Social Media */}
        <SocialSection lang={lang} />
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
