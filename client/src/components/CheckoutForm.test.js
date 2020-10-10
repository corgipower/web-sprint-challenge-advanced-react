import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />);

    const header = screen.getByText(/Checkout Form/i);

    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
    render(<CheckoutForm />);
    
    const firstName = screen.getByLabelText(/First Name:/i);
    const lastName = screen.getByLabelText(/Last Name:/i);
    const address = screen.getByLabelText(/Address:/i);
    const city = screen.getByLabelText(/City:/i);
    const state = screen.getByLabelText(/State:/i);
    const zip = screen.getByLabelText(/Zip:/i);

    fireEvent.change(firstName, {target: {value: 'Elizabeth'}})
    fireEvent.change(lastName, {target: {value: 'Shulman'}});
    fireEvent.change(address, {target: {value: '123 My Street'}});
    fireEvent.change(city, {target: {value: 'Somewhere'}});
    fireEvent.change(state, {target: {value: 'NC'}});
    fireEvent.change(zip, {target: {value: '12345'}});
    
    const button = screen.getByText('Checkout', {selector: 'button'});
    fireEvent.click(button);

    const successMessage = await screen.getByTestId('successMessage');
    expect(successMessage).toBeVisible();
});
