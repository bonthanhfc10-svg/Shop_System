import { api } from './api';

export const paymentService = {
  getAll: (params) => api.get(`/payments?${new URLSearchParams(params)}`),
  getById: (id) => api.get(`/payments/${id}`),
  create: (data) => api.post('/payments', data),
};
