import api from './api';

// Authentication Services
export const authService = {
  // User signup
  signup: async (userData) => {
    try {
      const response = await api.post('/user/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },

  // User login
  login: async (credentials) => {
    try {
      const response = await api.post('/user/login', credentials);
      // Backend returns jwt_token, not token
      const token = response.data.jwt_token || response.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get current token
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default authService;
