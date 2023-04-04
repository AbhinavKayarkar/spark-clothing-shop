import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

// function Component using Arrow function
const NavbarList = () => {
  // Array of objects is created to avoid code duplicate
  // ID is unique key for identification of objects.
  const NavbarItems = [
    {
      id: 1,
      to: '/',
      iconUrl: '/assets/icons/home.png',
      altText: 'Home-logo',
      title: 'HOME'
    },
    {
      id: 2,
      to: '/products',
      iconUrl: '/assets/icons/product-cart.png',
      altText: 'Products-logo',
      title: 'PRODUCTS'
    },
    {
      id: 3,
      to: '/about-us',
      iconUrl: '/assets/icons/about-us.png',
      altText: 'AboutUs-logo',
      title: 'ABOUT US'
    },
    {
      id: 4,
      to: '/contact-us',
      iconUrl: '/assets/icons/contact-us.png',
      altText: 'ConatctUs-logo',
      title: 'CONTACT'
    }
  ];

  // return statement of above arrow function
  return (
    <>
      {/* Unordered List is used for Navbar creation -- starts here*/}
      <ul className="navbar-nav ms-auto mb-2 mb-md-0" data-testid="NavbarList">
        {/* Map function is used instead of "For-Loop" */}
        {NavbarItems.map((NavbarItem) => {
          // return statement of map function
          return <Navbar {...NavbarItem} key={NavbarItem.id}></Navbar>;
        })}
      </ul>
      {/* ul ends here */}
    </>
  );
};

export default NavbarList;
