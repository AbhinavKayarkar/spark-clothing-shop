import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, Outlet } from 'react-router-dom';

const AboutUs = () => {
  return (
    <>
      {/* Helmet is used to give title to page */}
      <Helmet>
        <title>About Us</title>
      </Helmet>

      <div className="container-fluid mx-auto">
        <div className="row mt-5 mx-1">
          {/* rendering the about us image */}
          <div className="col-md-3 mt-3 ">
            <img src="/assets/images/about-us.png" className="img-fluid" alt="about-us-logo" />
          </div>

          {/* showing the tagline of online shoping app */}
          <div className="col-md-8">
            <div>
              <h5 className="fw-bold fs-3 text-center mt-4">The Tagline</h5>
              <div className="fs-5 text-center">
                "We have the capabilities and experience to deliver the products you need to move
                forward."
              </div>
            </div>
          </div>

          {/* showing the history to user after click on link */}
          <div className="text-center mt-5">
            <h5>Click on below to know our history</h5>
            {/* Nested routing  */}
            <Link to="content/">
              <span className="btn btn-primary mt-3 mb-3">Our History</span>
            </Link>

            {/* for the history material */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
