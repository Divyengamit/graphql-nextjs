import "../styles/globals.css";
import React, { useState, useEffect } from "react";
// import store from "../store/store";
// import { Provider } from "react-redux";
import { APIProvider } from "../services/api-provider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
const queryClient = new QueryClient();
import { wrapper } from "../store/store";
// import { createWrapper } from "next-redux-wrapper";

const MyApp = ({ Component, pageProps }) => {
  // console.log("storevwefedfsfds", store);
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
          <APIProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </APIProvider>
        </QueryClientProvider>
      </React.Fragment>
    );
  }
};

export default wrapper.withRedux(MyApp);
