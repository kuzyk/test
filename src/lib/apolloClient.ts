import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: process.env.REACT_APP_APOLLO_URL,
    }),
    cache: new InMemoryCache(),
});
