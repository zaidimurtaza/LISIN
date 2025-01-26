import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  getAccessToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
  }, [accessToken]);

  const login = (token: string, refresh: string) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refresh);
    setAccessToken(token);
    setRefreshToken(refresh);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const getAccessToken = async () => {
    if (!accessToken) return null;

    try {
      const decoded: any = jwtDecode(accessToken);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (!isExpired) return accessToken;

      if (refreshToken) {
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        setAccessToken(newAccessToken);
        return newAccessToken;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};