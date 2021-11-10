import { createContext } from 'react';

export const AUTH_TOKEN_KEY = '_token';
export const AUTH_ID_KEY = '_id';

export type JwtToken = string | null;
export type ID = string | null;

export type User = {
    id: ID;
    firstName?: string;
    lastName?: string;
}

export type CurrentUserResponse = {
    user: User;
}

export interface UserContext {
    authToken?: JwtToken;

    userLoading?: boolean;
    userId?: ID;
    user?: User;

    syncCurrentUser(): Promise<User | void>;

    logout(): Promise<void>;

    login(token: JwtToken, id: ID): Promise<void>;
}

export const Context = createContext<UserContext>({
    logout: async () => {
        throw new Error('IMPLEMENT_LOGOUT');
    },
    login: async () => {
        throw new Error('IMPLEMENT_LOGIN');
    },
    syncCurrentUser: async () => {
        throw new Error('IMPLEMENT_SYNC_CURRENT_USER');
    },
});
