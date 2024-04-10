import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from './Hero';

test('input field updates state on change', () => {
    render(<Hero />);
    const inputElement = screen.getByPlaceholderText('Enter URL') as HTMLInputElement; 
    fireEvent.change(inputElement, { target: { value: 'https://example.com' } });
    expect(inputElement.value).toBe('https://example.com');
});


test('form submits and calls onSubmit function', () => {
        const mockOnSubmit = jest.fn();
        render(<Hero />); 
        const inputElement = screen.getByPlaceholderText('Enter URL') as HTMLInputElement; 
    const formElement = screen.getByTestId('form');
    formElement.onsubmit = mockOnSubmit;
        fireEvent.change(inputElement, { target: { value: 'https://example.com' } });
        fireEvent.submit(formElement);
        expect(mockOnSubmit).toHaveBeenCalled();
});