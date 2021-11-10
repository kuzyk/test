import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ContentContainer } from 'component/ContentContainer';
import { AccountForm } from "component/form/AccountForm";
import { useAuth } from "hook/useAuth";
import { trans } from "lib/trans";
import React from 'react';

export const Account = () => {
    const auth = useAuth();

    return (
        <ContentContainer>
            <Typography component="h1" variant="h5" align="center" paragraph>
                {trans.getString('account.title')}
            </Typography>

            <AccountForm initialValues={auth.user}/>

            <Box sx={{ textAlign: "right", marginTop: 1 }}>
                <Button onClick={auth.logout}>
                    {trans.getString('account.button')}
                </Button>
            </Box>
        </ContentContainer>
    );
}