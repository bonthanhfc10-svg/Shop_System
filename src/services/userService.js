import { api } from './api';

export const userService = {
  getAll: (params) => api.get(`/users?${new URLSearchParams(params)}`),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get('/users/stats'),
};
