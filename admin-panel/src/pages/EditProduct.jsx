import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();  // ✅ Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: ""
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch product details from API using ID
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setPreview(res.data.imageUrl);  // Set image preview
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    // Display image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    if (product.image) formData.append("image", product.image);

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/viewproducts"), 2000);
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage("Failed to update product.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Edit Product</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
            </select>
          </div>

          {/* Stock */}
          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <img src={preview} alt="Preview" className="img-thumbnail w-25 mb-3" />
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
