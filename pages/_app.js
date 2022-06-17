import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { APIProvider } from "../services/api-provider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import { RouteGuard } from "../components/components/RouteGuard";
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }) => {
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
            <APIProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouteGuard>
                  <Component {...pageProps} />
                </RouteGuard>
              </ThemeProvider>
            </APIProvider>
          </Provider>
        </QueryClientProvider>
      </React.Fragment>
    );
  }
};
export default MyApp;
