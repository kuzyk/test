import Alert, { AlertProps } from '@mui/material/Alert';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import React from 'react';
import { useFormState } from 'react-final-form';

type Props = AlertProps & {
    margin?: FormControlProps['margin'];
}

export const SubmitError = ({ margin = 'normal', ...props }: Props) => {
    const { submitError } = useFormState();

    if (!submitError) {
        return null;
    }

    return (
        <FormControl margin={margin} fullWidth>
            <Alert variant="outlined" severity="warning" {...props}>{submitError}</Alert>
        </FormControl>
    );
};