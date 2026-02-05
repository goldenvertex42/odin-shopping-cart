import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartCard from "./CartCard";

describe("CartCard component", () => {
    it("renders item details", () => {
        const cartItem = {
            id: 1,
            title: 'Test Product',
            image: 'test-image.jpg',
            price: 19.99,
            quantity: 2,
        };
        const handleRemoveFromCart = vi.fn();
        const onQuantityChange = vi.fn();
        render(<CartCard cartItem={cartItem} handleRemoveFromCart={handleRemoveFromCart} onQuantityChange={onQuantityChange}/>);

        expect(screen.getByText(cartItem.title)).toBeInTheDocument;
        expect(screen.getByAltText(cartItem.title)).toHaveAttribute('src', cartItem.image);
        expect (screen.getByText(`$${cartItem.price * cartItem.quantity.toFixed(2)}`)).toBeInTheDocument;
    });

    it("updates the cartItem's quantity when a user types a value", async () => {
        const cartItem = {
            id: 1,
            title: 'Test Product',
            image: 'test-image.jpg',
            price: 19.99,
            quantity: 2,
        };
        const handleRemoveFromCart = vi.fn();
        const onQuantityChange = vi.fn();
        const user = userEvent.setup();

        render(<CartCard cartItem={cartItem} handleRemoveFromCart={handleRemoveFromCart} onQuantityChange={onQuantityChange}/>);
        const quantityInput = screen.getByRole('textbox');

        await user.type(quantityInput, '5');
        expect(quantityInput).toHaveValue('5');
    });

    it("updates the cartItem's quantity when a user clicks the + or - buttons", async () => {
        const cartItem = {
            id: 1,
            title: 'Test Product',
            image: 'test-image.jpg',
            price: 19.99,
            quantity: 2,
        };
        const handleRemoveFromCart = vi.fn();
        const onQuantityChange = vi.fn();
        const user = userEvent.setup();

        render(<CartCard cartItem={cartItem} handleRemoveFromCart={handleRemoveFromCart} onQuantityChange={onQuantityChange}/>);
        const addBtn = screen.getByRole('button', { name: '+' });
        const subtractBtn = screen.getByRole('button', { name: '-' });

        await user.click(addBtn);
        expect(screen.getByPlaceholderText(cartItem.quantity)).toBeInTheDocument;
        await user.click(subtractBtn);
        expect(screen.getByPlaceholderText(cartItem.quantity)).toBeInTheDocument;
    });

    it("calls handleRemoveFromCart with the correct arguments", async () => {
        const cartItem = {
            id: 1,
            title: 'Test Product',
            image: 'test-image.jpg',
            price: 19.99,
            quantity: 2,
        };
        const handleRemoveFromCart = vi.fn();
        const onQuantityChange = vi.fn();
        const user = userEvent.setup();

        render(<CartCard cartItem={cartItem} handleRemoveFromCart={handleRemoveFromCart} onQuantityChange={onQuantityChange}/>);
        const removeBtn = screen.getByRole('button', { name: 'Remove' });

        await user.click(removeBtn);
        expect(handleRemoveFromCart).toHaveBeenCalled(1);
        expect(handleRemoveFromCart).toHaveBeenCalledWith(cartItem.id);
    });
})