import { render, screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from './NotFound';

test('Should render "Not Found" text', () => {
    render(<NotFound/>);

    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
});
