import { useState, useEffect } from 'react';
import { User } from '@/types';
import { loadAuth, saveAuth, clearAuth } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = loadAuth();
    if (auth) {
      setUser(auth.user);
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    const token = `TOKEN_${Date.now()}`;
    const auth = { user: userData, token };
    saveAuth(auth);
    setUser(userData);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return { user, loading, login, logout };
};
