import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/scss/main.scss"
import "font-awesome/css/font-awesome.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./core/Auth";
import { AppRoutes } from "./routing/AppRoutes";
import { setupAxios } from "./core/AuthHelpers";

import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
setupAxios(axios);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);

