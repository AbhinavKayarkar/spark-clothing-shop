import React, { useEffect, useState } from 'react'; // Hooks for handling the fn's
import { NavLink, Link, useLocation, Outlet } from 'react-router-dom'; // navigation or routing
import { Helmet } from 'react-helmet'; // providing title for pages
import axios from 'axios'; // client tool for backend
import TabProducts from './TabProducts/TabProducts';
import { AiTwotoneStar } from 'react-icons/ai'; // icons for designing
import './ProductsPage.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true); // store data belongs to loading status
  const [isError, setIsError] = useState(false); // store data belongs to error status
  const [productList, setProductList] = useState([]); // store data belongs to productList status
  let api = null;
  let query = useQuery();
  let queryParam = query.get('category');

  if (queryParam === 'men') {
    api = 'http://localhost:8000/products?category=men';
  } else if (queryParam === 'women') {
    api = 'http://localhost:8000/products?category=women';
  } else if (queryParam === 'kid') {
    api = 'http://localhost:8000/products?category=kid';
  } else {
    api = 'http://localhost:8000/products';
  }

  useEffect(() => {
    axios //used to connect with backend .get is retrive the data from backend.
      .get(api) // data is stored in db.json
      .then((res) => {
        //console.log(res.data);
        setIsLoading(false);
        setIsError(false);
        setProductList(res.data);
      })
      .catch((err) => {
        // catch is used to handle the errors.
        //console.log(err);
        setIsLoading(false);
        setIsError(true);
        setProductList([]);
      })
      .finally(() => {
        // finally is always executed at the end.
        //console.log(' It is Over!');
      });
  }, [api]);

  // spinner
  if (isLoading) {
    // if isLoading is true then this code snippet is excuted and loading sign.
    return (
      <div className="text-center">
        {/* spinner with center - bootstrap*/}
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );
  }

  // Error Message
  if (isError) {
    // if any Error is Occur then this block is executed.
    return (
      <div className="alert alert-danger" role="alert">
        Sorry! Unable to fetch. Try again later.
      </div>
    );
  }

  // If error & loading is false, then this return block will be render on app
  return (
    <>
      {/* Title of this page (Products) */}
      <Helmet>
        <title>Products</title>
      </Helmet>

      {/* Heading Text */}
      <h1 className="text-center text-info">Our Collection</h1>

      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          {/* Categorywise Displaying Product */}
          <div className="col-md-3">
            <TabProducts />
          </div>

          {/* All Products Display */}
          <div className="col-md-9">
            <div className="row">
              {productList?.map((product) => {
                return (
                  <div className="col-md-4" key={product.id}>
                    <div className="card">
                      <img
                        src={product.imgSrc}
                        className="card-img-top"
                        width={280}
                        height={450}
                        alt={product.title}
                      />
                      <p className="product-Label">{product.label}</p>
                      <div className="product-review">
                        <p className="rating">
                          {product.rating}
                          {<AiTwotoneStar />}
                          {product.review}
                        </p>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link to={`/products/${product.id}`} className="product-details">
                            {product.title}
                          </Link>
                        </h5>
                        <p className="card-text text-secondary">{product.description}</p>
                        <span className="me-3 fs-5">{product.sellingPrice}</span>
                        <span className="me-2 text-secondary text-decoration-line-through">
                          {product.maxretailPrice}
                        </span>
                        <span className="orange-text">{product.discount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
