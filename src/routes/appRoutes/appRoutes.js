import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// component imports
import HomePage from '../../pages/HomePage/HomePage';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';
import ProductDetails from '../../pages/ProductsPage/ProductDetails/ProductDetails';
import Feedback from '../../pages/ProductsPage/Feedback/Feedback';
import AboutUsContent from '../../pages/AboutUsPage/AboutUsContent/AboutUsContent';

// Lazy Loading
const AboutUs = React.lazy(() => import('../../pages/AboutUsPage/AboutUs'));
const ContactUsPage = React.lazy(() => import('../../pages/ContactUsPage/ContactUsPage'));
const ContactUsContent = React.lazy(() =>
  import('../../pages/ContactUsPage/ContactUsContent/ContactUsContent')
);

export const appRoutes = (
  <Suspense fallback={<div className="spinner-border text-warning"></div>}>
    <Routes>
      <Route path="*" element={<PageNotFound />}></Route>
      <Route path="/" exact element={<HomePage />}></Route>
      <Route path="/products" element={<ProductsPage />}></Route>
      <Route path="products/:id" element={<ProductDetails />}></Route>
      <Route path="products/:id/feedback" element={<Feedback />}></Route>
      <Route path="/about-us/" element={<AboutUs />}>
        <Route path="content" element={<AboutUsContent />}></Route>
      </Route>
      <Route path="/contact-us" element={<ContactUsPage />}></Route>
      <Route path="/contact-us/content" element={<ContactUsContent />}></Route>
    </Routes>
  </Suspense>
);
