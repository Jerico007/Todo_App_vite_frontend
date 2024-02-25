// import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Provider} from "react-redux";

import  Store  from "./store.jsx";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
