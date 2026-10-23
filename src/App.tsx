/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, Volume2 } from 'lucide-react';
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY_PHONE,
  translations,
} from './constants/translations';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { DualServicesSection } from './components/DualServicesSection';
import { WelcomeVoicePanel } from './components/WelcomeVoicePanel';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { FeedbackSection } from './components/FeedbackSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const t = translations;

  // Enforce English language and LTR layout permanently
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  // Scroll listener for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans selection:bg-[#E5A93C] selection:text-[#070D1E]">
      {/* 1. Header and Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Top Hero Area: Continuous Looping 3D Commercial Video & Brand Lockup */}
        <Hero3D />

        {/* 2B. Two Services Overview: Local Delivery and Pick & Drop Ride Service */}
        <DualServicesSection />

        {/* 3. Welcome Voice Experience: Audio Overview Guide */}
        <section
          id="welcome-voice"
          className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#081024] border-t border-slate-800/80 scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-2.5">
                <Volume2 className="w-3.5 h-3.5 text-[#F5B041]" />
                <span>{t.welcomeVoice.badge}</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {t.welcomeVoice.title}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-300">
                {t.welcomeVoice.subtitle}
              </p>
            </div>

            <WelcomeVoicePanel />
          </div>
        </section>

        {/* 4. Available Services Section: Categorized cards with direct WhatsApp contact */}
        <ServicesSection />

        {/* 5. How Dastak Works Section: Simple 3-step direct WhatsApp process */}
        <HowItWorksSection />

        {/* 6. Service Area: Jhelum City Housing, Jhelum, Pakistan */}
        <ServiceAreaSection />

        {/* 7. About Dastak: Mission, values & story */}
        <AboutSection />

        {/* 7B. Official Blog Article: Introducing Dastak Pick & Drop across Jhelum City */}
        <BlogSection />

        {/* 8. Customer Feedback & Ratings powered exclusively by Firebase */}
        <FeedbackSection />

        {/* 9. Frequently Asked Questions (FAQ) Accordion */}
        <FaqSection />

        {/* 10. Contact & Social Media: Official phone line and verified social links */}
        <ContactSection />
      </main>

      {/* 11. Professional Footer */}
      <Footer />

      {/* Floating Action Buttons: Back to top & Prominent WhatsApp Contact */}
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
          aria-label={`Chat with Dastak on WhatsApp ${WHATSAPP_DISPLAY_PHONE}`}
        >
          <MessageCircle className="w-5 h-5 fill-white text-transparent group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-xs tracking-wide">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
