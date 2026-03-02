import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://countries.trevorblades.com/", // replace with mock API
  }),
  cache: new InMemoryCache(),
});

export default client;
