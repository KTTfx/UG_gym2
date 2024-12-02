export type UserType = 'student' | 'staff' | 'public';
export type SubscriptionDuration = 'monthly' | 'quarterly' | 'annually';
export type PaymentStatus = 'pending' | 'approved';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  medicalCondition: string;
  phone: string;
  userType: string;
  universityId: number;
  hallOfResidence: string;
  department: string;
  // subscription?: Subscription;  // Optional subscription field
}
interface Subscription {
  package: string;
  startDate: Date;
  endDate: Date;
  status: boolean;
}