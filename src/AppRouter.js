import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import LoginPage from "./components/authpage/LoginPage";
import Registerpage from "./components/authpage/Registerpage";
import NotFoundpage from "./components/pages/NotFoundpage";
import AddEditForm from "./components/pages/AddEditForm";
import FormResponse from "./components/pages/Responseform";
import DashboardPage from "./components/dashboards/DashboardPage";
import ResponseDashboard from "./components/dashboards/ResponseDashboard";
import ViewResponsePage from "./components/dashboards/ViewResponsePage";
import UserDashboardPage from "./components/dashboards/UserDashboardPage";
import EditUserPage from "./components/dashboards/EditUserPage";
import EditForm from "./components/pages/EditForm";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/addform" element={<AddEditForm />} />
        <Route path="/editform/:id" element={<EditForm />} />
        <Route path="/response/:id" element={<FormResponse />} />
        <Route path="/adminDashboard" element={<DashboardPage />} />
        <Route path="/adminDashboard/responses" element={<ResponseDashboard />} />
        <Route path="/adminDashboard/responses/:id" element={<ViewResponsePage />} />
        <Route path="/adminDashboard/users" element={<UserDashboardPage />} />
        <Route path="/adminDashboard/edituser/:id" element={<EditUserPage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
