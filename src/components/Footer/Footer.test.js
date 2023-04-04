import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
// test suit
describe('Footer', () => {
  // test spec
  test('Should footer have all menulist with associated link and other text in footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.findByText(/Home/i)).toBeTruthy();
    expect(screen.findByText(/Products/i)).toBeTruthy();
    expect(screen.findByText(/About Us/i)).toBeTruthy();
    expect(screen.findByText(/Contact Us/i)).toBeTruthy();
    expect(screen.getByText('© 2023 Company, Inc')).toBeInTheDocument();
    expect(
      screen.getByText('Developer : Abhinav Kayarkar')
    ).toBeInTheDocument();
  });
});
