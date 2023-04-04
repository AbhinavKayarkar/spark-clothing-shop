import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarList from '../../containers/NavbarList/NavbarList';

// Header Component
const Header = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              {/* Logo of shoping app */}
              <img src="/assets/images/logo.jpg" width={100} height={55} alt="Logo images" />
              {/* name of shoping app */}
              <span className="ms-1">Spark Clothing</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            {/* NavbarList */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <NavbarList />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
