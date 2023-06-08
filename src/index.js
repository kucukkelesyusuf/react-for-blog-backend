import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import AuthContextProvider from "./contexts/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
          <AuthContextProvider>
      <App />
      </AuthContextProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
