import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Test', () => {
  it('has proper App Component', () => {
    render(<App />);
    expect(App).toBeTruthy();
  });
});
