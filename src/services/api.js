import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 120000,
});

// ── Upload ──────────────────────────────────────────────
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// ── Query ───────────────────────────────────────────────
export const sendQuery = async (query, sessionId) => {
  const { data } = await api.post('/api/query', {
    query,
    session_id: sessionId,
  });
  return data;
};

// ── Sessions ────────────────────────────────────────────
export const getSessions = async () => {
  const { data } = await api.get('/api/sessions');
  return data;
};

export const getSession = async (sessionId) => {
  const { data } = await api.get(`/api/sessions/${sessionId}`);
  return data;
};

export const deleteSession = async (sessionId) => {
  const { data } = await api.delete(`/api/sessions/${sessionId}`);
  return data;
};

// ── Health ──────────────────────────────────────────────
export const healthCheck = async () => {
  const { data } = await api.get('/api/health');
  return data;
};

export default api;
