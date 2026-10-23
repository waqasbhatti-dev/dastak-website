import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Square, MessageCircle, AlertTriangle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { translations, WELCOME_VOICE_SCRIPTS, WHATSAPP_URL } from '../constants/translations';

export const WelcomeVoicePanel: React.FC = () => {
  const t = translations;
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [showScript, setShowScript] = useState<boolean>(false);
  const [statusAnnouncement, setStatusAnnouncement] = useState<string>('');

  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setIsSupported(false);
      return;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const findBestVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const naturalEn = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('en') &&
        (v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('premium'))
    );
    const standardEn = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
    return naturalEn || standardEn || voices[0] || null;
  };

  const handleStopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    currentUtteranceRef.current = null;
    setStatusAnnouncement('Welcome audio stopped.');
  };

  const handleListenWelcome = () => {
    if (!isSupported || typeof window === 'undefined') return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    try {
      const textToSpeak = WELCOME_VOICE_SCRIPTS.en;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      const chosenVoice = findBestVoice();
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setStatusAnnouncement('Playing welcome audio overview.');
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
        setStatusAnnouncement('Welcome audio finished.');
      };

      utterance.onerror = (e) => {
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

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative rounded-2xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-800 shadow-xl p-5 sm:p-6 backdrop-blur-md">
        {/* Glow Accent */}
        <div
          className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#F5B041]/10 via-[#FFE89E]/15 to-[#F5B041]/10 blur-sm -z-10"
          aria-hidden="true"
        />

        {/* Top Header */}
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
                <span>Audio Guide</span>
                {isSpeaking ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#25D366] font-bold bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                    <span>PLAYING</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/60">
                    <span>{t.welcomeVoice.voiceReady}</span>
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-300 font-medium">
                Listen to a clear overview of Dastak Delivery Service
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-[#FFE89E] px-2.5 py-1 rounded-lg bg-[#070D1E] border border-slate-800">
            English Audio
          </div>
        </div>

        {/* Unsupported Warning */}
        {!isSupported && (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 flex items-start gap-2 mb-3 text-start">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{t.welcomeVoice.unsupported}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Button 1: Listen */}
          <button
            type="button"
            disabled={!isSupported || isSpeaking}
            onClick={handleListenWelcome}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5B041] ${
              isSpeaking
                ? 'bg-[#122347] text-[#FFE89E] border border-[#F5B041]/40 opacity-90 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FFE89E] via-[#F5B041] to-[#E5A93C] text-[#070D1E] hover:from-[#FFF1BD] hover:to-[#F5B041] shadow-md shadow-[#F5B041]/20 hover:scale-[1.02] active:scale-[0.98]'
            }`}
            aria-label={t.welcomeVoice.btnListen}
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-4 h-4 animate-pulse text-[#25D366]" />
                <span className="truncate">{t.welcomeVoice.btnSpeaking}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current shrink-0" />
                <span className="truncate">{t.welcomeVoice.btnListen}</span>
              </>
            )}
          </button>

          {/* Button 2: Stop */}
          <button
            type="button"
            disabled={!isSpeaking}
            onClick={handleStopVoice}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 ${
              isSpeaking
                ? 'bg-red-950/70 border-red-600 text-red-200 hover:bg-red-900 shadow-md shadow-red-950/40 cursor-pointer animate-pulse'
                : 'bg-[#070D1E]/60 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
            aria-label={t.welcomeVoice.btnStop}
          >
            <Square className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="truncate">{t.welcomeVoice.btnStop}</span>
          </button>

          {/* Button 3: Direct WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (isSpeaking) handleStopVoice();
            }}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-transparent shrink-0" />
            <span className="truncate">{t.welcomeVoice.btnContact}</span>
          </a>
        </div>

        {/* Screen Reader Announcement */}
        <div className="sr-only" aria-live="polite">
          {statusAnnouncement}
        </div>

        {/* Collapsible Script Preview */}
        <div className="mt-3 pt-2.5 border-t border-slate-800 text-start">
          <button
            type="button"
            onClick={() => setShowScript(!showScript)}
            className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-400 hover:text-[#FFE89E] transition-colors py-1 cursor-pointer focus:outline-none"
            aria-expanded={showScript}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F5B041]" />
              <span>{showScript ? t.welcomeVoice.hideScript : t.welcomeVoice.toggleScript}</span>
            </span>
            {showScript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showScript && (
            <div className="mt-2 p-3 rounded-xl bg-[#070D1E] border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line max-h-44 overflow-y-auto font-sans selection:bg-[#F5B041] selection:text-black">
              {WELCOME_VOICE_SCRIPTS.en}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
