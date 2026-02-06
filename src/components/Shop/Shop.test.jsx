import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Shop from './Shop';

const { mockedSetCartItems } = vi.hoisted(() => ({
    mockedSetCartItems: vi.fn(),
}));

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
        return {
            ...actual,
            useOutletContext: () => [[] /* initial cartItems */, mockedSetCartItems],
    };
});

describe('Shop component', () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
        global.fetch = mockFetch;
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([
            { id: 1, title: 'Product 1', price: 10.99, quantity: 1, image: 'image1.jpg' },
            { id: 2, title: 'Product 2', price: 9.99, quantity: 1, image: 'image2.jpg' },
            ]),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading message initially', async () => {
        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <Shop /> }])} />
        );
        expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    it('renders products after loading', async () => {
        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <Shop /> }])} />
        );
        await screen.findByText('Product 1');
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    it('adds product to cart', async () => {
        const user = userEvent.setup();
        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <Shop /> }])} />
        );
        await screen.findByText('Product 1');
        const addToCartButton = screen.getAllByRole('button', { name: 'Add to Cart' })[0];
        await user.click(addToCartButton);
        expect(mockedSetCartItems).toHaveBeenCalledTimes(1);
        expect(mockedSetCartItems).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ id: 1, title: 'Product 1', price: 10.99, quantity: 1, image: 'image1.jpg' }),
        ]));
    });

    it('handles fetch error', async () => {
        mockFetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({}),
        }));
        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <Shop /> }])} />
        );
        await screen.findByText('Error: Network response was not ok');
        expect(screen.getByText('Error: Network response was not ok')).toBeInTheDocument();
    });

    it('adds multiple products to cart', async () => {
        const user = userEvent.setup();
        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <Shop /> }])} />
        );
        await screen.findByText('Product 1');
        const addToCartButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
        await user.click(addToCartButtons[0]);
        await user.click(addToCartButtons[1]);
        expect(mockedSetCartItems).toHaveBeenCalledTimes(2);
        expect(mockedSetCartItems).toHaveBeenNthCalledWith(1, expect.arrayContaining([
            expect.objectContaining({ id: 1, title: 'Product 1', price: 10.99, quantity: 1, image: 'image1.jpg' }),
        ]));
        expect(mockedSetCartItems).toHaveBeenNthCalledWith(2, expect.arrayContaining([
            expect.objectContaining({ id: 2, title: 'Product 2', price: 9.99, quantity: 1, image: 'image2.jpg' }),
        ]));
    });
});