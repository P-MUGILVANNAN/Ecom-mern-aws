import React from 'react';

const AboutUs = () => {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* Left Column - Image */}
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/007/931/694/non_2x/about-us-button-about-us-text-template-for-website-about-us-icon-flat-style-vector.jpg" 
            alt="About Us" 
            className="img-fluid rounded shadow" 
          />
        </div>
        
        {/* Right Column - Content */}
        <div className="col-lg-6">
          <h1 className="text-primary">About Us</h1>
          <p className="lead text-muted">
            Welcome to <strong>MND Ecommerce</strong>, your number one source for all things product, e.g., electronics, fashion. 
            We're dedicated to providing you with the very best, with an emphasis on quality, customer service, and uniqueness.
          </p>
          <p>
            Founded in <strong>2025</strong> by <strong>Dhiya Sri</strong>, MND Ecommerce has come a long way from its beginnings. 
            When she first started out, her passion for eco-friendly products drove her to start her own business.
          </p>
          <p>
            We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions, please don't hesitate to contact us.
          </p>
          <p className="fw-bold">Sincerely,</p>
          <p className="fw-bold text-primary">MND Ecommerce Team</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
