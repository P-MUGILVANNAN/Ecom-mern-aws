import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: ""
  });

  const { id } = useParams();  // ✅ Get product ID from URL
  // ✅ Fetch product details from API using ID
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  return (
    <div className='container mt-5'>
      <div className="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to={'/'}><a href="#">Home</a></Link></li>
            <li class="breadcrumb-item active" aria-current="page">Product Details</li>
          </ol>
        </nav>
        <div className="col">
          <div className="card" style={{ width: "20rem", border: 'none' }}>
            <img src={product.imageUrl} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Price: ₹{product.price}</p>
              <p className="card-text">Category: {product.category}</p>
              <p className="card-text">Stock: {product.stock}</p>
              <button className="btn btn-primary">Buy Now</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails