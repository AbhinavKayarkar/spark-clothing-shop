import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'; // install using -- npm i react-router-dom 

// function component using Arrow function
const Navbar = (props) => {

  // props are used for receiving data parent comp
  // return statement of above arrow function
  return (
    <>
      <li className='nav-item'>
        <NavLink to={props.to} className="nav-link">
          <img src={props.iconUrl} className="bi d-block mx-auto mb-1" width={24} height={24} alt={props.altText}></img>
          {props.title}
        </NavLink>
      </li>
    </>
  );
};

// Validating PropTypes for Navbar components
Navbar.propTypes = {
  id: PropTypes.number,
  to: PropTypes.string,
  iconUrl: PropTypes.string,
  altText: PropTypes.string,
  title: PropTypes.string
};

export default Navbar;