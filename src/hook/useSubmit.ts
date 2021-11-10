import { ApolloError, MutationResult, useMutation } from '@apollo/client';
import { MutationHookOptions } from '@apollo/client/react/types/types';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { FORM_ERROR, ValidationErrors } from 'final-form';
import isEmpty from 'lodash/isEmpty';
import { FormProps } from 'react-final-form';

type Result<T, D> = [ FormProps<T>['onSubmit'], MutationResult<D> ];

type FormError = {
    message?: Array<{
        messages?: Array<{
            id: string;
            message: string;
        }>;
    }>;
};

export const useSubmit = <T, D = Partial<T>>(mutation: TypedDocumentNode<D, T>, options?: MutationHookOptions<D, T>): Result<T, D> => {
    const [ onMutation, result ] = useMutation<D, T>(mutation, options);

    const onSubmit = async (value: T) => {
        try {
            await onMutation({
                variables: value,
            });
        } catch (e) {
            if (e instanceof ApolloError) {
                const errors = e.graphQLErrors.reduce<ValidationErrors>(
                    (accumulation, error) => {
                        // @ts-ignore
                        const extError = error.extensions.exception?.data;

                        (extError as FormError).message?.forEach(({ messages }) => {
                            messages?.forEach(({ message }) => {
                                if (accumulation !== undefined) {
                                    accumulation[FORM_ERROR] = message;
                                }
                            });
                        });

                        return accumulation;
                    },
                    {}
                );

                if (!isEmpty(errors)) {
                    return errors;
                }
            }

            return {
                [FORM_ERROR]: (e as Error).message,
            };
        }
    };

    return [ onSubmit, result ];
};