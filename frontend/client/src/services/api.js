import axios from 'axios';

// Base URL can be set using Vite env var VITE_API_URL.
// If not set, requests are relative and will work with the Vite dev proxy.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export default api;
