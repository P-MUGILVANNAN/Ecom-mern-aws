import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios"; // ✅ Use axios for consistency

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // ✅ Memoized fetchCartCount
  const fetchCartCount = useCallback(async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      const data = Array.isArray(res.data.cart)
        ? res.data.cart
        : res.data || [];

      const count = data.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );
      setCartCount(count);
    } catch (err) {
      console.error("❌ Error fetching cart count:", err);
      setCartCount(0);
    }
  }, []);

  // 🔁 Auto-login if user stored in localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchCartCount(parsedUser.userId); // ✅ Load cart count on page refresh
      }
    } catch (error) {
      console.error("🚨 Error parsing stored user:", error);
      localStorage.removeItem("user");
    }
  }, [fetchCartCount]);

  // 🟢 Login
  const login = useCallback(
    (userData) => {
      if (!userData.userId) {
        console.error("🚨 Missing userId in login data!");
        return;
      }

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      fetchCartCount(userData.userId); // ✅ Load cart count on login
    },
    [fetchCartCount]
  );

  // 🔴 Logout
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    navigate("/"); // ✅ redirect after logout
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
