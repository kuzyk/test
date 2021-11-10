import Typography from '@mui/material/Typography';
import { ContentContainer } from 'component/ContentContainer';
import { Response, SignInForm } from "component/form/SignInForm";
import { useAuth } from "hook/useAuth";
import { trans } from 'lib/trans';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SignIn = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const auth = useAuth();

    const handleLogin = async ({ login }: Response) => {
        await auth.login(login.jwt, login.user.id);

        navigate(location.state || '/');
    }

    return (
        <ContentContainer>
            <Typography component="h1" variant="h5" align="center" paragraph>
                {trans.getString('signIn.title')}
            </Typography>
            <SignInForm onCompleted={handleLogin}/>
        </ContentContainer>
    );
}