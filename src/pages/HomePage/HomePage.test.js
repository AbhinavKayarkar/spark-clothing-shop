import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import HomePage from './HomePage';

// test suites
describe('HomePage', () => {
  // test spec
  it('has carousel image and related text', () => {
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );

    expect(screen.getByAltText(/bg-image/i)).toBeTruthy;
    expect(screen.getByAltText(/black-friday-sale-img/i)).toBeTruthy;
    expect(screen.getByText('NEW SEASON ARRIVALS')).toBeInTheDocument();
    expect(screen.getByText('CHECK OUT ALL !!!')).toBeInTheDocument();
    expect(screen.getByText('Live Now !!! Hurry Up')).toBeInTheDocument();
  });
});
