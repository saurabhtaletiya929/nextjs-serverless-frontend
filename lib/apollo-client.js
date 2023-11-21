import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import { setContext } from '@apollo/client/link/context';

/**
 * Polyfill Global Variables in Server
 */
if (!process.browser) {
  global.URL = require("url").URL;
}

let apolloClient;

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const token = localStorage.getItem("token");
    console.log("token", token);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  return forward(operation);
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } else {
    return {
      headers: {
        ...headers,
      },
    };
  }
});

function createApolloClient() {
  const uri = process.browser
    ? new URL("/graphql", location.href)
    : new URL("/graphql", process.env.MAGENTO_URL).href;
  const httpLink = new HttpLink({
    uri,
    credentials: "include", // Additional fetch() options like `credentials` or `headers`
  });

  return new ApolloClient({
    ssrMode: !process.browser,
    credentials: "include",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
