const API_BASE_URL = 'http://localhost:8080/api';

export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const isManager = () => {
  const user = getUser();
  return user?.role === 'ROLE_MANAGER';
};

export const isFaculty = () => {
  const user = getUser();
  return user?.role === 'ROLE_FACULTY';
};

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const logout = (navigate) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  if (navigate) navigate('/login');
};

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

  if (response.status === 401) {
    logout();
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  return response;
};
