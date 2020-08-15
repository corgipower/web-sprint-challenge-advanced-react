import React from "react";
import { render, getByText, fireEvent, getByTestId } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const {getByText} = render(<CheckoutForm />);
    const header = getByText(/Checkout Form/i);
    
    expect(header).toBeVisible();
});

test("form shows success message on submit with form details", () => {
    const {getByLabelText, getByText, getByTestId} = render(<CheckoutForm />);
    const firstName = getByLabelText(/First Name:/i);
    const lastName = getByLabelText(/Last Name:/i);
    const address = getByLabelText(/Address:/i);
    const city = getByLabelText(/City:/i);
    const state = getByLabelText(/State:/i);
    const zip = getByLabelText(/Zip:/i);

    fireEvent.change(firstName, {target: {value: 'Liz'}});
    fireEvent.change(lastName, {target: {value: 'Shulman'}});
    fireEvent.change(address, {target: {value: '123 My Street'}});
    fireEvent.change(city, {target: {value: 'Somewhere'}});
    fireEvent.change(state, {target: {value: 'NC'}});
    fireEvent.change(zip, {target: {value: '12345'}});

    // const successMessage = getByTestId('successMessage') //this fails, because it's not loaded yet

    fireEvent.click(getByText('Checkout'))

    const successMessage = getByTestId('successMessage')
    expect(successMessage).toBeVisible();

});
