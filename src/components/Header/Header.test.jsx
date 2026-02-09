import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Header from './Header';

describe('Header component', () => {
    it('renders all navigation links with correct destinations', () => {
        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <Header /> }])} />
        );
        
        const homeLink = screen.getByRole('link', { name: /brigid's general store/i });
        const shopLink = screen.getByRole('link', { name: /shop/i });
        const cartLink = screen.getByRole('link', { name: /my cart/i });

        expect(homeLink.getAttribute('href')).toBe('/');
        expect(shopLink.getAttribute('href')).toBe('/shop');
        expect(cartLink.getAttribute('href')).toBe('/mycart');
    });

    it('displays the correct number of total items in the cart link when there are items', () => {
        const cartCount = 5;

        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <Header itemsInCart={cartCount}/> }])} />
        );

        expect(screen.getByText('My Cart (5)')).toBeInTheDocument();
    });

    it('displays just the my cart text when the cart is empty', () => {
        const cartCount = 0;

        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <Header itemsInCart={cartCount}/> }])} />
        );

        expect(screen.getByText('My Cart')).toBeInTheDocument();
    });
});
