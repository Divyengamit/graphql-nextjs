import "@/styles/globals.css";
import theme from "@/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import client from "apollo-client";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>CanopiPAY</title>
        {/* <meta name="description" content="Next.js is a React Framework" /> */}
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
