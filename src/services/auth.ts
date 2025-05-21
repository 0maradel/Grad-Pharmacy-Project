import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

interface AuthResponse {
  statusCode: number;
  message: string;
  status: boolean;
  data: string; // This is the token
}

export const authenticate = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    
    if (response.data.status) {
      // Store the token
      localStorage.setItem('token', response.data.data);
    }
    
    return response.data;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeStoredToken = (): void => {
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};