import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

const Electronics = () => {
  const { user, setCartCount } = useAuth(); // ⬅️ Get setCartCount from AuthContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [quantities, setQuantities] = useState({});

  // Fetch electronics products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/category/Electronics")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
        const initialQuantities = {};
        response.data.forEach((product) => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => {
        setError("Failed to load electronics products");
        setLoading(false);
      });
  }, []);

  // Handle quantity change
  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change),
    }));
  };

  // Add to Cart
  const handleAddToCart = async (productId) => {
    if (!user || !user.userId) {
      setMessage("Please log in to add items to the cart.");
      return;
    }

    const requestData = {
      userId: user.userId,
      productId,
      quantity: quantities[productId] || 1,
    };

    console.log("📤 Sending Add to Cart Request:", requestData);

    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", requestData);
      console.log("🛒 Add to Cart Response:", response.data);
      setMessage(response.data.message);

      await fetchCart(); // ⬅️ Update the cart count after successful addition
    } catch (err) {
      console.error("❌ Error adding to cart:", err.response ? err.response.data : err);
      setMessage("Error adding to cart. Try again.");
    }
  };

  // Fetch Cart (used to update cart count after adding product)
  const fetchCart = async () => {
    if (!user || !user.userId) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${user.userId}`);
      const cartItems = Array.isArray(response.data.cart)
        ? response.data.cart
        : response.data;

      const count = cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );

      setCartCount(count); // ✅ Update global cart count for badge
      console.log("✅ Updated Cart Count:", count);
    } catch (err) {
      console.error("❌ Error fetching cart:", err.response ? err.response.data : err);
    }
  };

  return (
    <div>
      <Carousel />
      <div className="container mt-5">
        <h2 className="text-center text-primary mb-4">
          <i className="bi bi-tv"></i> Electronics
        </h2>

        {message && <div className="alert alert-info text-center">{message}</div>}

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
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
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <Link to={`/productdetails/${product._id}`}>
                      <h5 className="card-title text-dark">{product.name}</h5>
                    </Link>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text text-success fw-bold">
                      ₹{product.price}
                    </p>

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
    </div>
  );
};

export default Electronics;
