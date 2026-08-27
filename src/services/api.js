import axios from 'axios';

// Axios instance for the Laravel REST API.
// Set VITE_API_URL in a .env file, e.g.:
//   VITE_API_URL=http://127.0.0.1:8000/api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach auth token from localStorage on every request when present.
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Normalize backend errors into a consistent shape for the UI.
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Exposed as a named export to remain compatible with the existing
// service modules (productService, authService, ...). Each method returns
// the parsed response body (`response.data`) so callers read `.data`-free.
async function request(config) {
  const response = await http(config);
  return response.data;
}

export const api = {
  get: (endpoint, config) => request({ method: 'GET', url: endpoint, ...config }),
  post: (endpoint, body, config) =>
    request({ method: 'POST', url: endpoint, data: body, ...config }),
  put: (endpoint, body, config) =>
    request({ method: 'PUT', url: endpoint, data: body, ...config }),
  patch: (endpoint, body, config) =>
    request({ method: 'PATCH', url: endpoint, data: body, ...config }),
  delete: (endpoint, config) => request({ method: 'DELETE', url: endpoint, ...config }),
};

export default http;
