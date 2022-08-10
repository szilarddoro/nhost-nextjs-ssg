import { NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";
import type { AppProps } from "next/app";
import client from "../lib/client";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={client} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={client}>
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostNextProvider>
  );
}

export default MyApp;
