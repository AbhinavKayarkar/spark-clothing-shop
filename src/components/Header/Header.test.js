import { findByText, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  // test spec
  it('has shopping app logo and name present', () =>{
    render(
      <MemoryRouter>
        <Header/>
      </MemoryRouter>
    );

    expect(screen.getByText('Spark Clothing')).toBeInTheDocument();

    const img = screen.findByAltText(/Logo images/i);
    expect(img).toBeTruthy();
  });
});