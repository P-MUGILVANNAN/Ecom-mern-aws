import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈 Add AuthContext

const ProductDetails = () => {
  const { id } = useParams();
  const { user, setCartCount } = useAuth(); // 👈 Get user and setCartCount from context
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const imageRef = useRef(null);

  // Fetch Product Details
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        fetchRelatedProducts(res.data.category);
      })
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch Related Products
  const fetchRelatedProducts = (category) => {
    axios.get(`http://localhost:5000/api/products/category/${category}`)
      .then((res) => setRelatedProducts(res.data.filter(p => p._id !== id)))
      .catch((err) => console.error("Error fetching related products:", err));
  };

  // Add to Cart
  const handleAddToCart = async () => {
    if (!user || !user.userId) {
      setMessage("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userId: user.userId,
        productId: id,
        quantity: 1,
      });

      setMessage(response.data.message || "Added to cart successfully!");
      await fetchCart(); // 👈 Refresh cart count after adding
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      setMessage("Failed to add to cart.");
    }
  };

  // Fetch Cart to update badge count
  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${user.userId}`);
      const cartItems = Array.isArray(response.data.cart)
        ? response.data.cart
        : response.data;

      const count = cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );
      setCartCount(count); // 👈 Update global cart badge count
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    }
  };

  // Image zoom on hover
  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Product Details</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="row">
        <div className="col-md-5">
          <div className="zoom-container">
            <img
              ref={imageRef}
              src={product.imageUrl}
              className="img-fluid rounded shadow zoom-image"
              alt={product.name}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => (imageRef.current.style.transformOrigin = "center center")}
            />
          </div>
        </div>
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success">₹{product.price}</h4>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}</p>
          {message && <div className="alert alert-info">{message}</div>}
          <button className="btn btn-warning mt-3 me-3" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn btn-primary mt-3">Buy Now</button>
        </div>
      </div>

      {/* Related Products */}
      <h3 className="mt-5">Related Products</h3>
      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((related) => (
            <div key={related._id} className="col-md-3 mb-4">
              <div className="card">
                <img src={related.imageUrl} height={'250px'} className="card-img-top" alt={related.name} />
                <div className="card-body">
                  <h5 className="card-title">{related.name}</h5>
                  <p className="card-text text-success">₹{related.price}</p>
                  <Link to={`/productdetails/${related._id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : <p className="text-muted">No related products found.</p>}
      </div>
    </div>
  );
};

export default ProductDetails;
