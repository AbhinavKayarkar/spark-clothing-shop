import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Feedback from './Feedback';

// mock axios to avoid making real API calls during the test
jest.mock('axios');

describe('FeedbackForm', () => {
  // testing the form
  it('renders all form fields', () => {
    render(
      <Formik
        initialValues={{ name: '', email: '', phone: '', feedback: '', productRating: '' }}
        onSubmit={() => {}}>
        {(formik) => (
          <Form>
            <Feedback formik={formik} />
          </Form>
        )}
      </Formik>
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('FeedBack')).toBeInTheDocument();
    expect(screen.getByTestId('submitBtn')).toBeInTheDocument();
  });

  // testing formik validation
  it('validates all form fields and displays error messages', async () => {
    render(
      <Formik initialValues={{ name: '', email: '', phone: '', feedback: '' }} onSubmit={() => {}}>
        {(formik) => (
          <Form>
            <Feedback formik={formik} />
          </Form>
        )}
      </Formik>
    );

    fireEvent.click(screen.getByTestId('submitBtn'));

    expect(await screen.findByText('*Name Required')).toBeInTheDocument();
    expect(await screen.findByText('*Email Required')).toBeInTheDocument();
    expect(await screen.findByText('*Phone Required')).toBeInTheDocument();
    expect(await screen.findByText('*Feedback Required')).toBeInTheDocument();
  });

  // testing rating
  it('renders rating stars and updates rating value', () => {
    const { getAllByRole } = render(<Feedback />);
    const ratingStars = getAllByRole('radio');
    fireEvent.click(ratingStars[4]);
    expect(ratingStars[4].checked).toBe(true);
  });

  //   // to render the feedback form
  it('should render the Feedback page', async () => {
    // mock data to be returned by axios
    const data = {
      title: 'Nayo',
      category: 'womwn',
      description: 'Women Kurta',
      imgSrc: 'http://localhost:8000/products/5',
      sellingPrice: 'Rs. 1368',
      rating: 4,
      reviews: [
        {
          id: 1,
          name: 'abhinav',
          email: 'abhi@gmail.com',
          phone: '8237913398',
          feedback: 'Great Product. Many colors are available. Easy delivery and COD available'
        }
      ]
    };

    // mock the GET request to return the above data
    axios.get.mockResolvedValue({ data });
    const { getByTestId } = render(<Feedback />);

    // wait for the data to be loaded
    await act(async () => {});
    expect(getByTestId('name')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('phone')).toBeInTheDocument();
    expect(getByTestId('feedback')).toBeInTheDocument();
  });

  //   // to check whether feedback form is submitting to the backend or not
  it('should submit the feedback form and update the review list', async () => {
    // mock data to be returned by axios
    const data = {
      title: 'Nayo',
      category: 'womwn',
      description: 'Women Kurta',
      imgSrc: 'http://localhost:8000/products/5',
      sellingPrice: 'Rs. 1368',
      rating: 4,
      reviews: [
        {
          id: 1,
          name: 'abhinav',
          email: 'abhi@gmail.com',
          phone: '8237913398',
          feedback: 'Great Product. Many colors are available. Easy delivery and COD available.'
        }
      ]
    };

    // mock the GET request to return the above data
    axios.get.mockResolvedValue({ data });

    const { getByLabelText, getByTestId } = render(<Feedback />);
    // wait for the data to be loaded
    await act(async () => {});

    // fill the feedback form
    fireEvent.change(getByLabelText('Name'), { target: { value: 'abhinav' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'abhi@gmail.com' } });
    fireEvent.change(getByLabelText('Phone'), { target: { value: 8237913398 } });
    fireEvent.change(getByLabelText('FeedBack'), {
      target: {
        value: 'Great Product. Many colors are available. Easy delivery and COD available.'
      }
    });
    // mock the PUT request to update the review list
    axios.put.mockResolvedValue({});

    // submit the feedback form
    fireEvent.submit(getByTestId('submitBtn'));

    // wait for the review list to be updated
    await act(async () => {});
    expect(getByTestId('submitBtn')).toBeInTheDocument();
  });
});
