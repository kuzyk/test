import CircularProgress from '@mui/material/CircularProgress';
import { ContentContainer } from 'component/ContentContainer';
import React from 'react';

export const Loader = () => (
    <ContentContainer>
        <CircularProgress sx={{ justifySelf: "center" }}/>
    </ContentContainer>
);