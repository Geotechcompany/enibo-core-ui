import {describe, it} from "vitest"
import { render, screen, fireEvent} from '@testing-library/react';
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom'; 


describe("Login", () => {
    it("Renders Login Component", () => {
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        )
    })

    it('Validates Required Fields', async () => {
        render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
    
        // Trigger form submission without filling in required fields
        fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    
        // Assert that error messages are displayed for email and password
        expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
        expect(
          await screen.findByText(/Password must be at least 8 characters/i)
        ).toBeInTheDocument();
    });
})