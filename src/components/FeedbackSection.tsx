import React, { useState } from 'react';
import { Star, Send, MessageSquare, AlertCircle, ShieldAlert, Copy, CheckCircle2 } from 'lucide-react';
import { Language, FeedbackData } from '../types';
import { translations, WHATSAPP_INTL_NUMBER } from '../constants/translations';

interface FeedbackSectionProps {
  lang: Language;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 5,
    category: t.feedback.categories[0],
    customerName: '',
    comments: '',
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Keyboard navigation for accessible 5-star selector
  const handleKeyDown = (e: React.KeyboardEvent, currentStar: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(5, currentStar + 1);
      setFeedback((prev) => ({ ...prev, rating: next }));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const prevStar = Math.max(1, currentStar - 1);
      setFeedback((prev) => ({ ...prev, rating: prevStar }));
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setFeedback((prev) => ({ ...prev, rating: currentStar }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!feedback.rating || !feedback.comments.trim()) {
      setError(t.feedback.errorFill);
      return;
    }

    setIsSubmitting(true);
    const isUr = lang === 'ur';
    const starsString = '⭐'.repeat(feedback.rating);

    const message = isUr
      ? `⭐ دستک کسٹمر فیڈ بیک (Dastak Feedback):\n\nریٹنگ: ${starsString} (${feedback.rating}/5)\nشعبہ: ${feedback.category}\nگاہک کا نام: ${
          feedback.customerName.trim() || 'نام ظاہر نہیں کیا گیا'
        }\n\n💬 تاثرات و تبصرہ:\n${feedback.comments.trim()}\n\n— Jhelum City Housing`
      : `⭐ Dastak Customer Feedback:\n\nRating: ${starsString} (${feedback.rating}/5)\nCategory: ${
          feedback.category
        }\nCustomer Name: ${
          feedback.customerName.trim() || 'Anonymous'
        }\n\n💬 Comments & Experience:\n${feedback.comments.trim()}\n\n— Jhelum City Housing`;

    setSubmittedMessage(message);

    const waUrl = `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  const copyFeedback = () => {
    if (!submittedMessage) return;
    navigator.clipboard.writeText(submittedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="feedback" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#091124]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{lang === 'ur' ? 'شفاف رائے' : 'Genuine Impressions'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.feedback.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300">
            {t.feedback.subtitle}
          </p>
        </div>

        {/* Feedback Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-700/80 p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Interactive 5-Star Selector (Keyboard, Mouse, & Touch Accessible) */}
            <div className="text-center pb-2">
              <label id="star-rating-label" className="block text-sm font-bold text-white mb-3">
                {t.feedback.ratingPrompt}
              </label>

              <div
                className="flex items-center justify-center gap-2 sm:gap-3"
                role="radiogroup"
                aria-labelledby="star-rating-label"
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const activeStar = (hoverRating ?? feedback.rating) >= star;
                  const isCurrent = feedback.rating === star;
                  return (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={isCurrent}
                      tabIndex={0}
                      onClick={() => setFeedback({ ...feedback, rating: star })}
                      onKeyDown={(e) => handleKeyDown(e, star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B041] focus:scale-110 transition-transform cursor-pointer"
                      aria-label={`${star} of 5 ${t.feedback.starLabel}`}
                    >
                      <Star
                        className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                          activeStar
                            ? 'text-[#F5B041] fill-[#F5B041] drop-shadow-[0_0_8px_rgba(245,176,65,0.5)]'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="text-xs font-semibold text-[#FFE89E] mt-2">
                {feedback.rating} / 5 {t.feedback.starLabel}
              </div>
            </div>

            {/* Category & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                  {t.feedback.categoryLabel}
                </label>
                <select
                  value={feedback.category}
                  onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
                >
                  {t.feedback.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                  {t.feedback.nameLabel}
                </label>
                <input
                  type="text"
                  value={feedback.customerName}
                  onChange={(e) => setFeedback({ ...feedback, customerName: e.target.value })}
                  placeholder={t.feedback.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
                />
              </div>
            </div>

            {/* Comments Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                {t.feedback.commentLabel}
              </label>
              <textarea
                required
                rows={4}
                value={feedback.comments}
                onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                placeholder={t.feedback.commentPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-700 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submitted status banner & copy fallback */}
            {submittedMessage && (
              <div className="p-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-xs text-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>
                    {lang === 'ur'
                      ? 'واٹس ایپ چیٹ کھل چکی ہے! فیڈ بیک پہنچانے کے لیے وہاں "Send" کا بٹن دبائیں۔'
                      : 'WhatsApp chat launched! Please press "Send" in WhatsApp to submit.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyFeedback}
                  className="px-3 py-1.5 rounded-lg bg-[#0F1E3D] hover:bg-[#162A56] text-[#FFE89E] border border-[#F5B041]/30 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? (lang === 'ur' ? 'کاپی ہو گیا!' : 'Copied!') : (lang === 'ur' ? 'کاپی کریں' : 'Copy Text')}</span>
                </button>
              </div>
            )}

            {/* Honest Transparency Disclaimer */}
            <div className="p-4 rounded-xl bg-[#070D1E]/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400 leading-relaxed text-start">
              <ShieldAlert className="w-4 h-4 text-[#F5B041] shrink-0 mt-0.5" />
              <p>{t.feedback.disclaimer}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            >
              <Send className="w-4 h-4 fill-white text-transparent" />
              <span>
                {isSubmitting
                  ? lang === 'ur'
                    ? 'کھل رہا ہے...'
                    : 'Opening...'
                  : t.feedback.btnSendFeedbackWhatsApp}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
