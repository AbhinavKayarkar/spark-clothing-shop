import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import './HomePage.scss';
// functional component using arrow function ( () => {return ();})
const HomePage = () => {
  return (
    <>
      {/* Title of this page (Home) */}
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/* Carousel for homepage */}
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* first item with image and test */}
          <div className="carousel-item active">
            <img
              src="/assets/images/homepage-images/bg-image.jpg"
              className="bd-placeholder-img "
              width="100%"
              height="100%"
              alt="bg-image"
            />
            {/* <div className="card-img-overlay d-flex flex-column justify-content-around">
              <div className="container-sm">
                <h5 className="card-title fs-1 mb-0">NEW SEASON ARRIVALS</h5>
                <p className="card-text fw-bolder fs-5 p-3">CHECK OUT ALL !!!</p>
              </div>
            </div> */}
            <div className="card-img-overlay d-flex flex-column justify-content-center">
              <div className="container-fluid">
                <h3 className="text-break text-black">NEW SEASON ARRIVALS</h3>
                <p className="card-text fw-bolder fs-5 p-3 text-white">CHECK OUT ALL !!!</p>
              </div>
            </div>
          </div>
          {/* second item with image and text */}
          <div className="carousel-item">
            <img
              src="/assets/images/homepage-images/black-friday-sale-img.jpg"
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              alt="black-friday-sale-img"
            />
            <div className="card-img-overlay d-flex flex-column justify-content-end mb-3">
              <div className="container">
                <span
                  className=" btn btn-danger spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"></span>
                <span className="card-text fw-bolder fs-5 p-3 text-white">
                  Live Now !!! Hurry Up
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        <NavLink to="/products" className="btn btn-dark">
          Shop Now
        </NavLink>
      </div>
    </>
  );
};

export default HomePage;
