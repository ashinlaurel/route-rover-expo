import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';
import { API_URL, PRODUCTION_API_URL } from '@env';

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  facebookSignIn: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Use appropriate URL based on platform and environment
const BASE_URL = __DEV__ 
  ? Platform.select({
      // For Android Emulator, use 10.0.2.2 (Android's special localhost)
      android: API_URL.replace('localhost', '10.0.2.2'),
      // For iOS and other platforms, use the configured API_URL
      default: API_URL,
    })
  : PRODUCTION_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('auth_token');
      // You might want to redirect to login here
    }
    return Promise.reject(error);
  }
);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        try {
          const { data } = await api.get('/auth/me');
          console.log('User data:', data);
          setUser(data.user);
        } catch (error) {
          // If token is invalid or expired, clear it
          await AsyncStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking auth state:', error);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email, BASE_URL });
      
      const { data } = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      
      console.log('Login response:', data);

      // Save the token
      await AsyncStorage.setItem('auth_token', data.token);

      // Set user data
      setUser(data.user);

      router.push('/mainfeed');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login API error:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            baseURL: error.config?.baseURL,
            headers: error.config?.headers,
          }
        });

        if (error.code === 'ECONNABORTED') {
          throw new Error('Connection timeout. Please check your internet connection.');
        }

        if (!error.response) {
          throw new Error('Network error. Please check your internet connection.');
        }

        // Handle specific error status codes
        switch (error.response.status) {
          case 401:
            throw new Error('Invalid email or password');
          case 404:
            throw new Error('Login service not found. Please try again later.');
          case 422:
            throw new Error(error.response.data?.message || 'Invalid login credentials');
          case 500:
            throw new Error('Server error. Please try again later.');
          default:
            throw new Error(error.response.data?.message || 'Login failed');
        }
      }
      console.error('Non-Axios error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, phone?: string) => {
    try {
      const { data } = await api.post<LoginResponse>('/auth/register', {
        email,
        password,
        name,
        phone,
      });
      
      // Save the token
      await AsyncStorage.setItem('auth_token', data.token);

      // Set user data
      setUser(data.user);

      router.push('/mainfeed');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Signup failed');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      // You might want to call a logout endpoint here
      // await api.post('/auth/logout');
      
      // Clear the token
      await AsyncStorage.removeItem('auth_token');
      
      // Clear user data
      setUser(null);
      
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      // Implement Google Sign-in logic here
      console.log('Google Sign-in');
    } catch (error) {
      console.error('Google Sign-in error:', error);
      throw error;
    }
  };

  const facebookSignIn = async () => {
    try {
      // Implement Facebook Sign-in logic here
      console.log('Facebook Sign-in');
    } catch (error) {
      console.error('Facebook Sign-in error:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        googleSignIn,
        facebookSignIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };
export default UserProvider; 