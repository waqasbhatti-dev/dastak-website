import React, { useState, useEffect } from 'react';
import {
  Star,
  Send,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  User,
  Calendar,
  Tag,
  Clock,
  X,
  Info,
} from 'lucide-react';
import { collection, addDoc, onSnapshot, query, where, serverTimestamp, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { CustomerReview } from '../types';
import { translations } from '../constants/translations';

export const FeedbackSection: React.FC = () => {
  const t = translations;

  // Approved reviews state streamed live from Firestore
  const [approvedReviews, setApprovedReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);

  // Local pending reviews (submitted by this user in this browser session)
  const [localPendingReviews, setLocalPendingReviews] = useState<CustomerReview[]>(() => {
    try {
      const stored = localStorage.getItem('dastak_local_pending_feedback');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Form input state
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [category, setCategory] = useState<string>(t.feedback.categories[0]);
  const [comment, setComment] = useState<string>('');

  // UI status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(6);

  // Listen live to approved customer feedback from Firestore
  useEffect(() => {
    const feedbackCol = collection(db, 'feedback');
    const q = query(
      feedbackCol,
      where('status', '==', 'approved'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loaded: CustomerReview[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          loaded.push({
            id: docSnap.id,
            rating: Number(data.rating) || 5,
            comment: data.comment || '',
            displayName: data.displayName || '',
            category: data.category || '',
            status: 'approved',
            createdAt: data.createdAt,
          });
        });

        // In-memory descending sort by creation timestamp
        loaded.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
          return timeB - timeA;
        });

        setApprovedReviews(loaded);
        setLoading(false);
      },
      (err) => {
        console.error('Failed to stream approved feedback:', err);
        setFirestoreError(err.message);
        setLoading(false);
        try {
          handleFirestoreError(err, OperationType.GET, 'feedback');
        } catch {
          // Handled for skill conformance
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // Compute live average strictly from verified approved reviews
  const totalApproved = approvedReviews.length;
  const averageRating =
    totalApproved > 0
      ? (approvedReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalApproved).toFixed(1)
      : '0.0';

  // Keyboard navigation for accessible 5-star selector
  const handleKeyDown = (e: React.KeyboardEvent, currentStar: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setRating(Math.min(5, currentStar + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setRating(Math.max(1, currentStar - 1));
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setRating(currentStar);
    }
  };

  // Dismiss a local pending review preview
  const handleDismissPending = (id?: string) => {
    if (!id) return;
    const updated = localPendingReviews.filter((item) => item.id !== id);
    setLocalPendingReviews(updated);
    try {
      localStorage.setItem('dastak_local_pending_feedback', JSON.stringify(updated));
    } catch {
      // Safe fallback
    }
  };

  // Submit new review into Firestore with status: 'pending' (Secure moderation workflow)
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const trimmedComment = comment.trim();
    if (!rating || rating < 1 || rating > 5 || trimmedComment.length < 5) {
      setFormError(t.feedback.errorFill);
      return;
    }

    setIsSubmitting(true);

    try {
      const finalDisplayName = displayName.trim().slice(0, 100) || 'Valued Customer';
      const finalCategory = category.slice(0, 100);

      const newReviewPayload = {
        rating: Math.round(rating),
        comment: trimmedComment.slice(0, 1000),
        displayName: finalDisplayName,
        category: finalCategory,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'feedback'), newReviewPayload);

      // Track local pending review so user sees their private status immediately
      const userReviewRecord: CustomerReview = {
        id: docRef.id,
        rating: Math.round(rating),
        comment: trimmedComment.slice(0, 1000),
        displayName: finalDisplayName,
        category: finalCategory,
        status: 'pending',
        createdAt: new Date(),
      };

      const updatedPending = [userReviewRecord, ...localPendingReviews].slice(0, 10);
      setLocalPendingReviews(updatedPending);
      try {
        localStorage.setItem('dastak_local_pending_feedback', JSON.stringify(updatedPending));
      } catch {
        // Storage safe fallback
      }

      // Reset form fields
      setComment('');
      setDisplayName('');
      setRating(5);
      setSuccessMessage(t.feedback.submitSuccess);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 8000);
    } catch (err) {
      console.error('Feedback write failed:', err);
      setFormError('Unable to save feedback to Firebase. Please check connection and try again.');
      try {
        handleFirestoreError(err, OperationType.CREATE, 'feedback');
      } catch {
        // Logged
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (rawDate: any): string => {
    if (!rawDate) return 'Recently';
    try {
      const dateObj = rawDate.toDate ? rawDate.toDate() : new Date(rawDate);
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section
      id="feedback"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#091124] border-t border-slate-800/80 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#F5B041]/30 text-xs font-semibold text-[#FFE89E] mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#F5B041]" />
            <span>{t.feedback.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.feedback.title}
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-300">
            {t.feedback.subtitle}
          </p>
        </div>

        {/* 9A. Live Rating Summary Card (Mobile Order Step 9 - Summary) */}
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0F1E3D] via-[#0A1428] to-[#0F1E3D] border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
            <div className="w-20 h-20 rounded-2xl bg-[#070D1E] border border-[#F5B041]/40 flex flex-col items-center justify-center shadow-lg shrink-0">
              <span className="text-3xl font-black text-[#FFE89E] font-mono leading-none">
                {totalApproved > 0 ? averageRating : '—'}
              </span>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-2.5 h-2.5 ${
                      totalApproved > 0 && Number(averageRating) >= s
                        ? 'text-[#F5B041] fill-[#F5B041]'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <span>{t.feedback.statsTitle}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {totalApproved > 0 ? (
                  <span>
                    {t.feedback.basedOnPrefix}{' '}
                    <strong className="text-[#FFE89E] font-mono font-bold text-sm sm:text-base">
                      {totalApproved}
                    </strong>{' '}
                    {totalApproved === 1
                      ? t.feedback.singleReviewSuffix
                      : t.feedback.approvedReviewsSuffix}
                  </span>
                ) : (
                  <span>
                    Based on 0 approved customer reviews.{' '}
                    <span className="text-[#FFE89E] font-medium">{t.feedback.emptyStateDesc}</span>
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#070D1E]/80 border border-slate-800 text-xs text-slate-400 max-w-md flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
            <span className="leading-relaxed">{t.feedback.disclaimer}</span>
          </div>
        </div>

        {/* Responsive Grid:
            Mobile:
              1. Customer ratings summary and approved public reviews (Feed: order-1)
              2. Customer feedback submission form (Form: order-2)
            Desktop (lg:):
              - Form on left (lg:order-1, lg:col-span-5)
              - Approved reviews feed on right (lg:order-2, lg:col-span-7)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 9B. Customer Reviews Feed & Private Status Area (Mobile: First; Desktop: Right 7 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{t.feedback.feedTitle}</span>
                  {totalApproved > 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0F1E3D] text-[#FFE89E] border border-[#F5B041]/30 font-mono">
                      {totalApproved}
                    </span>
                  )}
                </h3>
                <span className="text-xs text-slate-400">
                  {totalApproved > 0 ? t.feedback.feedSubtitle : 'Zero Fake Reviews'}
                </span>
              </div>

              {/* Private Status Notice for Current User's Submissions */}
              {localPendingReviews.length > 0 && (
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <Info className="w-3.5 h-3.5" />
                    <span>Your Recent Submission (Private Preview)</span>
                  </div>

                  {localPendingReviews.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#132244] to-[#0A1428] border border-amber-500/40 shadow-lg relative"
                    >
                      <button
                        type="button"
                        onClick={() => handleDismissPending(item.id)}
                        className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                        title={t.feedback.dismissPrivateNotice}
                        aria-label="Dismiss private preview"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pr-6">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#F5B041]/20 text-[#FFE89E] flex items-center justify-center font-bold text-xs">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {item.displayName || 'You'} ({t.feedback.yourSubmission})
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {formatDate(item.createdAt)}
                            </span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-[10px] font-bold text-amber-300 flex items-center gap-1.5 shadow-sm">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{t.feedback.pendingBadge}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              item.rating >= s
                                ? 'text-[#F5B041] fill-[#F5B041]'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>

                      {item.category && (
                        <div className="inline-flex items-center gap-1 text-[10px] text-[#FFE89E] font-medium bg-[#162A56]/60 px-2 py-0.5 rounded-md border border-[#F5B041]/20 mb-2">
                          <Tag className="w-2.5 h-2.5 text-[#F5B041]" />
                          <span>{item.category}</span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {item.comment}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span>{t.feedback.privateStatusNotice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Firestore Stream Error */}
              {firestoreError && (
                <div className="p-4 rounded-xl bg-red-950/50 border border-red-700/60 text-xs text-red-200 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Notice: Unable to connect to live review feed ({firestoreError}).</span>
                </div>
              )}

              {/* Loading State */}
              {loading ? (
                <div className="p-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#070D1E] border border-slate-800">
                  <div className="w-7 h-7 border-2 border-[#F5B041] border-t-transparent rounded-full animate-spin" />
                  <span>Loading verified customer reviews...</span>
                </div>
              ) : approvedReviews.length === 0 ? (
                /* Honest Empty State */
                <div className="p-8 sm:p-12 text-center rounded-2xl bg-[#070D1E] border border-dashed border-slate-800 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#0F1E3D] border border-slate-700 flex items-center justify-center text-[#F5B041] mb-3">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    {t.feedback.emptyStateTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Be the first to share your verified review with Dastak | دستک. Use the form below to submit your experience!
                  </p>
                </div>
              ) : (
                /* Approved Public Reviews Feed */
                <div className="space-y-3.5">
                  {approvedReviews.slice(0, displayCount).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border border-slate-800/90 hover:border-slate-700 transition-colors shadow-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#162A56] border border-slate-700 flex items-center justify-center text-[#FFE89E] font-bold text-xs">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white block">
                              {item.displayName || 'Customer'}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5 text-slate-500" />
                              <span>{formatDate(item.createdAt)}</span>
                            </span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1 bg-[#070D1E] px-2.5 py-1 rounded-lg border border-slate-800">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                item.rating >= star
                                  ? 'text-[#F5B041] fill-[#F5B041]'
                                  : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Category Badge */}
                      {item.category && (
                        <div className="inline-flex items-center gap-1 text-[10px] text-[#FFE89E] font-medium bg-[#162A56]/60 px-2 py-0.5 rounded-md border border-[#F5B041]/20 mb-2">
                          <Tag className="w-2.5 h-2.5 text-[#F5B041]" />
                          <span>{item.category}</span>
                        </div>
                      )}

                      {/* Comment Body */}
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {item.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Load More Button */}
            {approvedReviews.length > displayCount && (
              <div className="text-center pt-5">
                <button
                  type="button"
                  onClick={() => setDisplayCount((prev) => prev + 6)}
                  className="px-5 py-2.5 rounded-xl bg-[#0F1E3D] hover:bg-[#162A56] text-[#FFE89E] border border-slate-700 hover:border-[#F5B041] text-xs font-semibold transition-all cursor-pointer"
                >
                  {t.feedback.btnLoadMore}
                </button>
              </div>
            )}
          </div>

          {/* 10. Customer Feedback Submission Form (Mobile: Second; Desktop: Left 5 cols) */}
          <div className="order-2 lg:order-1 lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-800 p-5 sm:p-7 shadow-xl h-fit">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800">
              <Sparkles className="w-4 h-4 text-[#F5B041]" />
              <h3 className="text-base font-bold text-white">
                Submit Feedback for <span className="text-[#FFE89E]">Dastak | دستک</span>
              </h3>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label id="star-rating-label" className="block text-xs font-bold text-white mb-2">
                  {t.feedback.ratingPrompt}
                </label>

                <div
                  className="flex items-center gap-2"
                  role="radiogroup"
                  aria-labelledby="star-rating-label"
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const activeStar = (hoverRating ?? rating) >= star;
                    const isCurrent = rating === star;
                    return (
                      <button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={isCurrent}
                        tabIndex={0}
                        onClick={() => setRating(star)}
                        onKeyDown={(e) => handleKeyDown(e, star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B041] hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`${star} of 5 ${t.feedback.starLabel}`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            activeStar
                              ? 'text-[#F5B041] fill-[#F5B041] drop-shadow-[0_0_6px_rgba(245,176,65,0.5)]'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-bold text-[#FFE89E] ml-2 font-mono">
                    {rating} / 5
                  </span>
                </div>
              </div>

              {/* Service Category */}
              <div>
                <label htmlFor="feedback-category-select" className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.feedback.categoryLabel}
                </label>
                <select
                  id="feedback-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
                >
                  {t.feedback.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reviewer Name */}
              <div>
                <label htmlFor="feedback-name-input" className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.feedback.nameLabel}
                </label>
                <input
                  id="feedback-name-input"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={t.feedback.namePlaceholder}
                  maxLength={100}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label htmlFor="feedback-comment-input" className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.feedback.commentLabel}
                </label>
                <textarea
                  id="feedback-comment-input"
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.feedback.commentPlaceholder}
                  maxLength={1000}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Min 5 characters</span>
                  <span className="font-mono">{comment.length} / 1000</span>
                </div>
              </div>

              {/* Moderation note */}
              <div className="p-3 rounded-xl bg-[#070D1E]/70 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F5B041] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.feedback.moderationNote}</span>
              </div>

              {/* Form Error */}
              {formError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-700 text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Success Banner */}
              {successMessage && (
                <div className="p-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-xs text-[#25D366] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-[#070D1E] bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#E5A93C] hover:from-[#FFF1BD] hover:to-[#F5B041] shadow-lg shadow-[#F5B041]/20 transition-all cursor-pointer disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>{isSubmitting ? t.feedback.submitting : t.feedback.btnSubmit}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
