import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, cartCount } = useAuth(); // Get user, logout, and cart count
  // console.log("User:", user); // Log the user for debugging

  // console.log("Cart Count:", cartCount); // Log the cart count for debugging

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid fs-5">
        <Link to="/" className="text-decoration-none">
          <span className="navbar-brand text-warning fs-4">
            <i className="bi bi-bag-check-fill"></i> MND Ecommerce
          </span>
        </Link>
        <button
          className="navbar-toggler bg-info"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav align-items-center gap-lg-5 ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light active">
                <i className="bi bi-house-door"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/electronics" className="nav-link text-light">
                <i className="bi bi-camera-fill"></i> Electronics
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/clothings" className="nav-link text-light">
                <i className="bi bi-person-standing-dress"></i> Clothings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mobiles" className="nav-link text-light">
                <i className="bi bi-phone"></i> Mobiles
              </Link>
            </li>

            {/* Cart Button with Badge */}
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <button className="btn btn-warning text-dark position-relative">
                  <i className="bi bi-cart"></i> Cart
                  {cartCount > 0 && (
                    <span className="position-absolute badge text-bg-danger">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
            </li>

            {/* Conditional Rendering: Show Signup if No User, Profile if Logged In */}
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i> {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item">
                      <Link to={'/profile'} className="text-dark text-decoration-none"><i className="bi bi-box-arrow-right"></i> Profile</Link>
                    </button>
                    <button className="dropdown-item" onClick={logout}>
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  <button className="btn btn-secondary">
                    <i className="bi bi-person-bounding-box"></i> Sign Up
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
