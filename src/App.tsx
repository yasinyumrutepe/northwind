import React from "react";
import { ConfigProvider } from "antd";
import { AppRouter } from "./router/AppRouter";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PrimeReactProvider} from 'primereact/api';
import "primereact/resources/themes/lara-light-green/theme.css";


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider >
          <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
            <AppRouter />
          </ConfigProvider>
        </PrimeReactProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
  );
};

export default App;
