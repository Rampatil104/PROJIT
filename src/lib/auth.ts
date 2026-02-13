import { AuthState, User, UserRole } from '@/types';

const AUTH_STORAGE_KEY = 'projit_auth';
const ADMIN_SECRET_CODE = 'PROJITADMIN2026';

export const saveAuth = (auth: AuthState): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const loadAuth = (): AuthState | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const clearAuth = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const validateAdminCode = (code: string): boolean => {
  return code === ADMIN_SECRET_CODE;
};

// Mock authentication functions
export const loginUser = (email: string, password: string): User | null => {
  // For demo purposes, any valid email/password combination works
  if (!email || !password || password.length < 6) {
    return null;
  }
  
  // Check if admin (stored users)
  const users = getStoredUsers();
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    return existingUser;
  }
  
  return null;
};

export const signupUser = (
  name: string,
  email: string,
  password: string,
  role: UserRole,
  adminCode?: string
): User | null => {
  if (!name || !email || !password || password.length < 6) {
    return null;
  }
  
  // Validate admin code if role is admin
  if (role === 'admin' && !validateAdminCode(adminCode || '')) {
    return null;
  }
  
  // Check if user already exists
  const users = getStoredUsers();
  if (users.find(u => u.email === email)) {
    return null;
  }
  
  // Create new user
  const newUser: User = {
    id: `USER_${Date.now()}`,
    name,
    email,
    role
  };
  
  // Save user
  users.push(newUser);
  saveStoredUsers(users);
  
  return newUser;
};

const USERS_STORAGE_KEY = 'projit_users';

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const saveStoredUsers = (users: User[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};
