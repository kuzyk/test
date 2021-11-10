import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from "hook/useAuth";
import React from 'react';
import { Account } from './Account';

jest.mock("hook/useAuth");

test('Should render form with two inputs and submit button', () => {
    const handleLogoutMock = jest.fn();

    useAuth.mockReturnValue({
        logout: handleLogoutMock,
        user: {
            firstName: "FIRSTNAME",
            lastName: "LASTNAME",
        }
    });

    render(<Account/>);

    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByDisplayValue('FIRSTNAME')).toBeInTheDocument();
    expect(screen.getByDisplayValue('LASTNAME')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(useAuth).toBeCalledTimes(1);

    userEvent.click(screen.getByText('Logout'));

    expect(handleLogoutMock).toBeCalledTimes(1);
});