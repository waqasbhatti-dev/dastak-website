import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Square, ShoppingBag, Globe, AlertTriangle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations, WELCOME_VOICE_SCRIPTS } from '../constants/translations';

interface WelcomeVoicePanelProps {
  currentLang: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const WelcomeVoicePanel: React.FC<WelcomeVoicePanelProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const t = translations[currentLang];

  // Local speech language selection (defaults to current website language)
  const [speechLang, setSpeechLang] = useState<Language>(currentLang);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [hasUrduVoice, setHasUrduVoice] = useState<boolean | null>(null);
  const [activeVoiceName, setActiveVoiceName] = useState<string>('');
  const [showScript, setShowScript] = useState<boolean>(false);
  const [statusAnnouncement, setStatusAnnouncement] = useState<string>('');

  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Synchronize local speech language with website language if website language changes
  useEffect(() => {
    setSpeechLang(currentLang);
  }, [currentLang]);

  // Check speech synthesis support and load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setIsSupported(false);
      return;
    }

    const checkVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return;

        // Check if any voice supports Urdu
        const urduVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith('ur') ||
            v.lang.toLowerCase().includes('urdu') ||
            v.name.toLowerCase().includes('urdu')
        );
        setHasUrduVoice(Boolean(urduVoice));

        // Detect current speechLang's active voice
        findBestVoice(speechLang, voices);
      } catch (err) {
        console.warn('SpeechSynthesis voice listing error:', err);
      }
    };

    checkVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = checkVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechLang]);

  // Helper to select the most suitable browser voice
  const findBestVoice = (lang: Language, voiceList?: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = voiceList || window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    if (lang === 'ur') {
      const urduVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('ur') ||
          v.lang.toLowerCase().includes('urdu') ||
          v.name.toLowerCase().includes('urdu')
      );
      if (urduVoice) {
        setActiveVoiceName(urduVoice.name);
        return urduVoice;
      }
      // If no dedicated Urdu voice exists, look for a standard Arabic or generic voice
      const arabicFallback = voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
      if (arabicFallback) {
        setActiveVoiceName(`${arabicFallback.name} (Arabic engine fallback)`);
        return arabicFallback;
      }
      const defaultVoice = voices.find((v) => v.default) || voices[0];
      if (defaultVoice) setActiveVoiceName(defaultVoice.name);
      return defaultVoice || null;
    } else {
      // English voice selection
      const naturalEn = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('en') &&
          (v.name.toLowerCase().includes('natural') ||
            v.name.toLowerCase().includes('google') ||
            v.name.toLowerCase().includes('premium'))
      );
      const standardEn = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
      const chosen = naturalEn || standardEn || voices[0];
      if (chosen) setActiveVoiceName(chosen.name);
      return chosen || null;
    }
  };

  // Stop any active speech immediately
  const handleStopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    currentUtteranceRef.current = null;
    setStatusAnnouncement(
      currentLang === 'ur' ? 'آواز بند کر دی گئی ہے۔' : 'Welcome voice stopped.'
    );
  };

  // Play Welcome Voice
  const handleListenWelcome = () => {
    if (!isSupported || typeof window === 'undefined') return;

    // Stop any ongoing speech first to prevent overlapping
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    try {
      const textToSpeak = WELCOME_VOICE_SCRIPTS[speechLang];
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Select voice
      const chosenVoice = findBestVoice(speechLang);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      // Configure standard, natural speech parameters
      utterance.lang = speechLang === 'ur' ? 'ur-PK' : 'en-US';
      utterance.rate = 0.95; // Moderate, clear pace
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setStatusAnnouncement(
          currentLang === 'ur'
            ? 'خوش آمدیدی پیغام بولا جا رہا ہے۔'
            : 'Playing welcome message.'
        );
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
        setStatusAnnouncement(
          currentLang === 'ur'
            ? 'پیغام مکمل ہو گیا۔'
            : 'Welcome message finished.'
        );
      };

      utterance.onerror = (e) => {
        // SpeechSynthesis can throw 'interrupted' or 'canceled' when manually stopped
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('SpeechSynthesis error:', e.error);
        }
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      currentUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis invocation error:', err);
      setIsSpeaking(false);
    }
  };

  // Language switch handler within panel
  const handleSelectLanguage = (targetLang: Language) => {
    // If speaking, stop immediately before switching
    if (isSpeaking) {
      handleStopVoice();
    }
    setSpeechLang(targetLang);
    if (onLanguageChange && targetLang !== currentLang) {
      onLanguageChange(targetLang);
    }
  };

  const handleScrollToOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isSpeaking) {
      handleStopVoice();
    }
    const target = document.querySelector('#order-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const voiceTranslations = t.welcomeVoice;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative rounded-2xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-800 shadow-xl p-5 sm:p-6 backdrop-blur-md">
        {/* Glow Accent */}
        <div
          className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#F5B041]/10 via-[#FFE89E]/15 to-[#F5B041]/10 blur-sm -z-10"
          aria-hidden="true"
        />

        {/* Top Header with Audio Wave Indicator */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isSpeaking
                  ? 'bg-[#25D366]/20 border border-[#25D366] text-[#25D366]'
                  : 'bg-[#162A56] border border-[#F5B041]/40 text-[#F5B041]'
              }`}
            >
              {isSpeaking ? (
                <Volume2 className="w-4 h-4 animate-bounce" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </div>

            <div className="text-start">
              <h3 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>{currentLang === 'ur' ? 'آڈیو پلیئر' : 'Audio Player'}</span>
                {isSpeaking ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#25D366] font-bold bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                    <span>LIVE</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/60">
                    <span>{voiceTranslations.voiceReady}</span>
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-300 font-medium">
                {currentLang === 'ur' ? 'انگریزی یا اردو میں پیغام سنیں' : 'Listen in English or Urdu'}
              </p>
            </div>
          </div>

          {/* Language Switcher Buttons inside the Panel */}
          <div className="flex items-center gap-1 bg-[#070D1E] p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => handleSelectLanguage('ur')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                speechLang === 'ur'
                  ? 'bg-gradient-to-r from-[#FFE89E] to-[#F5B041] text-[#070D1E] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Urdu speech language"
            >
              اردو
            </button>
            <button
              type="button"
              onClick={() => handleSelectLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                speechLang === 'en'
                  ? 'bg-gradient-to-r from-[#FFE89E] to-[#F5B041] text-[#070D1E] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="English speech language"
            >
              English
            </button>
          </div>
        </div>

        {/* Unsupported Warning if browser lacks Speech Synthesis */}
        {!isSupported && (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 flex items-start gap-2 mb-3 text-start">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{voiceTranslations.unsupported}</span>
          </div>
        )}

        {/* Honest Urdu Voice Compatibility Notice */}
        {isSupported && speechLang === 'ur' && hasUrduVoice === false && (
          <div className="p-2.5 rounded-xl bg-[#162A56]/40 border border-[#F5B041]/30 text-[11px] text-slate-300 flex items-start gap-2 mb-3 text-start leading-relaxed">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F5B041] shrink-0 mt-0.5" />
            <p>{voiceTranslations.urduNotice}</p>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Button 1: Listen to Welcome */}
          <button
            type="button"
            disabled={!isSupported || isSpeaking}
            onClick={handleListenWelcome}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5B041] ${
              isSpeaking
                ? 'bg-[#122347] text-[#FFE89E] border border-[#F5B041]/40 opacity-90 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#E5A93C] text-[#070D1E] hover:from-[#FFF1BD] hover:to-[#F5B041] shadow-md shadow-[#F5B041]/20 hover:scale-[1.02] active:scale-[0.98]'
            }`}
            aria-label={voiceTranslations.btnListen}
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-4 h-4 animate-pulse text-[#25D366]" />
                <span className="truncate">{voiceTranslations.btnSpeaking}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current shrink-0" />
                <span className="truncate">{voiceTranslations.btnListen}</span>
              </>
            )}
          </button>

          {/* Button 2: Stop Voice */}
          <button
            type="button"
            disabled={!isSpeaking}
            onClick={handleStopVoice}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 ${
              isSpeaking
                ? 'bg-red-950/70 border-red-600 text-red-200 hover:bg-red-900 shadow-md shadow-red-950/40 cursor-pointer animate-pulse'
                : 'bg-[#070D1E]/60 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
            aria-label={voiceTranslations.btnStop}
          >
            <Square className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="truncate">{voiceTranslations.btnStop}</span>
          </button>

          {/* Button 3: Place an Order */}
          <a
            href="#order-form"
            onClick={handleScrollToOrder}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#16284F] hover:bg-[#1C3366] border border-[#F5B041]/30 text-[#FFE89E] hover:text-white transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#F5B041] shrink-0" />
            <span className="truncate">{voiceTranslations.btnOrder}</span>
          </a>
        </div>

        {/* Accessibility Status Announcement (Screen Readers) */}
        <div className="sr-only" aria-live="polite">
          {statusAnnouncement}
        </div>

        {/* Collapsible Script Preview (Read along / accessibility) */}
        <div className="mt-3 pt-2.5 border-t border-slate-800 text-start">
          <button
            type="button"
            onClick={() => setShowScript(!showScript)}
            className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-400 hover:text-[#FFE89E] transition-colors py-1 cursor-pointer focus:outline-none"
            aria-expanded={showScript}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F5B041]" />
              <span>{showScript ? voiceTranslations.hideScript : voiceTranslations.toggleScript}</span>
            </span>
            {showScript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showScript && (
            <div className="mt-2 p-3 rounded-xl bg-[#070D1E] border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line max-h-44 overflow-y-auto font-sans selection:bg-[#F5B041] selection:text-black">
              {WELCOME_VOICE_SCRIPTS[speechLang]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
