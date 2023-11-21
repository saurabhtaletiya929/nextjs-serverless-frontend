import { ApolloProvider } from "@apollo/client";
import { useApollo } from "~/lib/apollo-client";
import App from "~/components/App";
import { AuthProvider } from "../providers/context/AuthContext";
import "reset-css";
import "~/styles/global.css";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export default function NextApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  loadDevMessages();
  loadErrorMessages();

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <App>
          <Component {...pageProps} />
        </App>
      </AuthProvider>
    </ApolloProvider>
  );
}
