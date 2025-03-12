import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const login = (userData) => {
    // Ensure the token is present
    if (!userData.token) {
      console.warn('Token not found in userData. Ensure your login API returns a token.');
      // Optionally, you could assign a default value:
      // userData.token = '';
    }
    setAuth(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
