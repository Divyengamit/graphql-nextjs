import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginScreen from "../pages/login";
import SignupScreen from "../pages/signup";
// import OTPScreen from "../screens/OTPScreen";
// import PasswordScreen from "../screens/PasswordScreen";
// import CreateProfileScreen from "../screens/CreateProfileScreen";
// import DocumentScreen from "../screens/DocumentScreen";
// import MyProfileScreen from "../screens/MyProfileScreen";
// import HomeScreen from "../screens/HomeScreen";
// import FinanceScreen from "../screens/FinanceScreen";

const BaseRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        {/* <Route path="/otp" element={<OTPScreen />} />
        <Route path="/password" element={<PasswordScreen />} />
        <Route path="/create-profile" element={<CreateProfileScreen />} />
        <Route path="/document" element={<DocumentScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/my-profile" element={<MyProfileScreen />} />
        <Route path="/finance" element={<FinanceScreen />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRoute;
