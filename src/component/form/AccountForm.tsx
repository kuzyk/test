import Box from '@mui/material/Box';
import { Input } from 'component/formField/Input';
import { trans } from "lib/trans";
import React from 'react';
import { Form, FormProps } from 'react-final-form';

type Values = {
    firstName: string;
    lastName: string;
}

type Props = Omit<FormProps<Values>, 'onSubmit'>;

const handleSubmit = () => {
};

export const AccountForm = ({ onCompleted, ...props }: Props) => (
    <Form<Values> onSubmit={handleSubmit} {...props}>
        {({ handleSubmit }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Input label={trans.getString('account.firstName')} name="firstName" disabled/>

                <Input label={trans.getString('account.lastName')} name="lastName" disabled/>
            </Box>
        )}
    </Form>
);
