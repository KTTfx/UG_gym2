export type UserType = 'student' | 'staff' | 'public';
export type SubscriptionDuration = 'monthly' | 'quarterly' | 'annually';
export type PaymentStatus = 'pending' | 'approved';

export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  contactNumber: string;
  userType: UserType;
  universityId?: string;
  hallOfResidence?: string;
  department?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  duration: SubscriptionDuration;
  startDate: string;
  endDate: string;
  status: PaymentStatus;
  price: number;
}