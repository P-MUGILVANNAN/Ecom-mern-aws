import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-1">&copy; {new Date().getFullYear()} MND Ecommerce. All Rights Reserved.</p>
        <p className="small">
          Made with <span className="text-danger">❤</span> by Mugilvannan P.
        </p>
        <div>
          <a href="#" className="text-white me-3">
            Privacy Policy
          </a>
          <a href="#" className="text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
