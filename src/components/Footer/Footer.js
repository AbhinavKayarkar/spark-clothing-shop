import React from 'react';
import { Link } from 'react-router-dom';

// Footer Componet
const Footer = () => {
  return (
    <div>
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            {/* Link for Home Page */}
            <li className="nav-item">
              <Link to="/" className="nav-link px-2 text-muted">
                Home
              </Link>
            </li>
            {/* Link for Products Page */}
            <li className="nav-item">
              <Link to="/products" className="nav-link px-2 text-muted">
                Products
              </Link>
            </li>
            {/* Link for About us Page */}
            <li className="nav-item">
              <Link to="/about-us" className="nav-link px-2 text-muted">
                About Us
              </Link>
            </li>
            {/* Link for Contact us page */}
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link px-2 text-muted">
                Contact Us
              </Link>
            </li>
          </ul>
          <p className="text-center text-muted">© 2023 Company, Inc</p>
          {/* developer name */}
          <p className="text-center text-muted">Developer : Abhinav Kayarkar</p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
