import React, { useState } from 'react'; // useState is used to stote the data.
import { Helmet } from 'react-helmet'; // Helmet is used to give the Title to the page
import styled from 'styled-components'; // apply styling to the components.
import { useFormik } from 'formik'; // simply making the form with less fns.
import { FaStar } from 'react-icons/fa'; // react-icons for rating.
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form = styled.form`
  border: 1px solid grey;
  margin: 5px;
  padding: 20px;
  border-radius: 10px;
`;

const Feedback = () => {
  const [isLoading, setIsLoading] = useState(false); // for handle loader
  const [isError, setIsError] = useState(false); // for handle error
  const [isSaved, setIsSaved] = useState(false); // for handle confirmation message
  const [isSubmiited, setIsSubmitted] = useState(false); // check whether data submiited or not

  const [rating, setRating] = useState(''); // for handle rating
  const [hover, setHover] = useState(''); // for handle rating hover effect

  const param = useParams(); // Allows you to access the parameters of the current URL.(used for dynamically render content based on the URL parameters)
  const { id } = param; // render URL based on ID

  //useFormik for submitting the form data to the local backend
  //And also validating the fields in the form
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      feedback: '',
      productRating: ''
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .get(`http://localhost:8000/products/${id}`) // get product details based on id
        .then((res) => {
          setIsLoading(false);
          setIsSaved(false);
          const data = res.data; // store the result into a data variable

          const reviews = data.reviews; // email validation
          const emailCheck = reviews.filter((review) => review.email == values.email);
          //console.log(emailCheck, 'Email');
          if (emailCheck.length == 0) {
            values.id = reviews.length + 1; // set id for easy review identification
            data.reviews.push(values); // push is a array method to add the data into an array.

            axios.put(`http://localhost:8000/products/${id}`, data).then((res) => {
              // PUT is a method of modifying resources where the client sends data that updates the entire resource.
              setIsSaved(true);
              setIsError(false);
              setRating('');
              //console.log(res);
            });
            setTimeout(() => {
              // The setTimeout() method calls a function after a number of milliseconds.
              setIsSaved(false);
              //setIsLoading(false);
              resetForm({ values: '' }); // after the form reset the form data
            }, 5000).catch((err) => {
              // Handling the error
              setIsError(true);
              //console.log(err);
            });
          } else {
            setIsSubmitted(true); // if email is already present in an array. This else exception will be excuted.
          }
        })
        .catch((err) => {
          // Handling the error
          setIsError(true);
          //console.log(err);
        });
    },

    validate: (values) => {
      // validation input fields in form
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
      if (!values.feedback) {
        errors.feedback = '*Feedback Required';
      } else if (values.feedback.trim().length < 50) {
        errors.feedback = 'Atleast 50 word required';
      }
      return errors;
    }
  });

  if (isLoading) {
    // if isLoading is true then this code snippet is  excuted.
    return (
      <div className="text-center">
        {/* spinner with center - bootstrap*/}
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );
  }

  if (isError) {
    //If error occur then we will display an alert with the below message
    return (
      <div className="alert alert-danger mt-5" data-testid="error" role="alert">
        Some Error Occured! Please Try again later.
      </div>
    );
  }

  return (
    <>
      {/* Helmet is used for title */}
      <Helmet>
        <title>Products-FeedBack</title>
      </Helmet>

      {/* Form styled Component starts here */}
      <Form autoComplete="off" onSubmit={formik.handleSubmit} className="m-5 p-3">
        {/* form heading -- Feedback form */}
        <h3 className="p-3 mb-2 bg-secondary text-white text-center">Feedback Form </h3>
        {/* form input feild */}
        <div className="row">
          {/* for Input feild name */}
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
              id="name"
              placeholder="Please Enter Your Name"
              data-testid="name"
            />
            {formik.errors.name ? (
              <div className="errors text-danger fw-bold">{formik.errors.name}</div>
            ) : null}
          </div>
          {/* for Input feild email */}
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
              placeholder="Please Enter Your Email"
              data-testid="email"
            />
            {formik.errors.email ? (
              <div className="errors text-danger fw-bold">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        {/* for Input feild phone */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="phone"
            className="form-control"
            value={formik.values.phone}
            onChange={formik.handleChange}
            id="phone"
            placeholder="Please Enter Your PhoneNumber"
            data-testid="phone"
          />
          {formik.errors.phone ? (
            <div className="errors text-danger fw-bold">{formik.errors.phone}</div>
          ) : null}
        </div>
        {/* for Input feild feedback */}
        <div className="mb-3">
          <label htmlFor="feedback">FeedBack</label>
          <textarea
            type="text"
            className="form-control"
            value={formik.values.feedback}
            onChange={formik.handleChange}
            placeholder="Please Enter Your Feedback"
            id="feedback"
            minLength={150}
            data-testid="feedback"
          />
          {formik.errors.feedback ? (
            <div className="errors text-danger fw-bold">{formik.errors.feedback}</div>
          ) : null}

          {/* Rating input from user */}
          <div className="card text-center mt-3" style={{ width: '20rem' }}>
            <h2 className="bg-secondary text-white">Rating</h2>
            <div className="card-body">
              <div className="text-center">
                <h3>Rating:{rating}</h3>
                {[...Array(5)].map((star, i) => {
                  // 5 star rating use array index(spread operator{5 undefined values})
                  const ratingValue = i + 1;
                  console.log(rating);
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="productRating"
                        onClick={() => setRating(ratingValue)} // onClick fn
                        id="rating"
                        onChange={formik.handleChange}
                        value={(formik.values.productRating = rating)}
                      />
                      <FaStar
                        className="star"
                        color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                        //This sets the color of the star icon based on the current rating value and the hover state.If the rating value is less than or equal to the current hover state or rating, the color is set to "#ffc107" (a shade of yellow), otherwise it is set to "#e4e5e9" (a light gray).
                        size={20}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
              {/* Submit submit */}
              <div>
                <button
                  className="btn btn-success fw-bold my-3"
                  type="submit"
                  data-testid="submitBtn">
                  Submit
                </button>

                {/* <div data-testid="isSaved" > */}
                {isSaved ? ( // confirmatiom message
                  <div data-testid="isSaved" className="alert alert-success">
                    FeedBack Submitted Successfully.Thank You.
                  </div>
                ) : (
                  ''
                )}
                {/* if the review is already submitted */}
                {isSubmiited ? (
                  <div className="alert alert-danger">Review Already Submitted.</div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Feedback;
