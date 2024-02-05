import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import RouterInterface from "./RouterInterface.jsx";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider >
      <Provider store={store}>
        <Toaster />
        <RouterInterface />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
