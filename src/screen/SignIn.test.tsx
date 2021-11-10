import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from "hook/useAuth";
import { useSubmit } from 'hook/useSubmit';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignIn } from './SignIn';

jest.mock('react-router-dom');
jest.mock('hook/useSubmit');
jest.mock("hook/useAuth");

test('Should render form with two inputs and submit button', () => {
    useSubmit.mockReturnValue([ jest.fn() ]);

    render(<SignIn/>);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type password')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(useSubmit).toBeCalledTimes(1);
});

test('Should render form and call submit handler', async () => {
    const handleSubmitMock = jest.fn();
    const handleNavigationMock = jest.fn();
    const handleLoginMock = jest.fn();

    useSubmit.mockReturnValue([ handleSubmitMock ]);
    useLocation.mockReturnValue({ state: 'TEST' });
    useNavigate.mockReturnValue(handleNavigationMock);
    useAuth.mockReturnValue({
        login: handleLoginMock
    });

    render(<SignIn/>);

    userEvent.type(screen.getByPlaceholderText('Type email'), 'test@email.com')
    userEvent.type(screen.getByPlaceholderText('Type password'), 'password')

    expect(screen.getByDisplayValue('test@email.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();

    userEvent.click(screen.getByText('Log in'));

    expect(handleSubmitMock).toBeCalledTimes(1);
    expect(handleSubmitMock).toBeCalledWith(
        {
            "email": "test@email.com",
            "password": "password",
        },
        expect.any(Object),
        expect.any(Function)
    );

    await act(() => useSubmit.mock.calls[0][1].onCompleted({
        login: {
            jwt: "TOKEN",
            user: {
                id: "ID"
            }
        }
    }));

    expect(handleNavigationMock).toBeCalledTimes(1);
    expect(handleNavigationMock).toBeCalledWith("TEST");

    expect(handleLoginMock).toBeCalledTimes(1);
    expect(handleLoginMock).toBeCalledWith("TOKEN", "ID");
});
