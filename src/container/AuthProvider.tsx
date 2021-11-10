import { ApolloClient, HttpLink } from '@apollo/client';
import { gql } from "graphql.macro";
import { AUTH_ID_KEY, AUTH_TOKEN_KEY, Context, CurrentUserResponse, ID, JwtToken, UserContext } from 'lib/auth';
import React, { Component, PropsWithChildren } from 'react';

const CURRENT_USER_QUERY = gql`
    query CurrentUserData($id: ID!) {
        user(id: $id) {
            id
            firstName
            lastName
        }
    }
`;

type Props = PropsWithChildren<{
    apollo: ApolloClient<any>;
}>;

const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
const userId = sessionStorage.getItem(AUTH_ID_KEY);

export class AuthProvider extends Component<Props, Partial<UserContext>> {
    state = {
        userLoading: !!authToken,
        authToken,
        userId,
    };

    componentDidMount() {
        const { apollo } = this.props;

        if (apollo.link instanceof HttpLink && !apollo.link.options.fetch) {
            apollo.setLink(
                new HttpLink({
                    ...apollo.link.options,
                    fetch: this.fetch,
                })
            );
        }

        this.syncCurrentUser();
    }

    componentDidUpdate(props: Readonly<Props>, state: Readonly<UserContext>) {
        if (state && state.authToken !== this.state.authToken) {
            sessionStorage.setItem(AUTH_TOKEN_KEY, this.state.authToken ?? '');
        }

        if (state && state.userId !== this.state.userId) {
            sessionStorage.setItem(AUTH_ID_KEY, this.state.userId ?? '');
        }
    }

    logout = async () => {
        const { apollo } = this.props;

        this.setState({
            authToken: null,
            userId: null,
            user: undefined,
        });

        await apollo.resetStore();
    };

    login = async (token: JwtToken, id: ID) => {
        const { apollo } = this.props;

        this.setState({
            authToken: token,
            userId: id
        });

        await apollo.resetStore();

        await this.syncCurrentUser();
    };

    syncCurrentUser = async () => {
        if (!this.state.authToken) {
            return this.setState({
                user: undefined,
            });
        }

        this.setState({
            userLoading: true,
        });

        try {
            const { apollo } = this.props;

            const { data } = await apollo.query<CurrentUserResponse>({
                query: CURRENT_USER_QUERY,
                variables: {
                    id: this.state.userId
                },
                fetchPolicy: 'network-only',
            });

            this.setState({
                userLoading: false,
                user: data.user,
            });

            return data.user;
        } catch (e) {
            await this.logout();
        }
    };

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    logout: this.logout,
                    login: this.login,
                    syncCurrentUser: this.syncCurrentUser,
                }}
                children={this.props.children}
            />
        );
    }

    fetch: WindowOrWorkerGlobalScope['fetch'] = (uri, options) => {
        const token = this.state.authToken;
        const useAuthHeader = !!token && `${options?.body}`.indexOf('"Auth') === -1;

        return fetch(uri, {
            ...options,
            headers: {
                ...options?.headers,
                authorization: useAuthHeader ? `Bearer ${token}` : '',
            },
        });
    };
}
