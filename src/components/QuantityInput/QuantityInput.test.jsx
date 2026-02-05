import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantityInput from "./QuantityInput.jsx";

describe("QuantityInput component", () => {
    it("renders two buttons and a text input", () => {
        const mockQuantity = 1;
        const mockOnQuantityChange = vi.fn();
        render(<QuantityInput quantity={mockQuantity} setQuantity={mockOnQuantityChange}/>);
        
        const buttons = screen.getAllByRole('button');
        const input = screen.getByRole('textbox');
        expect(buttons).toHaveLength(2);
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument;
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument;
        expect(input).toBeInTheDocument;
    })

    it("increments when + is clicked", async () => {
        const mockQuantity = 1;
        const mockOnQuantityChange = vi.fn();
        const user = userEvent.setup();
        render(<QuantityInput quantity={mockQuantity} setQuantity={mockOnQuantityChange}/>);

        const addBtn = screen.getByRole('button', { name: '+' });
        
        await user.click(addBtn);
        expect(mockOnQuantityChange).toHaveBeenCalled(1);
        expect(mockOnQuantityChange).toHaveBeenCalledWith(mockQuantity + 1);
    })

    it("decrements when - is clicked", async () => {
        const mockQuantity = 2;
        const mockOnQuantityChange = vi.fn();
        const user = userEvent.setup();
        render(<QuantityInput quantity={mockQuantity} setQuantity={mockOnQuantityChange}/>);

        const subtractBtn = screen.getByRole('button', { name: '-' });
        
        await user.click(subtractBtn);
        expect(mockOnQuantityChange).toHaveBeenCalled(1);
        expect(mockOnQuantityChange).toHaveBeenLastCalledWith(mockQuantity - 1);
    })

    it("does not decrement below 1", async () => {
        const mockQuantity = 1;
        const mockOnQuantityChange = vi.fn();
        const user = userEvent.setup();
        render(<QuantityInput quantity={mockQuantity} setQuantity={mockOnQuantityChange}/>);

        const subtractBtn = screen.getByRole('button', { name: '-' });
        
        await user.click(subtractBtn);
        expect(mockQuantity).toBe(1);
    })
})