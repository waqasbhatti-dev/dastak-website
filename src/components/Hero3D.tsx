import React, { useState, useRef } from 'react';
import {
  MessageCircle,
  Clock,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import {
  translations,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY_PHONE,
  WHATSAPP_LOCAL_PHONE,
} from '../constants/translations';

/**
 * PRODUCTION-READY 3D VIDEO GENERATION PROMPT (For AI Video Models e.g. Veo 2 / Sora):
 * 
 * Prompt: "Cinematic commercial 30-second continuous seamless loop for professional local delivery brand 'Dastak'.
 * Scene 1 (0-5s): A friendly, professional delivery courier wearing an emerald green (#25D366) and navy jacket with gold accents runs dynamically toward the camera in a modern sunlit residential avenue in Jhelum, Pakistan. Natural motion blur, warm rim lighting.
 * Scene 2 (5-10s): Courier slows to a confident stop; several realistic cardboard parcel boxes with gold foil Dastak branding emerge and float into an elegant arrangement.
 * Scene 3 (10-16s): Parcel boxes open smoothly to showcase delivery essentials: fresh groceries, medicine bottles, food orders, and express courier packages.
 * Scene 4 (16-22s): Courier picks up parcel and strides through clean residential community streets of Jhelum City Housing under emerald-green and golden hour lighting.
 * Scene 5 (22-27s): Courier presents a package toward the camera; composition locks on the brand identity 'Dastak | دستک' with glowing gold calligraphy and slogan 'Your Needs, Our Responsibility'.
 * Scene 6 (27-30s): Smooth camera tracking and character return to the exact initial framing and lighting, creating an invisible, seamless 30-second loop. 4K, 30fps, photorealistic Octane 3D render."
 */

export const Hero3D: React.FC = () => {
  const t = translations;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#070D1E] overflow-hidden scroll-mt-20"
    >
      {/* 3D Cinematic Commercial Video Background / Stage */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
        {/* Real 30-second looping video with poster fallback - completely silent */}
        {!videoError ? (
          <video
            ref={videoRef}
            src="/videos/dastak_hero_commercial.mp4"
            poster="/src/assets/images/dastak_hero_poster_1792668689441.jpg"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center opacity-30 sm:opacity-35 scale-105 transition-opacity duration-700"
          />
        ) : (
          <img
            src="/src/assets/images/dastak_hero_poster_1792668689441.jpg"
            alt="Dastak 3D Delivery Courier"
            className="w-full h-full object-cover object-center opacity-30"
          />
        )}

        {/* Cinematic Lighting & Contrast Gradient Overlays (Ensures text readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/80 to-[#070D1E]/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070D1E]/40 to-[#070D1E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            {/* Area Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1E3D]/90 border border-[#F5B041]/35 shadow-lg shadow-black/40 backdrop-blur-md mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
              </span>
              <span className="text-xs font-semibold text-[#FFE89E] tracking-wide">
                {t.hero.badge}
              </span>
            </div>

            {/* Dastak | دستک Brand Lockup */}
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-widest flex items-center gap-2">
                <span>Dastak</span>
                <span className="text-slate-500 font-normal">|</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFE89E] via-[#F5B041] to-[#D4AF37]">
                  دستک
                </span>
              </h2>
              <span className="text-[10px] uppercase font-bold text-[#25D366] px-2 py-0.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30">
                Live Dispatch
              </span>
            </div>

            {/* Main English Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Fast & Reliable{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#E5A93C]">
                Neighborhood Delivery
              </span>
            </h1>

            {/* Slogan */}
            <p className="mt-2 text-lg sm:text-xl font-bold text-[#FFE89E] tracking-wide">
              “{t.tagline}”
            </p>

            {/* Supporting Paragraph */}
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Status Notice Banner */}
            <div className="mt-6 w-full max-w-xl p-3.5 sm:p-4 rounded-2xl bg-[#0F1E3D]/80 border border-[#F5B041]/25 text-start flex items-start gap-3 backdrop-blur-md">
              <Clock className="w-5 h-5 text-[#F5B041] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white block">
                  {t.statusOperating}
                </span>
                <span className="text-slate-400 text-[11px] block mt-0.5">
                  {t.statusSubtext}
                </span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              {/* Primary CTA: WhatsApp Contact */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-xl shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                aria-label={`Contact Dastak on WhatsApp ${WHATSAPP_DISPLAY_PHONE}`}
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>{t.hero.btnWhatsApp}</span>
              </a>

              {/* Secondary CTA: Our Services */}
              <a
                href="#services"
                onClick={scrollToServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#FFE89E] hover:text-white bg-[#0F1E3D] hover:bg-[#162A56] border border-[#F5B041]/40 hover:border-[#F5B041] transition-all focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
              >
                <span>{t.hero.btnServices}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span className="text-slate-300 font-medium">Delivery & Pick & Drop</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F5B041]" />
                <span className="text-slate-300">Jhelum City, Pakistan</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#F5B041]" />
                <span className="font-mono">{WHATSAPP_DISPLAY_PHONE}</span>
              </span>
            </div>
          </div>

          {/* Right Column: 3D Video Commercial Frame Preview (5 cols on lg) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0F1E3D]/95 via-[#0A1428]/95 to-[#070D1E]/95 border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              {/* Commercial Card Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#162A56] border border-[#F5B041]/40 flex items-center justify-center font-black text-sm text-[#FFE89E]">
                    د
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Dastak | دستک
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      3D Brand Commercial • 30s Loop
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[10px] font-bold text-[#25D366] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  CONTINUOUS LOOP
                </span>
              </div>

              {/* Video Player Display Container */}
              <div className="relative my-4 rounded-2xl overflow-hidden border border-slate-800 bg-[#040814] aspect-video flex items-center justify-center group">
                <video
                  src="/videos/dastak_hero_commercial.mp4"
                  poster="/src/assets/images/dastak_hero_poster_1792668689441.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Subtitle badge on video */}
                <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-md bg-[#070D1E]/85 border border-slate-800 text-[10px] text-slate-300 font-mono">
                  30s Cinematic 3D Loop
                </div>
              </div>

              {/* Storyboard Step Details */}
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800/80">
                  <span className="font-semibold text-white">Commercial Storyboard:</span>
                  <span className="text-[#FFE89E] font-mono">0:00 - 0:30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>1. Fast Arrival & Sprint</span>
                  <span className="text-[#25D366]">0-5s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>2. Parcel Reveal & Pose</span>
                  <span className="text-[#25D366]">5-10s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>3. Groceries, Medicines & Food</span>
                  <span className="text-[#25D366]">10-16s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>4. Speed & Residential Reliability</span>
                  <span className="text-[#25D366]">16-22s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">5. Brand Moment: Dastak | دستک</span>
                  <span className="text-[#FFE89E]">22-27s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>6. Seamless Loop Transition</span>
                  <span className="text-[#25D366]">27-30s</span>
                </div>
              </div>

              {/* Direct WhatsApp Callout in card */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Direct Dispatch:</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#25D366] hover:underline flex items-center gap-1 font-mono"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>{WHATSAPP_LOCAL_PHONE}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
