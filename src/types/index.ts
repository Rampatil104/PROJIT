export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface Event {
  id: string;
  name: string;
  entryFee: number;
  maxTeamSize: number;
  minTeamSize?: number;
  description: string;
  rules: string[];
  coordinators: Coordinator[];
  location?: string;
  maxParticipants?: number;
  registeredCount: number;
  judging?: JudgingCriteria[];
  specialRequirements?: string[];
  transportInfo?: string;
}

export interface Coordinator {
  name: string;
  phone: string;
  designation?: string;
}

export interface JudgingCriteria {
  criterion: string;
  percentage: number;
}

export interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  gender: 'Male' | 'Female' | 'Other';
  teamName?: string;
  teamMembers?: TeamMember[];
  paymentReference: string;
  registeredAt: string;
  status: 'confirmed' | 'pending';
}

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

export interface TransportRoute {
  id: string;
  name: string;
  driver: {
    name: string;
    phone: string;
  };
  stops: string[];
  arrivalTime: string;
}

export interface AnalyticsData {
  totalParticipants: number;
  genderDistribution: {
    male: number;
    female: number;
    other: number;
  };
  yearDistribution: {
    [key: string]: number;
  };
  departmentDistribution: {
    [key: string]: number;
  };
  eventDistribution: {
    [key: string]: number;
  };
  totalRevenue: number;
  mostPopularEvent: string;
}
