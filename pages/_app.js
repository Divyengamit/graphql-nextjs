import "../styles/globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { APIProvider } from "../services/api-provider";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <APIProvider>
          <Component {...pageProps} />
        </APIProvider>
      </Provider>
    </QueryClientProvider>
  );
}
export default MyApp;
