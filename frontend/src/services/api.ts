import axios from 'axios';
import { AuthResponse, Question, Submission } from '../types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>('/auth/register', { name, email, password }),
  
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
};

export const questionsAPI = {
  getAll: (params?: { difficulty?: string; category?: string; page?: number }) =>
    api.get<{ questions: Question[]; total: number; totalPages: number }>('/questions', { params }),
  
  getById: (id: string) =>
    api.get<Question>(`/questions/${id}`),
};

export const submissionsAPI = {
  create: (questionId: string, code: string, language: string) =>
    api.post<Submission>('/submissions', { questionId, code, language }),
  
  getAll: () =>
    api.get<Submission[]>('/submissions'),
  
  getStats: () =>
    api.get('/submissions/stats'),
};

export default api;
