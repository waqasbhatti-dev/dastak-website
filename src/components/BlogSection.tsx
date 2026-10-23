import React from 'react';
import { Newspaper, Calendar, MapPin, Clock, MessageCircle, Car, Sparkles, ArrowRight } from 'lucide-react';
import { translations, WHATSAPP_URL } from '../constants/translations';

export const BlogSection: React.FC = () => {
  const b = translations.blog;
  const a = b.article;

  return (
    <section
      id="blog"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#070D1E] border-t border-slate-800/80 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/35 text-xs font-semibold text-[#FFE89E] mb-3">
            <Newspaper className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{b.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {b.title}
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-300">
            {b.subtitle}
          </p>
        </div>

        {/* Featured Blog Article Container */}
        <article className="relative rounded-3xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-800 hover:border-[#F5B041]/35 shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300">
          {/* Top Banner with Service Badge & Metadata */}
          <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-950/70 border border-[#F5B041]/50 text-xs font-bold text-[#FFE89E] flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-[#F5B041]" />
                <span>{a.statusBadge}</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-[#162A56] border border-slate-700 text-xs text-slate-300 font-medium hidden sm:inline-block">
                {a.tag}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F5B041]" />
                <span>{a.areaTag}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{a.readTime}</span>
              </span>
            </div>
          </div>

          {/* Article Main Body */}
          <div className="p-6 sm:p-10 space-y-6 text-start">
            {/* Article Headline */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {a.title}
            </h3>

            {/* Accent divider */}
            <div className="w-20 h-1 bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#E5A93C] rounded-full" />

            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              {a.p1}
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {a.p2}
            </p>

            {/* Paragraph 3 */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {a.p3}
            </p>

            {/* Paragraph 4: Distinct Service Highlight */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1528] border border-slate-800 text-sm text-slate-200 leading-relaxed">
              <p>
                {a.p4}
              </p>
            </div>

            {/* Paragraph 5 */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {a.p5}
            </p>

            {/* Official Signoff Box */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0F1E3D] via-[#162A56]/60 to-[#0F1E3D] border border-[#F5B041]/30 text-center">
                <p className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#FFE89E]">
                  {a.signoff}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Concept ride service in introduction • Dedicated parcel delivery active daily
                </p>
              </div>
            </div>

            {/* Call to Action Footer */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <span className="italic">
                Have questions or feedback regarding the upcoming Pick & Drop service?
              </span>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold transition-all shadow-md shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
