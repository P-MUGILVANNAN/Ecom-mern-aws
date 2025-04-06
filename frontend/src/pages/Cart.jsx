import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { user, setCartCount } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Update global cart count based on items
  const updateGlobalCartCount = (items) => {
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    if (!user || !user.userId) {
      console.warn("⚠️ User not logged in.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/cart/${user.userId}`)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.cart)
          ? res.data.cart
          : [];
        setCartItems(data);
        updateGlobalCartCount(data); // 🆕 Set global cart count
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching cart:", err.response?.data || err);
        setMessage("Failed to load cart items.");
        setLoading(false);
      });
  }, [user]);

  const handleQuantityChange = (productId, change) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(updatedCart);
    updateGlobalCartCount(updatedCart); // 🆕 Update cart count
  };

  const handleRemoveItem = (productId) => {
    if (!user || !user.userId) {
      console.error("🚨 Cannot remove item: userId missing.");
      return;
    }

    axios
      .post(`http://localhost:5000/api/cart/remove`, {
        userId: user.userId,
        productId,
      })
      .then(() => {
        const filtered = cartItems.filter((item) => item._id !== productId);
        setCartItems(filtered);
        updateGlobalCartCount(filtered); // 🆕 Update cart count
      })
      .catch(() => setMessage("Error removing item"));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (!user || !user.userId) {
    return (
      <div className="text-center mt-5">
        <h4>Please log in to access your cart.</h4>
        <Link to="/login" className="btn btn-primary mt-3">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}

      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <div className="text-center">
          <h4>Your cart is empty.</h4>
          <Link to="/" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div key={item._id} className="card mb-3 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.imageUrl}
                      className="img-fluid rounded"
                      alt={item.name}
                    />
                  </div>
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text text-muted">₹{item.price} each</p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleQuantityChange(item._id, -1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleQuantityChange(item._id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h4>Order Summary</h4>
                <p className="text-muted">Total Items: {cartItems.length}</p>
                <h5>Total Price: ₹{totalPrice.toFixed(2)}</h5>
                <button className="btn btn-success w-100 mt-3">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
