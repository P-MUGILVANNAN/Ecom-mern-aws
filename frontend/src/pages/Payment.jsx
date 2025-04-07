import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Payment = () => {
  const { user } = useAuth();
  const [address, setAddress] = useState(null);
  const [selected, setSelected] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5000/api/auth/${user.userId}`);
        setAddress(userRes.data.address);
        setSelected(true);

        const cartRes = await axios.get(`http://localhost:5000/api/cart/${user.userId}`);
        setCartItems(cartRes.data);
        const calculatedTotal = cartRes.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(calculatedTotal);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDetails();
  }, [user]);

  

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Order Summary</h3>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div key={item._id} className="card mb-3 p-3 shadow-sm d-flex flex-row align-items-center">
          <img
            src={item.imageUrl} // Make sure this matches your image field name
            alt={item.name}
            style={{ width: "80px", height: "80px", objectFit: "contain", marginRight: "20px", borderRadius: "8px" }}
          />
          <div>
            <h5>{item.name}</h5>
            <p className="mb-1">₹{item.price} × {item.quantity}</p>
            <p className="mb-0 text-muted">Total: ₹{item.price * item.quantity}</p>
          </div>
        </div>
      ))}


      <h5 className="mt-4">Total: ₹{total}</h5>

      <hr />

      <h4 className="mt-4">Delivery Address</h4>
      <div className={`card p-4 shadow-sm ${selected ? "border-primary" : ""}`} style={{ cursor: "pointer" }}>
        {address ? (
          <>
            <div className="form-check">
              <input type="radio" checked={selected} onChange={() => setSelected(true)} />
              <label className="form-check-label ms-2">
                <strong>{user?.name}</strong> | {user?.phone}
              </label>
            </div>
            <p className="mt-2 mb-0"><strong>Street:</strong> {address.street}</p>
            <p className="mb-0"><strong>Landmark:</strong> {address.landmark}</p>
            <p className="mb-0"><strong>City:</strong> {address.city}</p>
            <p className="mb-0"><strong>State:</strong> {address.state}</p>
            <p><strong>Pincode:</strong> {address.zip}</p>
          </>
        ) : <p>No address found.</p>}
      </div>

      <button className="btn btn-success mt-4">Proceed to Pay ₹{total}</button>
    </div>
  );
};

export default Payment;
