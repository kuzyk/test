import { render, screen } from '@testing-library/react';
import { useAuth } from "hook/useAuth";
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';

jest.mock("hook/useAuth");

test('Should render loader when data is loading', () => {
    useAuth.mockReturnValue({
        userLoading: true,
    });

    render((
        <MemoryRouter initialEntries={[ "/" ]}>
            <Routes>
                <Route path="/login" element={<div>LOGIN</div>}/>
                <Route path="*" element={(
                    <RequireAuth>
                        <div>SECURE</div>
                    </RequireAuth>
                )}/>
            </Routes>
        </MemoryRouter>
    ));

    expect(screen.queryByText('SECURE')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('Should redirect to login page', () => {
    useAuth.mockReturnValue({
        userLoading: false,
    });

    render((
        <MemoryRouter initialEntries={[ "/" ]}>
            <Routes>
                <Route path="/login" element={<div>LOGIN</div>}/>
                <Route path="*" element={(
                    <RequireAuth>
                        <div>SECURE</div>
                    </RequireAuth>
                )}/>
            </Routes>
        </MemoryRouter>
    ));

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.queryByText('SECURE')).not.toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
});

test('Should render child', () => {
    useAuth.mockReturnValue({
        userLoading: false,
        user: {},
    });

    render((
        <MemoryRouter initialEntries={[ "/" ]}>
            <Routes>
                <Route path="/login" element={<div>LOGIN</div>}/>
                <Route path="*" element={(
                    <RequireAuth>
                        <div>SECURE</div>
                    </RequireAuth>
                )}/>
            </Routes>
        </MemoryRouter>
    ));

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.queryByText('LOGIN')).not.toBeInTheDocument();
    expect(screen.getByText('SECURE')).toBeInTheDocument();
});
