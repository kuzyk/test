import { ApolloProvider } from '@apollo/client';
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';
import { Header } from 'component/Header';
import { AuthProvider, RequireAuth } from 'container';
import { useLang } from 'hook/useLang'
import { apolloClient } from "lib/apolloClient";
import { theme } from 'lib/theme';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Account, NotFound, SignIn } from 'screen';

export const App = () => {
    const [ lang, handleLangChange ] = useLang();

    return (
        <ThemeProvider key={lang} theme={theme}>
            <CssBaseline enableColorScheme/>
            <GlobalStyles
                styles={{
                    'body, html, #root': {
                        minHeight: '100%',
                        height: '100%'
                    }
                }}
            />

            <Header onLangChange={handleLangChange}/>

            <ApolloProvider client={apolloClient}>
                <AuthProvider apollo={apolloClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={(
                                <RequireAuth>
                                    <Account/>
                                </RequireAuth>
                            )}/>
                            <Route path="/login" element={<SignIn/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </ApolloProvider>
        </ThemeProvider>
    )
};