/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuth } from "../core/Auth";
import { AuthPage } from "../core/AuthPage";
import App from "../App";
import { ErrorsPage } from "../components/Errors/ErrorsPage";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { Logout } from "../components/Auth/Logout";
import { GoogleOAuthProvider } from "@react-oauth/google";
const { PUBLIC_URL } = process.env;

const AppRoutes = () => {
  const { currentUser } = useAuth();
  const [ids, setIds] = useState([]);
  ids && localStorage.setItem("ids", ids);
  const queryParameters = new URLSearchParams(window.location.search);
  useEffect(() => {
    setIds(queryParameters.get("id"));
  },[]);

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route
          element={
            <GoogleOAuthProvider clientId="395250203486-oiovkpbqhhf6muc7l8boimv3bf292bs6.apps.googleusercontent.com">
              <App />
            </GoogleOAuthProvider>
          }
        >
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {currentUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" state={ids} />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
