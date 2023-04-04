import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'; // validating props

const TabProducts = () => {
  // Array of Objects to avoid code duplication
  const productsCategory = [
    {
      id: 1,
      path: '/products?category=men',
      title: 'Mens Clothing'
    },
    {
      id: 2,
      path: '/products?category=women',
      title: 'Womens Clothing'
    },
    {
      id: 3,
      path: '/products?category=kid',
      title: 'Kids Clothing'
    }
  ];

  return (
    <div data-testid="category">
      <div>
        {productsCategory.map(({ id, path, title }) => (
          <NavLink to={path} className="nav-link" aria-current="page" key={id}>
            <button className="btn btn-warning w-100 mb-4">{title}</button>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

// props validation
TabProducts.propTypes = {
  id: PropTypes.number,
  path: PropTypes.string,
  title: PropTypes.string
};

export default TabProducts;
