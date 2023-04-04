import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';
import { appRoutes } from './appRoutes';

import renderer from 'react-test-renderer';

// mocking the components
jest.mock('../../pages/HomePage/HomePage');
jest.mock('../../pages/ProductsPage/ProductsPage');

afterEach(cleanup);

// test suites
describe('appRoutes', () => {
  test('should the homepage component render properly', () => {
    // Arrange
    HomePage.mockImplementation(() => <div>HomePageMock</div>);

    // Act
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('HomePageMock')).toBeInTheDocument();
  });

  test('should the ProductsPage component render properly', () => {
    // Arrange
    ProductsPage.mockImplementation(() => <div>ProductsPage</div>);

    // Act
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('ProductsPage')).toBeInTheDocument();
  });

  // Lazy Loading
  // testing about page
  it('renders the AboutUs Page component correctly', async () => {
    render(<MemoryRouter initialEntries={['/about-us']}>{appRoutes}</MemoryRouter>);

    const aboutUs = await screen.findByText('The Tagline');
    expect(aboutUs).toBeInTheDocument();
  });

  // testing ContactUs page
  it('renders the ContactUs component correctly', async () => {
    render(<MemoryRouter initialEntries={['/contact-us']}>{appRoutes}</MemoryRouter>);

    const contactUsPage = await screen.findByText('Contact Us');
    expect(contactUsPage).toBeInTheDocument();
  });

  // testing ContactUsContent page
  it('renders the ContactUsContent component correctly', async () => {
    render(<MemoryRouter initialEntries={['/contact-us/content']}>{appRoutes}</MemoryRouter>);

    const contactUsContent = await screen.findByText('Get In Touch Form');
    expect(contactUsContent).toBeInTheDocument();
  });

  // testing snapshot to take whole approutes code as copy print.
  it('should render correctly', () => {
    const snapshotInJson = renderer.create(<appRoutes />).toJSON();
    expect(snapshotInJson).toMatchSnapshot();
  });
});
