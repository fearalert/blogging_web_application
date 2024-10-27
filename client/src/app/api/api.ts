import axios from 'axios';

export const API_URL = 'http://localhost:4000/api/v1';

interface UserProps {
  email: string;
  password: string;
}

interface RegisterResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export const registerUser = async (data: UserProps): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
};

export const loginUser = async (data: UserProps): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Login failed');
    }
    throw new Error('Login failed');
  }
};