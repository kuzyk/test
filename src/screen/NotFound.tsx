import Typography from '@mui/material/Typography';
import { ContentContainer } from 'component/ContentContainer';
import { trans } from 'lib/trans';
import React from 'react';

export const NotFound = () => (
    <ContentContainer>
        <Typography component="h1" variant="h5" align="center" paragraph>
            {trans.getString('notFound.title')}
        </Typography>
    </ContentContainer>
);