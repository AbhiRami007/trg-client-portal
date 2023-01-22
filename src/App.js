import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<SignIn />} />
//         <Route path="signin" element={<SignIn />} />
//         <Route path="signup" element={<SignUp />} />
//         {/* <Route path="blogs" element={<Blogs />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="*" element={<NoPage />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AuthInit } from "./core/Auth";
import { LayoutSplashScreen } from "./core/SplashScreen";
import CookieConsent from "react-cookie-consent";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <CookieConsent
        style={{
          background: "rgba(31, 25, 76, 0.9)",
          color: "white",
          display: "flex",
          flex: "wrap",
          padding: "9px 10px",
          cursor: "pointer",
        }}
        buttonStyle={{
          background: "rgb(254, 207, 52)",
          color: "rgb(0, 0, 0)",
          margin: "15px",
          padding: "10px 30px",
          flex: "0 0 auto",
        }}
        overlay
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>

      <AuthInit>
        <Outlet />
      </AuthInit>
    </Suspense>
  );
};

export default App;
