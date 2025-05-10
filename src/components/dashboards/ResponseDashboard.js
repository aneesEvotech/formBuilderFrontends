import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSideBar";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";

const ResponseDashboard = () => {
    const [responses, setResponses] = useState([]);
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

        if (responses.length === 0) {
            getResponses();
        }
    }, []);

    const viewForm = (id) => {
        navigate(`/adminDashboard/responses/${id}`);
    };

    const getResponses = () => {
        axios
            .get(`${base_urlLink}/api/responses/getallresponseswithCount`)
            .then((response) => {
                setResponses(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching responses:", error);
            });
    };

    const columnsForm = [
        {
            name: "Action",
            cell: (row) => (
                <button
                    className="btn btn-outline-primary btn-sm rounded-circle"
                    onClick={() => viewForm(row.formId)}
                    title="View Form"
                >
                    <i className="bi bi-eye"></i>
                </button>
            ),
            width: "100px"
        },
        { name: "Title", selector: (row) => row.formTitle, sortable: true },
        { name: "Responses", selector: (row) => row.responseCount },
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
                                <i className="bi bi-ui-checks-grid me-2"></i> Responses List
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <DataTable
                                columns={columnsForm}
                                data={responses}
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

export default ResponseDashboard;
