import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";

describe("App component", () => {
  it("renders correct heading", () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>);
    // using regex with the i flag allows simpler case-insensitive comparison
    expect(screen.getByRole("heading", { name: "Brigid's General Store" }).textContent).toMatch(/brigid's general store/i);
  });
});