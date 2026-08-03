import { createContext, useContext, useState, type ReactNode } from 'react';
import * as authApi from '../api/auth';
import { clearToken, getToken, isTokenExpired, setToken } from '../api/client';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function hasValidToken(): boolean {
  const token = getToken();
  return !!token && !isTokenExpired(token);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasValidToken());

  async function login(email: string, password: string) {
    const response = await authApi.login({ email, password });
    setToken(response.token);
    setIsAuthenticated(true);
  }

  async function register(email: string, password: string, fullName: string) {
    const response = await authApi.register({ email, password, fullName });
    setToken(response.token);
    setIsAuthenticated(true);
  }

  function logout() {
    clearToken();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
