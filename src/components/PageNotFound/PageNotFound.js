import React from 'react';
import { Link } from 'react-router-dom';

// Page not found component
const PageNotFound = () => {
  return (
    <>
      <div className="text-center">
        <h2 data-testid="hTwoElement">404 Error</h2>
        <h4>Page Not Found</h4>
        {/* Link to go home page */}
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
