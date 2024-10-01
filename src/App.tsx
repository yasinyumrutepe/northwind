import React from "react";
import { ConfigProvider, notification } from "antd";
import { AppRouter } from "./router/AppRouter";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();




const App: React.FC = () => {

  notification.config({
    placement: "bottomLeft",
    duration: 1,
  });


  return (
    <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
          <AppRouter />
        </ConfigProvider>
      </QueryClientProvider>
    </RecoilRoot>
    </React.StrictMode>
  );
};

export default App;
