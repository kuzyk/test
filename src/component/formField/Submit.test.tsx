import { render, screen } from '@testing-library/react';
import React from 'react';
import { useFormState } from 'react-final-form';
import { Submit } from './Submit';

jest.mock('react-final-form');

test('Should render button', () => {
    useFormState.mockReturnValue({ submitting: false });

    render(<Submit title="SUBMIT"/>);

    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(useFormState).toBeCalledTimes(1);
});

test('Should render button with loader', () => {
    useFormState.mockReturnValue({ submitting: true });

    render(<Submit title="SUBMIT"/>);

    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(useFormState).toBeCalledTimes(1);
});
