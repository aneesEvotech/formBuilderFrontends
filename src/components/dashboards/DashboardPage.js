import React, { use, useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSideBar";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (!user) return; 

    if (user.user.role !== "admin") {
      toast.warn("Access denied!");
      navigate("/");
      return;
    }

    if (forms.length === 0) {
      getForms();
    }
  }, [user]);

  const viewForm = (id) => {
    navigate(`/form/${id}`);
  };

  const getForms = () => {
    axios
      .get(`${base_urlLink}/api/forms/getall`)
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  };

  const columnsForm = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description },
    { name: "Fields", selector: (row) => row.fields.length },
    {
      name: "Created",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 mb-4">
          <DashboardSidebar data={{ activeLink: "responses" }} />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-primary text-white py-3 rounded-top-4">
              <h5 className="mb-0">
                <i className="bi bi-ui-checks-grid me-2"></i> Form List
              </h5>
            </div>
            <div className="card-body p-4">
              <DataTable
                columns={columnsForm}
                data={forms}
                pagination
                highlightOnHover
                responsive
                striped
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
