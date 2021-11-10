import { render, screen } from '@testing-library/react';
import React from 'react';
import { useFormState } from 'react-final-form';
import { SubmitError } from './SubmitError';

jest.mock('react-final-form');

test('Should render alert', async () => {
    useFormState.mockReturnValueOnce({ submitError: "test error" });

    render(<SubmitError/>);

    expect(screen.getByRole("alert")).toBeInTheDocument();
});

test('Should not render alert without error', () => {
    useFormState.mockReturnValueOnce({ submitError: null });

    render(<SubmitError/>);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
