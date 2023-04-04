import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ContactUsPage = () => {
  const [isLoading, setIsLoading] = useState(true); // For isLoading
  const [isError, setIsError] = useState(false); //for isError
  const [contactData, setContactData] = useState([]); // For productList

  // Hook -- useEffect hook used for api calls and re-rendering.
  useEffect(() => {
    // after initial rendering this will be called.
    // ideal hook for us to send req to REST API ( http://localhost:8000/contactData)
    axios
      .get(' http://localhost:8000/contactData')
      .then((res) => {
        //  capturing the converted JSON res
        console.log(res);
        setIsLoading(false);
        setIsError(false);
        setContactData(res.data);
      })
      .catch((err) => {
        // Error will be caught here if any occurred
        //console.log(err);
        setIsLoading(false);
        setIsError(true);
        setContactData([]);
      });
  }, []);

  // Showing that it loading
  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  // If error occurs, the below message will be soon to user.
  if (isError) {
    return <div className="alert alert-danger">Sorry! Unable to fetch users! Try again later.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <h2 className="text-center">Contact Us</h2>
      <img
        src="./assets/images/contact.png"
        className="rounded mx-auto d-block"
        width={250}
        alt="contactUs"
      />
      {contactData?.map((data) => {
        return (
          <div className="d-flex justify-content-center mt-5" key={data.id}>
            <span className="p-2 border border-dark">
              <p className="fw-bold" data-testid="address">
                Address:
              </p>
              {data.address}
            </span>
            <span className="p-2 border border-dark">
              <p className="fw-bold">Phone:</p>
              <p data-testid="phoneIndexZero">{data.phone[0]}</p>
              <p data-testid="phoneIndexOne">{data.phone[1]}</p>
            </span>
            <span className="p-2 border border-dark text-break">
              <p className="fw-bold">Email: </p>
              {data.email}
            </span>
          </div>
        );
      })}

      {/* Get In Touch Content */}
      <div className="get-in-touch" data-testid="viewContact">
        <div className="contact-wrapper mt-5">
          <NavLink to="/contact-us/content" className="nav-link" aria-current="page">
            <h1 className="text-center">Get In Touch</h1>
            <div className="text-center">
              <img
                src="./assets/images/getintouch.png"
                className="rounded mx-auto d-block"
                width={250}
                alt="getintouchlogo"></img>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
