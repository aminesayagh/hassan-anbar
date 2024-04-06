import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://hassanaanbar.masayagh.com/graphql', // Replace this with your actual GraphQL endpoint
    }),
    cache: new InMemoryCache(),
  });
};

export const apolloClient = createApolloClient();