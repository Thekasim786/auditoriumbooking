// src/utils/auth.js
// Helper functions for authentication throughout your React app

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Get the stored JWT token (checks both storages)
 */
export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

/**
 * Get the stored user object
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is logged in
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Check if user has a specific role
 */
export const hasRole = (role) => {
  const user = getUser();
  return user?.roles?.includes(role) || false;
};

/**
 * Logout — clear token and user from storage, redirect to login
 */
export const logout = (navigate) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  if (navigate) navigate('/login');
};

/**
 * Make an authenticated API request.
 * Automatically attaches the JWT Bearer token.
 *
 * Usage:
 *   const data = await authFetch('/auth/me');
 *   const data = await authFetch('/bookings', { method: 'POST', body: JSON.stringify(payload) });
 */
export const authFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // If 401, token expired — force logout
  if (response.status === 401) {
    logout();
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  return response;
};