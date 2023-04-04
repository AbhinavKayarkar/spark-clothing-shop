import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import NavbarList from './NavbarList';

// checking the Menu component is rendering or not.
describe('NavbarList', () => {
  // check 4 Navlinks are present or not.
  it('has NavbarList component should render 4 NavLinks', () => {
    render(
      <MemoryRouter>
        <NavbarList />
      </MemoryRouter>
    );
    const NavbarListEl = screen.getByTestId('NavbarList');
    const links = NavbarListEl.querySelectorAll('li');
    expect(links.length).toBe(4);
  });
});
