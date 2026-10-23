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
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { AboutSection } from './components/AboutSection';
import { WelcomeVoicePanel } from './components/WelcomeVoicePanel';
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans selection:bg-[#E5A93C] selection:text-[#070D1E] overflow-x-hidden relative">
      {/* 1. Header and Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pb-16 sm:pb-10">
        {/* 2, 3, 4. Top Hero Area:
            Mobile:
              2. 3D animated hero video at the top
              3. Main headline & short service introduction
              4. Primary contact/action buttons
            Desktop:
              Headline/intro/buttons left, 3D video right */}
        <Hero3D />

        {/* 5. Existing Core Services: Local Delivery & Pick & Drop Ride Service */}
        <DualServicesSection />
        <ServicesSection />

        {/* 6. How Dastak Works Section: Simple 3-step direct WhatsApp process */}
        <HowItWorksSection />

        {/* 7. Service Area: Jhelum City Housing, Jhelum, Pakistan */}
        <ServiceAreaSection />

        {/* 8. About Dastak: Mission, story, blog update, and audio guide */}
        <AboutSection />

        {/* Welcome Voice Experience Audio Guide */}
        <section
          id="welcome-voice"
          className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#081024] border-t border-slate-800/80 scroll-mt-24"
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

        {/* Official Announcement Blog Article */}
        <BlogSection />

        {/* 9 & 10. Customer Feedback & Ratings:
            Mobile:
              9. Customer ratings summary and approved public reviews
              10. Customer feedback submission form
            Desktop:
              Summary top, form left (5 cols), approved reviews right (7 cols) */}
        <FeedbackSection />

        {/* 11. Frequently Asked Questions (FAQ) Accordion */}
        <FaqSection />

        {/* 12. Contact information and footer */}
        <ContactSection />
      </main>

      {/* 12B. Professional Footer */}
      <Footer />

      {/* Floating Action Buttons: Back to top & Prominent WhatsApp Contact (positioned to never overlap content/forms) */}
      <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            type="button"
            className="w-10 h-10 rounded-full bg-[#0F1E3D] text-[#FFE89E] border border-slate-700 hover:border-[#F5B041] shadow-lg flex items-center justify-center transition-all cursor-pointer pointer-events-auto focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#070D1E]"
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
