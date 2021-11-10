import Box from '@mui/material/Box';
import { Input } from 'component/formField/Input';
import { Submit } from 'component/formField/Submit';
import { SubmitError } from 'component/formField/SubmitError';
import { gql } from 'graphql.macro';
import { useSubmit } from 'hook/useSubmit';
import { ID, JwtToken } from 'lib/auth';
import { trans } from "lib/trans";
import { composeRules, email, makeValidator, required } from 'lib/validate';
import React from 'react';
import { Form, FormProps } from 'react-final-form';

type Request = {
    email: string;
    password: string;
}

export type Response = {
    login: {
        jwt: JwtToken;
        user: {
            id: ID
        }
    }
}

type Props = Omit<FormProps<Request>, 'onSubmit'> & {
    onCompleted: (response: Response) => Promise<void>;
};

const validator = makeValidator<Request>({
    email: composeRules({
        [trans.getString('validate.required')]: required,
        [trans.getString('validate.email')]: email,
    }),
    password: composeRules({
        [trans.getString('validate.required')]: required,
    }),
});

const QUERY = gql`
    mutation AuthLogin($email: String!, $password: String!){
        login(input: {identifier: $email, password: $password}) {
            jwt
            user {
                id
            }
        }
    }
`;

export const SignInForm = ({ onCompleted, ...props }: Props) => {
    const [ handleSubmit ] = useSubmit<Request, Response>(QUERY, {
        onCompleted,
    });

    return (
        <Form<Request> validate={validator} onSubmit={handleSubmit} {...props}>
            {({ handleSubmit }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Input
                        label={trans.getString('signIn.email')}
                        name="email"
                        placeholder={trans.getString('signIn.emailPlaceholder')}
                    />

                    <Input
                        label={trans.getString('signIn.password')}
                        type="password"
                        name="password"
                        placeholder={trans.getString('signIn.passwordPlaceholder')}
                    />

                    <SubmitError/>
                    <Submit title={trans.getString('signIn.button')}/>
                </Box>
            )}
        </Form>
    );
};
