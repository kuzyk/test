import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { useField, UseFieldConfig } from 'react-final-form';

export type InputProps = Partial<TextFieldProps> & {
    name: string;
    fieldProps?: UseFieldConfig<string>;
}

export const Input = ({ name, fieldProps, ...props }: InputProps) => {
    const { input, meta } = useField<string>(name, fieldProps);

    return (
        <TextField
            fullWidth
            margin="normal"
            variant="outlined"

            error={meta.touched && meta.invalid}
            helperText={meta.touched ? (meta.error || meta.submitError) : ''}

            {...props}
            {...input}
        />
    );
};