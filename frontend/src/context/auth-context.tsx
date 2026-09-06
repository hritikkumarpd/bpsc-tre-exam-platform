'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient, ApiResponse } from '@/lib/api-client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'CONTENT_EDITOR' | 'TEACHER_EXPERT' | 'SUPPORT' | 'ADMIN' | 'SUPER_ADMIN';
  targetExam: 'STET_CSE' | 'BPSC_TRE_CSE' | 'BOTH';
  avatar?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: (credential: string, targetExam?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string, targetExam: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
      if (response.data?.success && response.data.data?.user) {
        setUser(response.data.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post<ApiResponse<{ user: User }>>('/auth/login', {
        email,
        password,
      });

      if (response.data.success && response.data.data?.user) {
        setUser(response.data.data.user);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message || 'Login failed' };
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message: msg };
    }
  };

  const loginWithGoogle = async (credential: string, targetExam?: string) => {
    try {
      const response = await apiClient.post<ApiResponse<{ user: User }>>('/auth/google', {
        credential,
        targetExam: targetExam || 'BOTH',
      });

      if (response.data.success && response.data.data?.user) {
        setUser(response.data.data.user);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message || 'Google sign-in failed' };
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Google sign-in failed. Please try again.';
      return { success: false, message: msg };
    }
  };

  const signup = async (name: string, email: string, password: string, targetExam: string) => {
    try {
      const response = await apiClient.post<ApiResponse<{ user: User }>>('/auth/register', {
        name,
        email,
        password,
        targetExam,
      });

      if (response.data.success && response.data.data?.user) {
        setUser(response.data.data.user);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message || 'Signup failed' };
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore error on logout
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        signup,
        logout,
        refreshUser: fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
