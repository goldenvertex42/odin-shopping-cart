import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

describe("ProductCard component", () => {
    it("renders product details", () => {
        const product = {
        title: 'Test Product',
        image: 'test-image.jpg',
        price: 19.99,
        };

        const handleAddToCart = vi.fn();
        render(<ProductCard product={product} handleAddToCart={handleAddToCart}/>);
        expect(screen.getByText(product.title)).toBeInTheDocument;
        expect(screen.getByAltText(product.title)).toBeInTheDocument;
        expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument;
    });

    it("updates quantityToAdd state when user types a value", async () => {
        const product = {
        title: 'Test Product',
        image: 'test-image.jpg',
        price: 19.99,
        };
        const handleAddToCart = vi.fn();
        const user = userEvent.setup();

        render(<ProductCard product={product} handleAddToCart={handleAddToCart}/>);
        const quantityInput = screen.getByRole('textbox');

        await user.type(quantityInput, '5');
        expect(quantityInput).toHaveValue('5');
    });

    it("updates quantityToAdd state when user clicks on + or - buttons", async () => {
        const product = {
        title: 'Test Product',
        image: 'test-image.jpg',
        price: 19.99,
        };
        const handleAddToCart = vi.fn();
        const user = userEvent.setup();

        render(<ProductCard product={product} handleAddToCart={handleAddToCart}/>);
        const addBtn = screen.getByRole('button', { name: '+' });
        const subtractBtn = screen.getByRole('button', { name: '-' });

        await user.click(addBtn);
        expect(screen.getByPlaceholderText('2')).toBeInTheDocument;
        await user.click(subtractBtn);
        expect(screen.getByPlaceholderText('1')).toBeInTheDocument;
    });

    it("calls handleAddToCart with correct arguments", async () => {
        const product = {
        title: 'Test Product',
        image: 'test-image.jpg',
        price: 19.99,
        };
        const handleAddToCart = vi.fn();
        const user = userEvent.setup();

        render(<ProductCard product={product} handleAddToCart={handleAddToCart}/>);
        const addToCartBtn = screen.getByRole('button', { name: 'Add to Cart' });

        await user.click(addToCartBtn);
        expect(handleAddToCart).toHaveBeenCalled(1);
        expect(handleAddToCart).toHaveBeenCalledWith(product, 1);
    })
})