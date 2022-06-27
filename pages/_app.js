import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { APIProvider } from "../services/api-provider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import { RouteGuard } from "../components/components/RouteGuard";
const queryClient = new QueryClient();
import { persistor, store } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout;

  const [showing, setShowing] = useState(false);
  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>CanopiPAY</title>
          {/* <meta name="description" content="Next.js is a React Framework" /> */}
        </Head>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <APIProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <RouteGuard>
                    {getLayout ? (
                      getLayout(<Component {...pageProps} />)
                    ) : (
                      <Component {...pageProps} />
                    )}
                  </RouteGuard>
                </ThemeProvider>
              </APIProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </React.Fragment>
    );
  }
};

export default MyApp;
