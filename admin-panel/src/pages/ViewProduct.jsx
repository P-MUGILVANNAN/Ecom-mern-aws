import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch all products from the server
    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    // ✅ Delete a product
    const deleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:5000/api/products/${id}`)
                .then(() => {
                    setProducts(products.filter(product => product._id !== id));
                })
                .catch((err) => console.error("Error deleting product:", err));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Product List</h2>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="text-truncate" style={{ maxWidth: "150px" }}>{product.name}</td>
                                        <td className="text-truncate" style={{ maxWidth: "250px" }}>{product.description}</td>
                                        <td>₹{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="img-fluid rounded"
                                                style={{ maxWidth: "50px", height: "auto" }}
                                            />
                                        </td>
                                        <td>
                                            <Link to={`/editproduct/${product._id}`}><button className="btn btn-warning btn-sm me-2">
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </button></Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewProduct;
