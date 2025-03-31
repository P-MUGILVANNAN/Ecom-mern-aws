import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle text input change
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Show preview
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("stock", product.stock);
        formData.append("image", image); // Attach image file

        try {
            const res = await axios.post("http://localhost:5000/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("✅ Product uploaded successfully!");
            setProduct({ name: "", description: "", price: "", category: "", stock: "" });
            setImage(null);
            setPreview(null);
        } catch (err) {
            setMessage("❌ Error uploading product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Upload New Product</h2>

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
                        <select name="category" className="form-select" value={product.category} onChange={handleChange} required>
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
                        <input type="file" name="image" className="form-control" accept="image/*" onChange={handleImageChange} required />
                    </div>

                    {/* Image Preview */}
                    {preview && <img src={preview} alt="Preview" className="img-thumbnail w-25 mb-3" />}

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Uploading..." : "Upload Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
