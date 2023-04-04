import { render, screen } from '@testing-library/react';
import AboutUsContent from './AboutUsContent';

// test suite
describe('AboutUsContent', () => {
  // Check whether the history element has proper class or not -- test-case #2
  it('has a history element with proper class', () => {
    render(<AboutUsContent />);
    const h5Element = screen.getByText('The History');
    expect(h5Element).toBeInTheDocument();
    expect(h5Element).toHaveClass('fw-bold');
  });
});
