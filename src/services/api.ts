import axios from 'axios';
import { getStoredToken } from './auth';

const BASE_URL = 'http://localhost:8080/api';

export interface InventoryDrug {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  expiryDate: string;
  manufacturer: string;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const inventoryApi = {
  getAllDrugs: async () => {
    const response = await api.get('/v1/inventory-drug');
    return response.data;
  },

  getDrugById: async (id: number) => {
    const response = await api.get(`/v1/inventory-drug/${id}`);
    return response.data;
  },

  createDrug: async (drug: Omit<InventoryDrug, 'id'>) => {
    const response = await api.post('/v1/inventory-drug', drug);
    return response.data;
  },

  updateDrug: async (id: number, drug: InventoryDrug) => {
    const response = await api.put(`/v1/inventory-drug/${id}`, drug);
    return response.data;
  },

  deleteDrug: async (id: number) => {
    const response = await api.delete(`/v1/inventory-drug/${id}`);
    return response.data;
  },
};