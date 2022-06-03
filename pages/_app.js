import "../styles/globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { APIProvider } from "../services/api-provider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
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
  );
}
export default MyApp;
