import Container from '@mui/material/Container';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;

export const ContentContainer = ({ children }: Props) => (
    <Container component="main" sx={{ display: 'grid', alignContent: 'center', height: '100%' }} maxWidth="xs">
        {children}
    </Container>
);