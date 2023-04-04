import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';

// test suite
describe('pageNotFound', () => {
  //test spec
  test('should PageNotFound have go to home link and Error warning in text', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );

    const headElementErr = screen.getByText(/404 Error/i);
    expect(headElementErr).toBeInTheDocument();

    const headElement = screen.getByText(/Page Not Found/i);
    expect(headElement).toBeInTheDocument();

    const linkEleForGoHome = screen.findByText(/Go to Home/i);
    expect(linkEleForGoHome).toBeTruthy();
  });
});
