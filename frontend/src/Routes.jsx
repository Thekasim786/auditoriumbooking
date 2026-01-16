import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import LoginPage from './pages/login-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="*" element={<LoginPage />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
