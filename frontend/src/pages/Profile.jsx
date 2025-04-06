// pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/${user.userId}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    if (user) fetchUserDetails();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/${user.userId}`, formData);
      login({ ...user, ...res.data }); // update context too
      setMessage("Profile updated successfully!");
    } catch (err) {
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
            <li className="list-group-item">Profile</li>
            <li className="list-group-item">Add Address</li>
            <li className="list-group-item">Update Profile</li>
            <li className="list-group-item text-danger" onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </li>
          </ul>
        </div>

        {/* Profile Info */}
        <div className="col-md-9">
          <div className="card p-4 shadow-sm">
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
              <div className="mb-3">
                <label>Address</label>
                <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
              </div>
              <button className="btn btn-primary" type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
