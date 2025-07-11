import axios from 'axios';

// Configure base URL for your backend server
const API_BASE_URL = 'http://localhost:5000/api'; // Update this with your server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Token storage functions (you might want to use AsyncStorage in production)
let storedToken: string | null = null;

export const setStoredToken = (token: string) => {
  storedToken = token;
};

export const getStoredToken = () => {
  return storedToken;
};

export const clearStoredToken = () => {
  storedToken = null;
};

// Authentication API
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      setStoredToken(response.data.token);
    }
    return {
      success: true,
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = () => {
  clearStoredToken();
};

// Bundle API
export const getBundles = async () => {
  try {
    const response = await api.get('/bundles');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createBundle = async (bundleData: any) => {
  try {
    const response = await api.post('/bundles', bundleData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateBundle = async (id: string, bundleData: any) => {
  try {
    const response = await api.put(`/bundles/${id}`, bundleData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteBundle = async (id: string) => {
  try {
    const response = await api.delete(`/bundles/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Materials API
export const getMaterials = async () => {
  try {
    const response = await api.get('/materials');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createMaterial = async (materialData: any) => {
  try {
    const response = await api.post('/materials', materialData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Suppliers API
export const getSuppliers = async () => {
  try {
    const response = await api.get('/suppliers');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createSupplier = async (supplierData: any) => {
  try {
    const response = await api.post('/suppliers', supplierData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Blocks API
export const getBlocks = async () => {
  try {
    const response = await api.get('/blocks');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createBlock = async (blockData: any) => {
  try {
    const response = await api.post('/blocks', blockData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Orders API
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const response = await api.post('/orders', orderData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default api;