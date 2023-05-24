// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { app } from "@microsoft/teams-js";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

app.initialize();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
