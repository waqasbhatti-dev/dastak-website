export type Language = 'ur' | 'en';

export interface CustomerReview {
  id?: string;
  rating: number; // 1 to 5
  comment: string; // Review text
  displayName?: string; // Optional reviewer name
  category?: string; // Optional service category
  status: 'approved' | 'pending';
  createdAt?: any; // Firestore Timestamp
}
