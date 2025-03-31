import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Trending = () => {
  const { user } = useAuth(); // Get logged-in user from AuthContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [quantities, setQuantities] = useState({}); // Track quantity for each product

  // Fetch trending products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/trending")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
        // Initialize quantity state for each product
        const initialQuantities = {};
        response.data.forEach((product) => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  // Handle quantity change with buttons
  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change), // Ensure quantity doesn't go below 1
    }));
  };

  // Add to Cart Function
  const handleAddToCart = async (productId) => {
    if (!user) {
      setMessage("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userId: user._id, // Get user ID from AuthContext
        productId,
        quantity: quantities[productId] || 1, // Use selected quantity
      });

      setMessage(response.data.message); // Show success message
    } catch (err) {
      setMessage("Error adding to cart. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-warning mb-4">
        <i className="bi bi-fire"></i> Trending Products
      </h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-dark">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text text-success fw-bold">
                    ₹{product.price}
                  </p>

                  {/* Quantity Selector with Buttons */}
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleQuantityChange(product._id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2 fs-5">{quantities[product._id] || 1}</span>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleQuantityChange(product._id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-info w-100"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
