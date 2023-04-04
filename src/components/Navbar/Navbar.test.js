import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navbar } from 'react-bootstrap';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
  // testing receiving correct props or not
  it('receives correct props', () => {
    const props = {
      id: 1,
      to: '/',
      iconUrl: '/assets/icons/home.png',
      altText: 'Home-logo',
      title: 'HOME'
    };
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <MemoryRouter>
        <Navbar {...props}/>
      </MemoryRouter>
    );

    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });
});
