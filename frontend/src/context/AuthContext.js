import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

// Create Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API base URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Configure axios to include token in headers
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Register user
  const register = useCallback(
    async (userData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        const { token, user } = response.data;

        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return { success: true, data: user };
      } catch (err) {
        const message = err.response?.data?.message || 'Registration failed';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

  // Login user
  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        });
        const { token, user } = response.data;

        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return { success: true, data: user };
      } catch (err) {
        const message = err.response?.data?.message || 'Login failed';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

  // Get current user profile
  const getProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
      return null;
    }
  }, [API_URL]);

  // Update profile
  const updateProfile = useCallback(
    async (profileData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.put(`${API_URL}/auth/update-profile`, profileData);
        setUser(response.data.user);
        return { success: true, data: response.data.user };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update profile';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

  // Logout user
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
