import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./pages/App";
import { store } from "./app/store";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.querySelector("#root")
);
