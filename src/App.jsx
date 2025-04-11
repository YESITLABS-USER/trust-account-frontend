import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/AuthContext";
import RoleBasedRoutes from "./routes/RoleBasedRoutes";
import Login from "./pages/user/auth/Login";
import Signup from "./pages/user/auth/Signup";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import Homepage from "./pages/Homepage";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/terms-conditions" element={<TermsCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<RoleBasedRoutes />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
