import React, { useEffect, useState } from 'react'; // import hooks for react
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios'; // client tool for backend
import { Helmet } from 'react-helmet';
import { AiTwotoneStar } from 'react-icons/ai'; // react icon

const ProductDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true); // For isLoading
  const [isError, setIsError] = useState(false); //for isError
  const [singleProduct, setSingleProduct] = useState({}); // For productList

  useEffect(() => {
    axios //used to connect with backend .get is retrive the data from backend.ss
      .get(`http://localhost:8000/products/${id}`) // data is stored in db.json.
      .then((res) => {
        //console.log(res.data);
        setIsLoading(false);
        setIsError(false);
        setSingleProduct(res.data);
      })
      .catch((err) => {
        // catch is used to handle the errors.
        console.log(err);
        setIsLoading(false);
        setIsError(true);
        setSingleProduct([]);
      })
      .finally(() => {
        // finally is always executed at the end.
        console.log(' It is Over!');
      });
  }, []);

  // Showing that it loading
  if (isLoading) {
    return (
      <div className="text-center" data-testid="loader">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  // If error occurs, the below message will be soon to user.
  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        Sorry! Unable to fetch. Try again later.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        {/* Helmet is used title */}
        <title>Product Details</title>
      </Helmet>

      <div className="container my-5 py-3">
        <div className="row">
          {/* Product Image with alt text */}
          <div className="col-md-6 d-flex justify-content-center mx-auto">
            <img src={singleProduct.imgSrc} alt={singleProduct.title} height="420px" />
          </div>

          <div className="col-md-6 mt-4 ps-4">
            <h1>{singleProduct.title}</h1>
            <p>{singleProduct.description}</p>
            <p>
              {singleProduct.rating}
              {<AiTwotoneStar />}
              {singleProduct.review}
            </p>
            <span className="me-3 fs-5">Price : {singleProduct.sellingPrice}</span>
            <span className="me-2 text-secondary text-decoration-line-through">
              {singleProduct.maxretailPrice}
            </span>
            <span className="orange-text">{singleProduct.discount}</span>
            <hr />
            {/* feedback form button */}
            <span className="pe-5">Click on the button to submit feedback</span>
            <NavLink to={`/products/${id}/feedback`} className="card-body">
              <button className=" lg btn btn-outline-secondary my-5">
                <img
                  src="/assets/images/feedback.png"
                  width={100}
                  height={55}
                  alt="feedback-logo"
                />
                <p className="mt-2">Feedback</p>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
