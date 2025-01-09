import React, { createContext, useState, useContext, useEffect } from 'react';
import fetchServer from '../utils/fetchServer';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const getUser = async () => {
    const user = await fetchServer('user/me/username', {
      method: 'GET',
    });
    const userData = await user.json()
    console.log(userData)
    setUser(userData.username);
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'auth/me/username', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.username);
      }
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        await getUser();
        return true;
      }
    } catch (error) {
      console.error('Login failed', error);
    }
    return false;
  };

  const signup = async (username, password) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        await getUser();
        return true;
      }
    } catch (error) {
      console.error('Signup failed', error);
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
