export type Language = 'ur' | 'en';

export interface OrderFormData {
  fullName: string;
  phone: string;
  block: string;
  street: string;
  houseNumber: string;
  orderType: 'standard' | 'parcel';
  parcelPickupLocation?: string;
  parcelDropoffLocation?: string;
  orderDetails: string;
  hasAudioRecording: boolean;
  hasImageAttachment: boolean;
  selectedFileName?: string;
}

export interface FeedbackData {
  rating: number;
  category: string;
  customerName: string;
  comments: string;
}
