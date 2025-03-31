import React, { useState,useNavigate } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
            setMessage(res.data.message);
            setFormData({ name: "", email: "", password: "" }); // Clear form
            window.location.replace('login');

        } catch (err) {
            setMessage(err.response?.data?.message || "Signup failed!");
        }

        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow bg-secondary p-4">
                        <h2 className="text-center mb-4">Signup</h2>

                        {message && <div className="alert alert-info">{message}</div>}

                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-info w-100" disabled={loading}>
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                        </form>

                        {/* Login Link */}
                        <p className="mt-3 text-center">
                            Already have an account? <Link to='/login'><a className="text-warning" href="">Login</a></Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
