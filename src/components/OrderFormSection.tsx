import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  Square,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  Copy,
  AlertCircle,
  Package,
  Home,
  Phone,
  User,
  Edit3,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { Language, OrderFormData } from '../types';
import { translations, WHATSAPP_INTL_NUMBER } from '../constants/translations';

interface OrderFormSectionProps {
  lang: Language;
  initialOrderType?: 'standard' | 'parcel';
  selectedServiceNotice?: string;
}

// Sensible Pakistani phone validation accepting common local & international formats
export const isValidPakistaniPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  // Matches:
  // 1. 03XXXXXXXXX (11 digits starting with 03)
  // 2. +923XXXXXXXXX or 923XXXXXXXXX or 00923XXXXXXXXX (Pakistani mobile with country code)
  // 3. 10 to 13 digits starting with 03, 92, +92, 0092, or local landline 0544
  const pakMobile = /^((\+92|0092|92)?(0)?3[0-9]{9})$/;
  const generalPak = /^((\+92|0092|92|0)?[0-9]{9,12})$/;
  return pakMobile.test(cleaned) || generalPak.test(cleaned);
};

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  lang,
  initialOrderType = 'standard',
  selectedServiceNotice = '',
}) => {
  const t = translations[lang];

  // Form State - kept persistently during validation failures or editing
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    block: '',
    street: '',
    houseNumber: '',
    orderType: initialOrderType,
    parcelPickupLocation: '',
    parcelDropoffLocation: '',
    orderDetails: '',
    hasAudioRecording: false,
    hasImageAttachment: false,
    selectedFileName: '',
  });

  // Keep synced if user clicked a service card from the Services section
  useEffect(() => {
    if (initialOrderType) {
      setFormData((prev) => ({ ...prev, orderType: initialOrderType }));
    }
  }, [initialOrderType]);

  useEffect(() => {
    if (selectedServiceNotice) {
      setFormData((prev) => ({
        ...prev,
        orderDetails: prev.orderDetails
          ? `${prev.orderDetails}\n[${selectedServiceNotice}]`
          : `[${selectedServiceNotice}] `,
      }));
    }
  }, [selectedServiceNotice]);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const activeStreamRef = useRef<MediaStream | null>(null);

  // Image Selection State
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Validation & Modal State
  const [formError, setFormError] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasLaunchedWhatsApp, setHasLaunchedWhatsApp] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Clean up media and object URLs on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (activeStreamRef.current) {
        activeStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [audioUrl, imagePreview]);

  // Audio Recording Handlers
  const startRecording = async () => {
    setMicError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicError(t.order.voiceUnsupported);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      activeStreamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Clean previous audio URL if any
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setFormData((prev) => ({ ...prev, hasAudioRecording: true }));

        if (activeStreamRef.current) {
          activeStreamRef.current.getTracks().forEach((track) => track.stop());
          activeStreamRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 120) {
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: unknown) {
      console.warn('Microphone permission or access error:', err);
      setMicError(t.order.voiceMicDenied);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsRecording(false);
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordingDuration(0);
    setFormData((prev) => ({ ...prev, hasAudioRecording: false }));
  };

  // Image Selection Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    // If user cancelled file dialog, do not clear previous selection
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];

    // Check file type
    if (!file.type.startsWith('image/')) {
      setFileError(t.order.imageTypeError);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Check size limit: 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError(t.order.imageSizeError);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Release previous preview URL if present
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      hasImageAttachment: true,
      selectedFileName: file.name,
    }));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormData((prev) => ({
      ...prev,
      hasImageAttachment: false,
      selectedFileName: '',
    }));
  };

  // Format Timer Display
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate safe, polite WhatsApp order text (using only customer supplied data)
  const generateWhatsAppMessage = () => {
    const isUr = lang === 'ur';

    const greeting = isUr
      ? 'السلام علیکم! دستک ڈیلیوری کے لیے میرا نیا آرڈر درج ذیل ہے:'
      : 'Hello! Here is my delivery order request for Dastak:';

    const customerLine = isUr
      ? `👤 نام: ${formData.fullName.trim()}`
      : `👤 Name: ${formData.fullName.trim()}`;

    const phoneLine = isUr
      ? `📞 فون: ${formData.phone.trim()}`
      : `📞 Phone: ${formData.phone.trim()}`;

    const addressLine = isUr
      ? `📍 پتہ: مکان #${formData.houseNumber.trim()}، گلی #${formData.street.trim()}، بلاک: ${formData.block.trim()}، جہلم سٹی ہاؤسنگ`
      : `📍 Address: House #${formData.houseNumber.trim()}, Street: ${formData.street.trim()}, Block: ${formData.block.trim()}, Jhelum City Housing`;

    const typeLine = isUr
      ? `📦 سروس کی قسم: ${
          formData.orderType === 'parcel'
            ? 'پارسل سروس (پک اپ / ڈراپ آف)'
            : 'عام ڈیلیوری (گروسری، کریانہ، ادویات، کھانا یا دیگر ضروریات)'
        }`
      : `📦 Service Category: ${
          formData.orderType === 'parcel'
            ? 'Parcel Service (Pickup & Drop-off)'
            : 'Standard Delivery (Groceries, Pharmacy, Meals, or Essentials)'
        }`;

    const parcelInfo =
      formData.orderType === 'parcel'
        ? isUr
          ? `🏢 پک اپ مقام: ${formData.parcelPickupLocation?.trim() || 'دستیاب نہیں'}\n🎯 ڈراپ آف مقام: ${
              formData.parcelDropoffLocation?.trim() || 'دستیاب نہیں'
            }\n`
          : `🏢 Pickup Point: ${formData.parcelPickupLocation?.trim() || 'N/A'}\n🎯 Drop-off Point: ${
              formData.parcelDropoffLocation?.trim() || 'N/A'
            }\n`
        : '';

    const itemsHeader = isUr ? '📝 آرڈر اور اشیاء کی تفصیل:' : '📝 Order Details / Items:';
    const itemsBody = formData.orderDetails.trim();

    const voiceNote = formData.hasAudioRecording
      ? isUr
        ? '\n🎙️ (نوٹ: میں نے ویب سائٹ پر وائس نوٹ ریکارڈ کیا ہے، اور چیٹ میں بھیج رہا ہوں)'
        : '\n🎙️ (Note: I have recorded a voice note and am sharing it directly in this chat)'
      : '';

    const photoNote = formData.hasImageAttachment
      ? isUr
        ? `\n📷 (نوٹ: مطلوبہ اشیاء یا نسخے کی تصویر [${formData.selectedFileName || 'فائل'}] بھی چیٹ میں اٹیچ کر رہا ہوں)`
        : `\n📷 (Note: Attaching item/prescription photo [${formData.selectedFileName || 'file'}] in this chat)`
      : '';

    return `${greeting}\n\n${customerLine}\n${phoneLine}\n${addressLine}\n${typeLine}\n${parcelInfo}${itemsHeader}\n${itemsBody}${voiceNote}${photoNote}\n\n— Dastak Delivery Service (Jhelum City Housing)`;
  };

  // Step 1: Open Review Confirmation Modal
  const handleReviewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Required fields check
    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.block.trim() ||
      !formData.street.trim() ||
      !formData.houseNumber.trim() ||
      !formData.orderDetails.trim()
    ) {
      setFormError(t.order.validationError);
      return;
    }

    // Sensible Pakistani phone validation
    if (!isValidPakistaniPhone(formData.phone)) {
      setFormError(t.order.phoneValidationError);
      return;
    }

    const msg = generateWhatsAppMessage();
    setFormattedMessage(msg);
    setHasLaunchedWhatsApp(false);
    setShowReviewModal(true);
  };

  // Step 2: Customer confirms review and proceeds to WhatsApp
  const handleContinueToWhatsApp = () => {
    if (isLaunching) return; // Prevent double-clicks
    setIsLaunching(true);

    const encoded = encodeURIComponent(formattedMessage);
    const waLink = `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encoded}`;

    // Open WhatsApp
    window.open(waLink, '_blank', 'noopener,noreferrer');
    setHasLaunchedWhatsApp(true);

    setTimeout(() => {
      setIsLaunching(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="order-form" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#070D1E]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1E3D] border border-[#25D366]/40 text-xs font-semibold text-[#25D366] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>{lang === 'ur' ? 'آسان اور فوری طریقہ' : 'Simple & Direct'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.order.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {t.order.subtitle}
          </p>
        </div>

        {/* The Order Form Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-slate-700/80 shadow-2xl p-6 sm:p-10">
          <form onSubmit={handleReviewOrder} className="space-y-6">
            {/* Order Category Selector */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                {t.order.typeLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orderType: 'standard' })}
                  className={`p-4 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-start ${
                    formData.orderType === 'standard'
                      ? 'border-[#F5B041] bg-[#16284F]/80 text-white shadow-md shadow-[#F5B041]/10'
                      : 'border-slate-800 bg-[#070D1E]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Home className={`w-5 h-5 shrink-0 ${formData.orderType === 'standard' ? 'text-[#F5B041]' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-bold text-white">
                      {lang === 'ur' ? 'عام ڈیلیوری' : 'Standard Delivery'}
                    </div>
                    <div className="text-xs text-slate-400">
                      {t.order.typeStandard}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orderType: 'parcel' })}
                  className={`p-4 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-start ${
                    formData.orderType === 'parcel'
                      ? 'border-[#F5B041] bg-[#16284F]/80 text-white shadow-md shadow-[#F5B041]/10'
                      : 'border-slate-800 bg-[#070D1E]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Package className={`w-5 h-5 shrink-0 ${formData.orderType === 'parcel' ? 'text-[#F5B041]' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-bold text-white">
                      {lang === 'ur' ? 'پارسل سروس' : 'Parcel Service'}
                    </div>
                    <div className="text-xs text-slate-400">
                      {t.order.typeParcel}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#F5B041]" />
                  <span>{t.order.fullName}</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={t.order.fullNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{t.order.phone}</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.order.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Address Details: Block, Street, House (Manual Free-Text Inputs) */}
            <div>
              <div className="text-xs font-semibold text-[#FFE89E] mb-2 flex items-center gap-1.5">
                <span>📍 {lang === 'ur' ? 'جہلم سٹی ہاؤسنگ کا پتہ' : 'Jhelum City Housing Address'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.order.block}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.block}
                    onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                    placeholder={t.order.blockPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.order.street}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder={t.order.streetPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.order.houseNumber}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.houseNumber}
                    onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                    placeholder={t.order.houseNumberPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041]"
                  />
                </div>
              </div>
            </div>

            {/* Parcel Details (If Parcel Service Selected) */}
            {formData.orderType === 'parcel' && (
              <div className="p-4 rounded-2xl bg-[#162A56]/30 border border-sky-800/60 space-y-3 animate-in fade-in duration-200">
                <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'ur' ? 'پارسل روٹ کی معلومات' : 'Parcel Route Information'}</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.order.parcelPickupLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.parcelPickupLocation}
                    onChange={(e) => setFormData({ ...formData, parcelPickupLocation: e.target.value })}
                    placeholder={t.order.parcelPickupPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.order.parcelDropoffLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.parcelDropoffLocation}
                    onChange={(e) => setFormData({ ...formData, parcelDropoffLocation: e.target.value })}
                    placeholder={t.order.parcelDropoffPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>
            )}

            {/* Order Details Text Area */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                {t.order.detailsLabel}
              </label>
              <textarea
                required
                rows={4}
                value={formData.orderDetails}
                onChange={(e) => setFormData({ ...formData, orderDetails: e.target.value })}
                placeholder={t.order.detailsPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#070D1E] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B041] focus:border-transparent transition-all"
              />
            </div>

            {/* Voice Message & Image Attachment Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Voice Message Control */}
              <div className="p-4 rounded-2xl bg-[#070D1E]/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-[#F5B041]" />
                      <span>{t.order.voiceLabel}</span>
                    </span>
                    {audioUrl && (
                      <span className="text-[10px] font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/30">
                        {t.order.voiceRecorded}
                      </span>
                    )}
                  </div>

                  {micError ? (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800 text-[11px] text-red-300 flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{micError}</span>
                    </div>
                  ) : isRecording ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-red-950/30 border border-red-700/60 animate-pulse">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        <span>{t.order.voiceRecordingActive}</span>
                        <span className="text-white font-mono">{formatTimer(recordingDuration)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="px-3 py-1 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Square className="w-3 h-3 fill-white" />
                        <span>{t.order.voiceStop}</span>
                      </button>
                    </div>
                  ) : audioUrl ? (
                    <div className="space-y-2">
                      <audio controls src={audioUrl} className="w-full h-8" />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={resetRecording}
                          className="text-xs font-semibold text-slate-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t.order.voiceReset}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#F5B041]/40 hover:border-[#F5B041] bg-[#0F1E3D]/50 hover:bg-[#0F1E3D] text-xs font-semibold text-[#FFE89E] flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Mic className="w-4 h-4 text-[#F5B041]" />
                      <span>{t.order.voiceStart}</span>
                    </button>
                  )}
                </div>

                {/* Practical limitation workflow note */}
                <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
                  {t.order.voiceWhatsAppNote}
                </p>
              </div>

              {/* Image / Prescription Selection Control */}
              <div className="p-4 rounded-2xl bg-[#070D1E]/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{t.order.imageLabel}</span>
                    </span>
                    {selectedImage && (
                      <span className="text-[10px] font-bold text-[#38BDF8] bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-800">
                        {(selectedImage.size / 1024).toFixed(0)} KB
                      </span>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="order-image-input"
                  />

                  {fileError && (
                    <div className="mb-2 p-2 rounded-lg bg-red-950/40 border border-red-800 text-[11px] text-red-300 flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{fileError}</span>
                    </div>
                  )}

                  {imagePreview ? (
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F1E3D] border border-slate-700">
                      <img
                        src={imagePreview}
                        alt="Selected Item Preview"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-600"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">
                          {selectedImage?.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {t.order.imageSelected}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 cursor-pointer"
                        title={t.order.imageRemove}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="order-image-input"
                      className="w-full py-2.5 px-3 rounded-xl border border-dashed border-sky-700/60 hover:border-sky-400 bg-[#0F1E3D]/50 hover:bg-[#0F1E3D] text-xs font-semibold text-sky-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4 text-sky-400" />
                      <span>{t.order.imageLabel}</span>
                    </label>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
                  {t.order.imageNote}
                </p>
              </div>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-700 text-xs text-red-200 flex items-center gap-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Primary Review Order Action Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-extrabold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#070D1E]"
              >
                <Send className="w-5 h-5 fill-white text-transparent group-hover:translate-x-1 transition-transform" />
                <span>{t.order.btnSubmitWhatsApp}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Step-by-Step Order Review & Confirmation Modal */}
        {showReviewModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#0F1E3D] via-[#0A1428] to-[#070D1E] border border-[#F5B041]/40 shadow-2xl p-6 sm:p-8 text-start my-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-700/80">
                <div>
                  <h3 id="review-modal-title" className="text-xl font-extrabold text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#25D366]" />
                    <span>{t.order.reviewTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {t.order.reviewSubtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-bold cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Order Summary Cards */}
              <div className="my-5 space-y-3.5 text-xs">
                {/* Customer Info */}
                <div className="p-3.5 rounded-xl bg-[#070D1E] border border-slate-800">
                  <div className="text-[11px] font-bold text-[#FFE89E] mb-1">
                    {t.order.reviewCustomer}
                  </div>
                  <div className="flex flex-wrap gap-4 text-white">
                    <span>
                      <strong className="text-slate-400">{lang === 'ur' ? 'نام: ' : 'Name: '}</strong>
                      {formData.fullName}
                    </span>
                    <span>
                      <strong className="text-slate-400">{lang === 'ur' ? 'فون: ' : 'Phone: '}</strong>
                      <span className="font-mono">{formData.phone}</span>
                    </span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="p-3.5 rounded-xl bg-[#070D1E] border border-slate-800">
                  <div className="text-[11px] font-bold text-[#FFE89E] mb-1">
                    {t.order.reviewAddress}
                  </div>
                  <div className="text-white">
                    {lang === 'ur'
                      ? `مکان #${formData.houseNumber}، گلی #${formData.street}، بلاک: ${formData.block}، جہلم سٹی ہاؤسنگ`
                      : `House #${formData.houseNumber}, Street: ${formData.street}, Block: ${formData.block}, Jhelum City Housing`}
                  </div>
                </div>

                {/* Category & Parcels */}
                <div className="p-3.5 rounded-xl bg-[#070D1E] border border-slate-800">
                  <div className="text-[11px] font-bold text-[#FFE89E] mb-1">
                    {t.order.reviewCategory}
                  </div>
                  <div className="text-white font-medium">
                    {formData.orderType === 'parcel'
                      ? lang === 'ur'
                        ? 'پارسل سروس (پک اپ اور ڈراپ آف)'
                        : 'Parcel Service (Pickup & Drop-off)'
                      : lang === 'ur'
                      ? 'عام ڈیلیوری (گروسری، کریانہ، ادویات یا کھانا)'
                      : 'Standard Delivery (Groceries, Pharmacy, Meals, Essentials)'}
                  </div>
                  {formData.orderType === 'parcel' && (
                    <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1 text-slate-300">
                      <div>
                        <strong>{lang === 'ur' ? 'پک اپ: ' : 'Pickup: '}</strong>
                        {formData.parcelPickupLocation || (lang === 'ur' ? 'درج نہیں' : 'N/A')}
                      </div>
                      <div>
                        <strong>{lang === 'ur' ? 'ڈراپ آف: ' : 'Drop-off: '}</strong>
                        {formData.parcelDropoffLocation || (lang === 'ur' ? 'درج نہیں' : 'N/A')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Requested Items & Description */}
                <div className="p-3.5 rounded-xl bg-[#070D1E] border border-slate-800">
                  <div className="text-[11px] font-bold text-[#FFE89E] mb-1">
                    {t.order.reviewItems}
                  </div>
                  <div className="text-slate-200 whitespace-pre-wrap leading-relaxed max-h-28 overflow-y-auto pr-1">
                    {formData.orderDetails}
                  </div>
                </div>

                {/* Attachments Summary */}
                <div className="p-3.5 rounded-xl bg-[#070D1E] border border-slate-800">
                  <div className="text-[11px] font-bold text-[#FFE89E] mb-1">
                    {t.order.reviewAttachments}
                  </div>
                  <div className="space-y-1 text-slate-300">
                    {formData.hasAudioRecording && (
                      <div className="text-[#25D366] flex items-center gap-1.5">
                        <span>🎙️</span>
                        <span>{t.order.reviewVoiceAttached}</span>
                      </div>
                    )}
                    {formData.hasImageAttachment && (
                      <div className="text-sky-300 flex items-center gap-1.5">
                        <span>📷</span>
                        <span>
                          {t.order.reviewImageAttached} {formData.selectedFileName}
                        </span>
                      </div>
                    )}
                    {!formData.hasAudioRecording && !formData.hasImageAttachment && (
                      <div className="text-slate-400">
                        {t.order.reviewNoAttachments}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Honest Delivery Disclaimer Banner */}
              <div className="p-3.5 rounded-xl bg-[#162A56]/40 border border-amber-600/40 text-xs text-amber-200/90 flex items-start gap-2.5 leading-relaxed">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p>{t.order.reviewNotice}</p>
                </div>
              </div>

              {/* Status if WhatsApp has been opened */}
              {hasLaunchedWhatsApp && (
                <div className="mt-4 p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-xs text-white">
                  <div className="font-bold text-[#25D366] flex items-center gap-1.5 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {lang === 'ur' ? 'واٹس ایپ چیٹ کھل چکی ہے!' : 'WhatsApp Chat Launched!'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    {lang === 'ur'
                      ? 'اگر چیٹ خودکار نہیں کھلی تو نیچے "میسج کاپی کریں" دبائیں یا واٹس ایپ ویب کا استعمال کریں۔'
                      : 'If WhatsApp did not open automatically, copy the message text below or use WhatsApp Web.'}
                  </p>
                </div>
              )}

              {/* Modal Buttons: Edit vs Continue to WhatsApp */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                {/* Continue to WhatsApp */}
                <button
                  type="button"
                  disabled={isLaunching}
                  onClick={handleContinueToWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-extrabold shadow-lg shadow-[#25D366]/30 transition-all cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4 fill-white text-transparent" />
                  <span>
                    {isLaunching
                      ? lang === 'ur'
                        ? 'کھل رہا ہے...'
                        : 'Launching...'
                      : t.order.btnContinueToWhatsApp}
                  </span>
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#16284F] hover:bg-[#1C3366] text-[#FFE89E] border border-[#F5B041]/30 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{t.order.btnEdit}</span>
                </button>

                {/* Copy Text Button */}
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#070D1E] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  title="Copy formatted message"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? t.order.copied : t.order.btnCopyText}</span>
                </button>
              </div>

              {/* Alternate Web link for desktop / blocked popups */}
              <div className="mt-3 text-center">
                <a
                  href={`https://web.whatsapp.com/send?phone=${WHATSAPP_INTL_NUMBER}&text=${encodeURIComponent(formattedMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-[#FFE89E] underline underline-offset-4"
                >
                  <span>{t.order.btnOpenWhatsAppWeb}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
