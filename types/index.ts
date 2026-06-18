export type UserRole = 'STUDENT' | 'TUTOR' | 'ADMIN';
export type BookingStatus = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'ACTIVE' | 'BANNED';
  createdAt: Date;
}

export interface TutorProfile {
  id: string;
  userId: string;
  bio: string;
  pricePerHour: number;
  rating: number;
  availability: Record<string, string[]>; 
  user?: User; 
  categories?: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorProfileId: string;
  slot: string;
  status: BookingStatus;
  createdAt: Date;
  student?: User;
  tutor?: TutorProfile;
}

export interface Review {
  id: string;
  studentId: string;
  tutorProfileId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  student?: User;
}