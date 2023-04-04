import { render, screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import ContactUsPage from './ContactUsPage';

// mocking
jest.mock('axios');

describe('ContactUsPage', () => {
  //test spec
  it('Loader functionality testing', () => {
    // 1. prepare the mock data
    axios.get.mockResolvedValue({
      data: {
        address: '',
        phone: '',
        email: ''
      }
    });

    // testing the loader.
    const { getByRole } = render(<ContactUsPage />);

    const loader = getByRole('status');
    expect(loader).toBeInTheDocument();
  });

  // POSITIVE TEST SPEC
  it('[MOCKING]: fetches contactData properly via API call', async () => {
    // 1. prepare the mock data
    axios.get.mockResolvedValue({ data: 'mock data' });
    // 2. render the comp
    // render(<ContactUsPage/>);
    // 3. then, assert
    //expect(await screen.findByText('Nagpur')).toBeInTheDocument();
    //expect(await screen.findByText('9876543210')).toBeInTheDocument();
    //expect(await screen.findByText('9876543211')).toBeInTheDocument();
    //expect(await screen.findByText('abc@gmail.com')).toBeInTheDocument();
    const { container } = render(<ContactUsPage />);
    await wait(() => expect(container.textContent).toContain('mock data'));
  });

  // NEGATIVE SPEC
  it('[MOCKING]: renders error properly during API Call ', async () => {
    // preparing mock error obj
    const error = 'Error occured';

    axios.get.mockRejectedValue(error);
    render(<ContactUsPage />);
    expect(
      await screen.findByText(/Sorry! Unable to fetch users! Try again later./i)
    ).toBeInTheDocument();
  });
});
