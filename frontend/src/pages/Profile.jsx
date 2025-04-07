// pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      landmark: "",
    },
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/${user.userId}`);
        const userData = res.data;

        // Ensure address is an object
        const formattedAddress = typeof userData.address === "object"
          ? userData.address
          : {
              street: "",
              city: "",
              state: "",
              zip: "",
              landmark: "",
            };

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: formattedAddress,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    if (user) fetchUserDetails();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/${user.userId}`, formData);
      login({ ...user, ...res.data }); // Update context
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light p-3 rounded shadow-sm">
          <h5>Account</h5>
          <ul className="list-group">
            <li className="list-group-item active">Profile</li>
            <Link to="/add-address" className="text-decoration-none">
              <li className="list-group-item">Add Address</li>
            </Link>
            <li
              className="list-group-item text-danger"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </li>
          </ul>
        </div>

        {/* Profile Info */}
        <div className="col-md-9">
          <div className="card p-4 shadow-sm mb-4">
            <h4>Profile Info</h4>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>Phone</label>
                <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
              </div>
              <h5 className="mt-4 mb-3">Address</h5>
              <div className="mb-3">
                <label>Street</label>
                <input type="text" name="street" className="form-control" value={formData.address.street} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>Landmark</label>
                <input type="text" name="landmark" className="form-control" value={formData.address.landmark} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>City</label>
                <input type="text" name="city" className="form-control" value={formData.address.city} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>State</label>
                <input type="text" name="state" className="form-control" value={formData.address.state} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label>Pincode</label>
                <input type="text" name="pincode" className="form-control" value={formData.address.zip} onChange={handleChange} />
              </div>
              <button className="btn btn-primary" type="submit">
                Update Profile
              </button>
            </form>
          </div>

          {/* Show Address Card */}
          <div className="card p-4 shadow-sm bg-light">
            <h5 className="mb-3">Saved Address</h5>
            <div className="border rounded p-3 bg-white">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Street:</strong> {formData.address.street}</p>
              <p><strong>Landmark:</strong> {formData.address.landmark}</p>
              <p><strong>City:</strong> {formData.address.city}</p>
              <p><strong>State:</strong> {formData.address.state}</p>
              <p><strong>Pincode:</strong> {formData.address.zip}</p>
              <Link to="/add-address" className="btn btn-outline-primary btn-sm mt-2">
                Edit Address
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
