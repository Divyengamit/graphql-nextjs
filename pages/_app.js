import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { APIProvider } from "../services/api-provider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
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
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <APIProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </APIProvider>
          </Provider>
        </QueryClientProvider>
      </React.Fragment>
    );
  }
};
export default MyApp;
