import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AboutUs from './AboutUs';

// test suite
describe('AboutUsPage', () => {
  // test to check the text 'The Tagline present or not'
  it('has a tagline element with proper class', () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    const h5Element = screen.getByText('The Tagline');
    expect(h5Element).toBeInTheDocument();
    expect(h5Element).toHaveClass('fw-bold');
  });

  // test to check link is present
  it('has a link to know our history', () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

    const link = screen.findByText(/Our History/i);
    expect(link).toBeTruthy();
  });
});
