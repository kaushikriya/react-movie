import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import store from "../store/movieStore/store";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Provider store={store}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
