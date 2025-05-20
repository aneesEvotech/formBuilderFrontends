import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import LoginPage from "./components/authpage/LoginPage";
import Registerpage from "./components/authpage/Registerpage";
import NotFoundpage from "./components/pages/NotFoundpage";
import AddEditForm from "./components/pages/AddEditForm";
import FormResponse from "./components/pages/Responseform";
import DashboardPage from "./components/dashboards/DashboardPage";
import DashboardMainPage from "./components/dashboards/DashboardMainPage";
import ResponseDashboard from "./components/dashboards/ResponseDashboard";
import ViewResponsePage from "./components/dashboards/ViewResponsePage";
import UserDashboardPage from "./components/dashboards/UserDashboardPage";
import EditUserPage from "./components/dashboards/EditUserPage";
import EditForm from "./components/pages/EditForm";
import useVisitor from "./components/hooks/useVisitor";
import UniqueVisitor from "./components/dashboards/UniqueVisitor";
import TotalVisitor from "./components/dashboards/TotalVisitor";
const AppRouter = () => {
  useVisitor();
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/addform" element={<AddEditForm />} />
        <Route path="/editform/:id" element={<EditForm />} />
        <Route path="/response/:id" element={<FormResponse />} />
        <Route path="/adminDashboard/forms" element={<DashboardPage />} />
        <Route path="/adminDashboard" element={<DashboardMainPage />} />
        <Route path="/adminDashboard/responses" element={<ResponseDashboard />} />
        <Route path="/adminDashboard/responses/:id" element={<ViewResponsePage />} />
        <Route path="/adminDashboard/users" element={<UserDashboardPage />} />
        <Route path="/adminDashboard/edituser/:id" element={<EditUserPage />} />
        <Route path="/adminDashboard/uniquevisitorPage" element={<UniqueVisitor />} />
        <Route path="/adminDashboard/totalVisitor" element={<TotalVisitor />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
