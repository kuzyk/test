import LoadingButton from '@mui/lab/LoadingButton';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import React from 'react';
import { useFormState } from 'react-final-form';

type Props = React.PropsWithChildren<{
    title: string;
    margin?: FormControlProps['margin'];
}>;

export const Submit = ({ title, margin = 'normal' }: Props) => {
    const { submitting } = useFormState();

    return (
        <FormControl margin={margin} fullWidth>
            <LoadingButton variant="contained" type="submit" loading={submitting}>
                {title}
            </LoadingButton>
        </FormControl>
    );
};
