import { ApolloProvider } from "@apollo/client";
import { useApollo } from "~/lib/apollo-client";
import App from "~/components/App";
import { AuthProvider } from "../providers/context/AuthContext";
import "reset-css";
import "~/styles/global.css";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { CartProvider } from "~/providers/context/CartContext";

export default function NextApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  loadDevMessages();
  loadErrorMessages();

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <CartProvider>
        <App>
          <Component {...pageProps} />
        </App>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
