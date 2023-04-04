import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import ContactUsContent from './ContactUsContent';

jest.mock('axios');

// testing the form withs with text.
describe('ContactUsContent', () => {
  // test spec
  it('submits the form with valid input', async () => {
    axios.post.mockResolvedValue({ data: { message: 'success' } });
    const { getByLabelText, getByText } = render(<ContactUsContent />);
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'anurag' } });
    fireEvent.change(getByLabelText('E-mail:'), { target: { value: 'anurag@gmail.com' } });
    fireEvent.change(getByLabelText('Phone:'), { target: { value: 2727272727 } });
    fireEvent.change(getByLabelText('Message:'), {
      target: { value: 'Great App' }
    });
    fireEvent.click(getByText('Submit'));

    await waitFor(() =>
      expect(
        screen.getByText(/Form Submitted successfully.Please Visit Again/i)
      ).toBeInTheDocument()
    );

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/getInTouchData', {
      name: 'anurag',
      email: 'anurag@gmail.com',
      phone: 2727272727,
      message: 'Great App'
    });
  });

  it('validates all form fields and displays error messages', async () => {
    render(
      <Formik initialValues={{ name: '', email: '', phone: '', message: '' }} onSubmit={() => {}}>
        {(formik) => (
          <Form>
            <ContactUsContent formik={formik} />
          </Form>
        )}
      </Formik>
    );

    fireEvent.click(screen.getByTestId('submitBtn'));

    expect(await screen.findByText('*Name Required')).toBeInTheDocument();
    expect(await screen.findByText('*Email Required')).toBeInTheDocument();
    expect(await screen.findByText('*Phone Required')).toBeInTheDocument();
    expect(await screen.findByText('*Message Required')).toBeInTheDocument();
  });
});
