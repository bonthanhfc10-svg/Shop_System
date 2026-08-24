import { api } from './api';

const FAKE_ADMIN = {
  token: 'fake-admin-token',
  user: {
    id: 1,
    name: 'Admin',
    email: 'bonthanhfc10@gmail.com',
    role: 'admin',
  },
};

const FAKE_USER = {
  token: 'fake-user-token',
  user: {
    id: 2,
    name: 'Customer',
    email: 'user@shop.com',
    role: 'user',
  },
};

export const authService = {
  login: async (credentials) => {
    if (credentials.email === 'bonthanhfc10@gmail.com' && credentials.password === '2222') {
      return FAKE_ADMIN;
    }
    if (credentials.email === 'user@shop.com' && credentials.password === 'user123') {
      return FAKE_USER;
    }
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    if (token === 'fake-admin-token') return { user: FAKE_ADMIN.user };
    if (token === 'fake-user-token') return { user: FAKE_USER.user };
    const res = await api.get('/auth/profile');
    return res.data;
  },

  updateProfile: (data) => api.put('/auth/profile', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};
