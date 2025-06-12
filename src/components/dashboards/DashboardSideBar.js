import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { toast } from "react-toastify";
import FeatureGate from "../paywall/FeatureGate";

const DashboardSidebar = ({ data }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [showVisitorsSubmenu, setShowVisitorsSubmenu] = useState(data.isopen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/"); // or navigate("/login") if you have a login route
  };

  const SidebarItem = ({ iconClass, label, to }) => (
    <li className="mb-2">
      <Link
        to={to}
        className="nav-link text-dark px-3 py-2 rounded d-flex align-items-center"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <i className={`${iconClass} me-2`}></i>
        {label}
      </Link>
    </li>
  );

  return (
    <div
      className="bg-white border rounded shadow p-4 h-100"
      style={{ minHeight: "100vh" }}
    >
      <h5 className="text-dark fw-bold mb-4 d-flex align-items-center">
        <i className="bi bi-gear me-2 text-primary"></i> Form Folder Dashboard
        <strong>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            Home
          </button>
        </strong>
      </h5>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link
            to="/adminDashboard"
            className={`nav-link text-dark px-3 py-2 rounded d-flex align-items-center ${
              data === "forms" ? "active" : ""
            }`}
          >
            <i className="bi bi-file-earmark-text me-2 text-secondary"></i>{" "}
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`nav-link text-dark px-3 py-2 rounded d-flex align-items-center w-100 btn btn-link ${
              data === "visitors" ? "active" : ""
            }`}
            onClick={() => setShowVisitorsSubmenu(!showVisitorsSubmenu)}
            style={{ textDecoration: "none", justifyContent: "space-between" }}
          >
            <span>
              <i className="bi bi-people-fill me-2 text-secondary"></i> Visitors
            </span>
            <i
              className={`bi ${
                showVisitorsSubmenu ? "bi-chevron-up" : "bi-chevron-down"
              }`}
            ></i>
          </button>

          {showVisitorsSubmenu && (
            <ul className="list-unstyled mt-2 ps-4">
              <SidebarItem
                iconClass="bi bi-person-fill"
                label="Total Visitor"
                to="/adminDashboard/totalVisitor"
              />
              <SidebarItem
                iconClass="bi bi-book"
                label="Unique Visitor"
                to="/adminDashboard/uniquevisitorPage"
              />
            </ul>
          )}
        </li>
        <FeatureGate feature="forms">
          <li className="nav-item mb-2">
            <Link
              to="/adminDashboard/forms"
              className={`nav-link text-dark px-3 py-2 rounded d-flex align-items-center ${
                data === "forms" ? "active" : ""
              }`}
            >
              <i className="bi bi-file-earmark-text me-2 text-secondary"></i>{" "}
              Forms
            </Link>
          </li>
        </FeatureGate>
        <FeatureGate feature="responses">
          <li className="nav-item mb-2">
            <Link
              to="/adminDashboard/responses"
              className={`nav-link text-dark px-3 py-2 rounded d-flex align-items-center ${
                data === "responses" ? "active" : ""
              }`}
            >
              <i className="bi bi-bar-chart me-2 text-secondary"></i> Responses
            </Link>
          </li>
        </FeatureGate>
        <FeatureGate feature="users">
          <li className="nav-item mb-2">
            <Link
              to="/adminDashboard/users"
              className={`nav-link text-dark px-3 py-2 rounded d-flex align-items-center ${
                data === "users" ? "active" : ""
              }`}
            >
              <i className="bi bi-person-lines-fill me-2 text-secondary"></i>{" "}
              Users
            </Link>
          </li>
        </FeatureGate>

        <li className="nav-item mt-3">
          <button
            className="nav-link text-danger px-3 py-2 rounded d-flex align-items-center btn btn-link"
            onClick={handleLogout}
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
