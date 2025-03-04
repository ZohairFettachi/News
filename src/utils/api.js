import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  response => {
    console.log(`API Response: ${response.status} for ${response.config.url}`);
    return response;
  },
  error => {
    if (error.response) {
      console.error(`API Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('API No Response:', error.request);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API methods
export const getNews = async (category = 'general') => {
  try {
    const response = await api.get(`/news?category=${category}`);
    return response.data;
  } catch (error) {
    console.error('Error in getNews:', error);
    throw error;
  }
};

export const testApi = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('Error in testApi:', error);
    throw error;
  }
};

export default api; 