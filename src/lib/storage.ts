import { Registration } from '@/types';
import { DEMO_REGISTRATIONS } from '@/constants/demoData';

const REGISTRATIONS_KEY = 'projit_registrations';

export const initializeRegistrations = (): void => {
  const existing = localStorage.getItem(REGISTRATIONS_KEY);
  if (!existing) {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(DEMO_REGISTRATIONS));
  }
};

export const getRegistrations = (): Registration[] => {
  const stored = localStorage.getItem(REGISTRATIONS_KEY);
  if (!stored) {
    initializeRegistrations();
    return DEMO_REGISTRATIONS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEMO_REGISTRATIONS;
  }
};

export const saveRegistration = (registration: Registration): void => {
  const registrations = getRegistrations();
  registrations.push(registration);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
};

export const getRegistrationsByEvent = (eventId: string): Registration[] => {
  return getRegistrations().filter(r => r.eventId === eventId);
};

export const getRegistrationsByUser = (email: string): Registration[] => {
  return getRegistrations().filter(r => r.email === email);
};

export const generateRegistrationId = (): string => {
  const registrations = getRegistrations();
  const count = registrations.length + 1;
  return `REG${count.toString().padStart(3, '0')}`;
};
