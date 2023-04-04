import React, { useState } from 'react';
import { useFormik } from 'formik'; // imported useFormik from formik package for the form
import { Helmet } from 'react-helmet'; // Helmet is react-library.
import axios from 'axios';

const ContactUsContent = () => {
  const [isError, setIsError] = useState(false); //for error
  const [isSaved, setIsSaved] = useState(false);

  //useFormik for submitting the form data to the local backend
  //And also validating the fields in the form
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post('http://localhost:8000/getInTouchData', values)
        .then((res) => {
          console.log(res);
          setIsError(false);
          setIsSaved(true);
          resetForm({ values: '' }); // after the form reset the form data
        })
        .catch((err) => {
          //console.log(err);
          setIsError(true);
        });
    },

    validate: (values) => {
      // validation for the form.
      let errors = {};
      if (!values.name) {
        errors.name = '*Name Required';
      }
      if (!values.email) {
        errors.email = '*Email Required';
      }
      if (!values.phone) {
        errors.phone = '*Phone Required';
      }
      if (!values.message) {
        errors.message = '*Message Required';
      }
      return errors;
    }
  });

  //If error occur then we will display an alert with the below message
  if (isError) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        Some Error Occured! Please Try again later.
      </div>
    );
  }

  //Get In Touch form takes the users name,e-mail,phone number and the message the user wants to convey
  return (
    <>
      <Helmet>
        {/* Helmet is used for title of page */}
        <title>ContactUsContent</title>
      </Helmet>

      {/* form content */}
      <div className="main-content mx-3">
        <div className="contact-wrapper" id="get-in-touch-form">
          {/* Heading for the form */}
          <h3 className="p-3 mb-2 bg-secondary text-white text-center">Get In Touch Form </h3>
          {/* form starts */}
          <form autoComplete="off" onSubmit={formik.handleSubmit} className="form-container">
            {/* For Name Input */}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              className="form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name ? (
              <div className="errors text-danger fw-bold">{formik.errors.name}</div>
            ) : null}
            <br />
            {/* For Email Input */}
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter mail"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <div className="errors text-danger fw-bold">{formik.errors.email}</div>
            ) : null}
            <br />
            {/* for phone Input */}
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter phone number"
              className="form-control"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone ? (
              <div className="errors text-danger fw-bold">{formik.errors.phone}</div>
            ) : null}
            <br />
            {/* Message textarea input */}
            <label htmlFor="message">Message:</label>
            <textarea
              type="text"
              name="message"
              id="message"
              placeholder="Enter message"
              className="form-control"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
            {formik.errors.message ? (
              <div className="errors text-danger fw-bold">{formik.errors.message}</div>
            ) : null}
            <br />
            {/* Submit button*/}
            <button
              data-testid="submitBtn"
              className="btn btn-success text-uppercase fs-5"
              type="submit">
              Submit
            </button>
            {isSaved ? (
              <div data-testid="isSaved" className="alert alert-success">
                Form Submitted successfully.Please Visit Again.
              </div>
            ) : (
              ''
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUsContent;
