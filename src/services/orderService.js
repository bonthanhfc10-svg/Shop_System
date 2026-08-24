import { api } from './api';

export const orderService = {
  getAll: (params) => api.get(`/orders?${new URLSearchParams(params)}`),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  getMyOrders: (params) => api.get(`/orders/my?${new URLSearchParams(params)}`),
  getStats: () => api.get('/orders/stats'),
};
