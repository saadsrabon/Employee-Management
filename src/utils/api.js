import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to add Authorization header
const authHeader = (token) => token ? { headers: { Authorization: `Bearer ${token}` } } : {};

// User APIs
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await api.get('/users/profile', authHeader(token));
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllEmployees = async (token, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/users/employees?page=${page}&limit=${limit}`, authHeader(token));
    return response.data.employees;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllUsers = async (token, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/users/all?page=${page}&limit=${limit}`, authHeader(token));
    return response.data.users;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUserByEmail = async (token, email) => {
  try {
    const response = await api.get(`/users/email/${email}`, authHeader(token));
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Payroll APIs
export const createPayrollRequest = async (token, requestData) => {
  try {
    const response = await api.post('/payroll/requests', requestData, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPayrollRequests = async (token, page = 1, limit = 20, status) => {
  try {
    let url = `/payroll/requests?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    const response = await api.get(url, authHeader(token));
    return response.data.requests;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const approvePayrollRequest = async (token, requestId) => {
  try {
    const response = await api.put(`/payroll/requests/${requestId}/approve`, {}, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Payments APIs
export const getPaymentHistory = async (token, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/payments?page=${page}&limit=${limit}`, authHeader(token));
    return response.data.payments;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllPayments = async (token, page = 1, limit = 20) => {
  try {
    const response = await api.get(`/payments/all?page=${page}&limit=${limit}`, authHeader(token));
    return response.data.payments;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getEmployeePayments = async (token, email, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/payments/employee/${email}?page=${page}&limit=${limit}`, authHeader(token));
    return response.data.payments;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createPayment = async (token, paymentData) => {
  try {
    const response = await api.post('/payments', paymentData, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Worksheet APIs
export const getWorkSheets = async (token, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/worksheets?page=${page}&limit=${limit}`, authHeader(token));
    return response.data.worksheets;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllWorkSheets = async (token, page = 1, limit = 50) => {
  try {
    const response = await api.get(`/worksheets/all?page=${page}&limit=${limit}`, authHeader(token));
    return response.data.worksheets;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getEmployeeWorkSheets = async (token, email, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/worksheets/employee/${email}?page=${page}&limit=${limit}`, authHeader(token));
    return response.data.worksheets;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createWorkSheet = async (token, workSheetData) => {
  try {
    const response = await api.post('/worksheets', workSheetData, authHeader(token));
    return response.data.worksheet;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Add more as needed for update/delete, etc.