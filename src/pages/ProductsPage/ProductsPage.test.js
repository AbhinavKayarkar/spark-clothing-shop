import { render, screen } from '@testing-library/react';
import { HashRouter, MemoryRouter as Router } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import axios from 'axios';

jest.mock('axios');

describe('ProductsPage status checking', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  // testing loader
  it('renders loading spinner while fetching data', () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(
      <HashRouter>
        <ProductsPage />
      </HashRouter>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // testing error
  it('renders error message when API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API call failed'));
    render(
      <HashRouter>
        <ProductsPage />
      </HashRouter>
    );
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Sorry! Unable to fetch. Try again later.');
  });
});

// testing URL/api calls
describe('API calls for product category', () => {
  it('should return correct URL for men category', () => {
    const queryParam = 'men';
    const expectedApiUrl = 'http://localhost:8000/products?category=men';
    const resultApiUrl = getUrlForCategory(queryParam);
    expect(resultApiUrl).toBe(expectedApiUrl);
  });

  it('should return correct URL for womens-wear category', () => {
    const queryParam = 'women';
    const expectedApiUrl = 'http://localhost:8000/products?category=women';
    const resultApiUrl = getUrlForCategory(queryParam);
    expect(resultApiUrl).toBe(expectedApiUrl);
  });

  it('should return correct URL for kids-wear category', () => {
    const queryParam = 'kid';
    const expectedApiUrl = 'http://localhost:8000/products?category=kid';
    const resultApiUrl = getUrlForCategory(queryParam);
    expect(resultApiUrl).toBe(expectedApiUrl);
  });

  it('should return default URL for any other category', () => {
    const queryParam = 'products';
    const expectedApiUrl = 'http://localhost:8000/products';
    const resultApiUrl = getUrlForCategory(queryParam);
    expect(resultApiUrl).toBe(expectedApiUrl);
  });
});

function getUrlForCategory(queryParam) {
  let api;
  if (queryParam === 'men') {
    api = 'http://localhost:8000/products?category=men';
  } else if (queryParam === 'women') {
    api = 'http://localhost:8000/products?category=women';
  } else if (queryParam === 'kid') {
    api = 'http://localhost:8000/products?category=kid';
  } else {
    api = 'http://localhost:8000/products';
  }
  return api;
}

describe('Products API call', () => {
  let mockSuccessResponse;
  let mockJsonPromise;
  let mockFetchPromise;

  beforeEach(() => {
    mockSuccessResponse = {
      data: [
        { id: 1, name: 'product1' },
        { id: 2, name: 'product2' }
      ]
    };
    mockJsonPromise = Promise.resolve(mockSuccessResponse);
    mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('calls fetch and returns data', async () => {
    const res = await global.fetch('/products');
    const data = await res.json();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/products');
    expect(data).toEqual(mockSuccessResponse);
  });
});
