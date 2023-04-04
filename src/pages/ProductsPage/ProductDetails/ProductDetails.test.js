import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import { MemoryRouter } from 'react-router-dom';

// mocking is a technique to isolate test subjects by replacing dependencies with objects that you can control and inspect.
jest.mock('axios');

// testing the product details
describe('ProductDetails component', () => {
  test('renders loading state', async () => {
    axios.get.mockResolvedValue({
      data: {
        imgSrc: '',
        title: '',
        description: '',
        sellingPrice: ''
      }
    });

    // testing the loader.
    const { getByTestId } = render(<ProductDetails />);

    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  // testing the error
  test('renders error state', async () => {
    axios.get.mockRejectedValue(new Error('Unable to fetch data'));

    const { getByText } = render(<ProductDetails />);

    await waitFor(() => {
      const errorMessage = getByText('Sorry! Unable to fetch. Try again later.');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
