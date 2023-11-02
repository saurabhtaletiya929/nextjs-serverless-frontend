import { ApolloProvider } from '@apollo/client'
import { useApollo } from '~/lib/apollo-client'
import App from '~/components/App'
import 'reset-css'
import '~/styles/global.css'
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export default function NextApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)


    loadDevMessages();
    loadErrorMessages();
 

  return (
    <ApolloProvider client={apolloClient}>
      <App>
        <Component {...pageProps} />
      </App>
    </ApolloProvider>
  )
}
