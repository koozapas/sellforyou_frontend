import React from "react";
import store from "src/redux/store";
import PublicRoutes from "src/router/public-route";
import client from "src/apis/client";

import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import "antd/dist/antd.css";
import "src/assets/styles/common/index.css";

const ANT_COLOR_PRIMARY = "#0288d1";

const App = () => {
  (window as any).less
    .modifyVars({
      "@primary-color": ANT_COLOR_PRIMARY,
      "@info-color": ANT_COLOR_PRIMARY,
      "@processing-color": ANT_COLOR_PRIMARY,
    })
    .then(() => {})
    .catch((error: any) => {
      console.error(error);
    });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PublicRoutes />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
