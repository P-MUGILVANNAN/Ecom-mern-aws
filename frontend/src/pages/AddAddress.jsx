import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // You can either patch or put the user address
      const res = await axios.put(`http://localhost:5000/api/auth/${user.userId}`, {
        address: formData,
      });
      login({ ...user, address: res.data.address }); // update context
      setMessage("Address added successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add address");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">📬 Add New Address</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSave} className="shadow-sm p-4 bg-light rounded">
        <div className="mb-3">
          <label>Full Name</label>
          <input type="text" name="fullName" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="tel" name="phone" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Street Address</label>
          <input type="text" name="street" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Landmark (Optional)</label>
          <input type="text" name="landmark" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3 d-flex gap-3">
          <div>
            <label>City</label>
            <input type="text" name="city" className="form-control" onChange={handleChange} required />
          </div>
          <div>
            <label>State</label>
            <input type="text" name="state" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3 d-flex gap-3">
          <div>
            <label>Pin Code</label>
            <input type="text" name="zip" className="form-control" onChange={handleChange} required />
          </div>
          <div>
            <label>Country</label>
            <input type="text" name="country" className="form-control" value="India" readOnly />
          </div>
        </div>
        <button className="btn btn-primary w-100" type="submit">Save Address</button>
      </form>
    </div>
  );
};

export default AddAddress;
