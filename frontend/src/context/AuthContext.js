import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Optionally handle error (e.g., clear localStorage)
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
