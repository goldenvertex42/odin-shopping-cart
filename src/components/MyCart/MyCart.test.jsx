import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import MyCart from './MyCart';

const { mockCartState } = vi.hoisted(() => ({
    mockCartState: {
        items: [],
        setCartItems: vi.fn(),
    }
}));

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useOutletContext: () => [mockCartState.items, mockCartState.setCartItems],
    };
});

describe('MyCart component', () => {
    beforeEach(() => {
        mockCartState.items = [];
        vi.clearAllMocks();
    });
    
    afterEach(() => vi.clearAllMocks())

    it('renders empty cart message when the cart is empty', async () => {
        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <MyCart /> }])} />
        );
        expect(screen.getByText("There's nothing in your cart yet! Add some items from the shop!")).toBeInTheDocument();
    });

    it('renders correctly with 1 item', () => {
        mockCartState.items = [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }];
        
        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <MyCart /> }])} />
        );
        expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    it('aggregates subtotal, item count, 8% tax, and grand total correctly', () => {
        mockCartState.items = [
            { id: 1, title: 'Product A', price: 19.99, quantity: 2 },
            { id: 2, title: 'Product B', price: 10.00, quantity: 1 },
        ];

        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <MyCart /> }])} />
        );

        expect(screen.getByText('Subtotal (3 items):')).toBeInTheDocument();
        expect(screen.getByText('$49.98')).toBeInTheDocument();
        
        expect(screen.getByText('$4.00')).toBeInTheDocument();

        expect(screen.getByText('$53.98')).toBeInTheDocument();
    });

    it('correctly renders item instead of items when only 1 item is in the cart', () => {
        mockCartState.items = [
            { id: 1, title: 'Product A', price: 19.99, quantity: 1 },
        ];

        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <MyCart /> }])} />
        );

        expect(screen.getByText('Subtotal (1 item):')).toBeInTheDocument();
    });

    it('removes an item from the cart correctly', async () => {
        const user = userEvent.setup();

        const item1 = { id: 1, title: 'Product 1', price: 10, quantity: 1 };
        const item2 = { id: 2, title: 'Product 2', price: 20, quantity: 1 };
        mockCartState.items = [item1, item2];

        render(
            <RouterProvider router={createMemoryRouter([{ path: '/', element: <MyCart /> }])} />
        );

        const removeButtons = screen.getAllByRole('button', { name: /remove/i });
        await user.click(removeButtons[0]);

        expect(mockCartState.setCartItems).toHaveBeenCalledTimes(1);
        expect(mockCartState.setCartItems).toHaveBeenCalledWith([item2]);
    });
});