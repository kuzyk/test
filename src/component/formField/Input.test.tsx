import { render, screen } from '@testing-library/react';
import React from 'react';
import { useField } from 'react-final-form';
import { Input } from './Input';

jest.mock('react-final-form');

test('Should render input', () => {
    useField.mockReturnValueOnce({ input: {}, meta: {} });

    render(<Input name="test" label="Test label" value="Test value"/>);

    expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
    expect(useField).toBeCalledTimes(1);
});

test('Should render input with error', () => {
    useField.mockReturnValueOnce({
        input: {}, meta: {
            touched: true,
            error: "Test error"
        }
    });

    render(<Input name="test" label="Test label" value="Test value"/>);

    expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(useField).toBeCalledTimes(1);
});

test('Should render input with submitError', () => {
    useField.mockReturnValueOnce({
        input: {}, meta: {
            touched: true,
            invalid: true,
            submitError: "Test error"
        }
    });

    render(<Input name="test" label="Test label" value="Test value"/>);

    expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(useField).toBeCalledTimes(1);
});