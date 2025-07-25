import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:5000';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  // Persist user and token
  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  // Auto-login on mount if token exists
  useEffect(() => {
    if (token && !user) {
      // Optionally, fetch user profile from backend here
      // For now, rely on localStorage
    }
  }, [token, user]);

  // Register
  const register = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Registration failed');
      setUser(result.user);
      setToken(result.token);
      toast.success('Registration successful!');
      return result;
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Login failed');
      setUser(result.user);
      setToken(result.token);
      toast.success('Login successful!');
      return result;
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    toast.success('Logged out successfully!');
  };

  // Attach token to fetch requests (utility)
  const authFetch = async (url, options = {}) => {
    const headers = options.headers || {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    // Prepend BASE_URL if url is relative
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    return fetch(fullUrl, { ...options, headers });
  };

  const value = {
    user,           // existing
    token,          // existing
    loading,        // existing
    login,          // existing
    register,       // existing
    logout,         // existing
    authFetch,      // existing
    isAuthenticated: !!user && !!token,
    // Add these to match ProtectedRoute expectations:
    currentUser: user,         // alias for user
    userRole: user?.role       // assuming your user object has a role property
};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};