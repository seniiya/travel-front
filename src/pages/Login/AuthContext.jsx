import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    if (token && !user) {
      fetchUserInfo();
    }
  }, [token, user]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.post('http://3.37.134.143:8080/api/v1/user/userInfo', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = response.data.result;
      setUser(userData);
      // 사용자 정보를 세션 스토리지에 저장합니다.
      sessionStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user info:', error);
      logout();
    }
  };

  const login = (newToken, userData) => {
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);

  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);