import { createContext, useContext, useEffect, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login Function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
