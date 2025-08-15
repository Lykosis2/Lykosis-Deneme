// __tests__/Navbar.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For simulating user events
import Navbar from '../components/Navbar';
import { CartContextProvider } from '../components/Cart/CartContextProvider';
import { NavbarTextContext, NavbarTextContextProvider } from '../components/NavbarProvider';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

// Mock the context providers
jest.mock('../components/Cart/CartContextProvider.jsx', () => ({
  ...jest.requireActual('../components/Cart/CartContextProvider.jsx'), // Use the actual implementation for other functions
  CartContextProvider: jest.fn(({ children }) => children),
}));

jest.mock('../components/NavbarProvider.jsx', () => ({
  ...jest.requireActual('../components/NavbarProvider.jsx'),
  NavbarTextContextProvider: jest.fn(({ children }) => children),
}));

describe('Navbar component', () => {
  it('renders Navbar correctly', () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>
    );

    // Test if the logo is rendered
    const logoElement = screen.getByAltText('image');
    expect(logoElement).toBeInTheDocument();
  });

  it('handles input change correctly', async () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>
    );

    // Simulate input change
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'Test Input');

    // Test if the input value is updated
    expect(inputElement.value).toBe('Test Input');
  });

  it('navigates to home when clicked', async () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>
    );

    // Simulate click on the logo
    const logoElement = screen.getByAltText('image');
    fireEvent.click(logoElement);

    // Test if the router push function is called with the correct argument
    expect(mockRouter).toMatchObject({
      pathname: '/home',
    });
    });
  });

  it('renders Bulusmalar link and navigates to Bulusmalar page when clicked', async () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>,{wrapper:MemoryRouterProvider}
    );

    // Check if the Bulusmalar link is rendered
    const bulusmalarLink = screen.getByText('Buluşmalar');
    expect(bulusmalarLink).toBeInTheDocument();

    // Simulate click on the Bulusmalar link
    userEvent.click(bulusmalarLink);

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/bulusmaTakvim');
    });
  });

  it('renders Uyeler link and navigates to Uyeler page when clicked', async () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>,{wrapper:MemoryRouterProvider}
    );

    // Check if the Uyeler link is rendered
    const uyelerLink = screen.getByText('Üye Hesabı');
    expect(uyelerLink).toBeInTheDocument();

    // Simulate click on the Uyeler link
    userEvent.click(uyelerLink);

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/uye');
    });

  }
  );
  it("renders filter link and navigates to filter page when clicked", async () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>,{wrapper:MemoryRouterProvider}
    );

    // Check if the filter link is rendered
    const filterLink = screen.getByText('Ürünler');
    expect(filterLink).toBeInTheDocument();

    // Simulate click on the filter link
    userEvent.click(filterLink);

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/filter');
    });
  }
  );

  it("renders favoriler link and navigates to favoriler page when clicked", async () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>,{wrapper:MemoryRouterProvider}
    );

    // Check if the favoriler link is rendered
    const favorilerLink = screen.getByText('Favoriler');
    expect(favorilerLink).toBeInTheDocument();

    // Simulate click on the favoriler link
    userEvent.click(favorilerLink);

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/favoriler');
    });
  }
  );

  it("renders iletisim link and navigates to iletisim page when clicked", async () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>,{wrapper:MemoryRouterProvider}
    );

    // Check if the iletisim link is rendered
    const iletisimLink = screen.getByText('İletişim');
    expect(iletisimLink).toBeInTheDocument();

    // Simulate click on the iletisim link
    userEvent.click(iletisimLink);

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/iletisim');
    });
  }
  );
  it("renders sepetim link and navigates to sepetim page when clicked", async () => {
    render(
      <CartContextProvider>
        <NavbarTextContextProvider>
          <Navbar />
        </NavbarTextContextProvider>
      </CartContextProvider>,{wrapper:MemoryRouterProvider}
    );

    // Check if the sepetim link is rendered
    const sepetimLink = screen.getByTestId("cart-icon")
    expect(sepetimLink).toBeInTheDocument();

    // Simulate click on the sepetim link
    userEvent.click(sepetimLink);

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/cart');
    });
  }
  );
  // Add selects test 
  it('should handle Select component change', () => {   
    const customRender = (ui, {providerProps, ...renderOptions}) => {
      return render(
        <NavbarTextContext.Provider {...providerProps}>{ui}</NavbarTextContext.Provider>, 
      )
    }
    const providerProps = {
      value: {
        navbarText: 'SomeText',
        setNavbarText: jest.fn(),
        filter: 0,
        setFilter: jest.fn(),
        showProducts: false,
        setShowProducts: jest.fn(),
        sortby: 0,
        setSortby: jest.fn(),
      }
    }
    customRender(
      <Navbar/>,{providerProps}
    )   

    // Find the input element and change its value
    const inputFilter = screen.getByTestId("input-filter");
    expect(inputFilter).toHaveTextContent('SomeText');
  });