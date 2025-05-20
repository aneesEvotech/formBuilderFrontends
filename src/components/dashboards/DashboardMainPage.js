import React, { use, useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSideBar";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";

const DashboardMainPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [data, setData] = useState({}); 
    useEffect(() => {
        if (!user) return;

        if (user.user.role !== "admin") {
            toast.warn("Access denied!");
            navigate("/");
            return;
        }

        getTotalVisitor();
    }, [user]);

    const getTotalVisitor = () => {
        axios
            .get(`${base_urlLink}/api/visitor/getAllmodelsCount`)
            .then((response) => {
                console.log("response", response)
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-12 col-md-3 mb-4">
                    <DashboardSidebar data={{ activeLink: "responses" }} />
                </div>

                {/* Main Content */}
                <div className="col-12 col-md-9">
                    <div className="card border-0 shadow-sm rounded-1 h-100">
                        <div className="card-header bg-gray text-black py-3 rounded-top-2">
                            <h5 className="mb-0">
                                <i className="bi bi-ui-checks-grid me-2"></i> Dashboard
                            </h5>
                        </div>
                        <div className="row g-4 pt-3 p-2 mt-2">

                            <div className="col-md-3">
                                <Link to="/adminDashboard/totalVisitor" className="text-decoration-none text-dark">
                                    <div className="card stat-card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between border-start border-4 border-warning">
                                        <div>
                                            <small className="text-uppercase fw-semibold text-warning">Total Visitors</small>
                                            <h5 className="fw-bold mb-0">{data?.visitorCount?.totalVisitors ?? 0}</h5>
                                        </div>
                                        <div className="icon-circle bg-light text-secondary">
                                            <i className="bi bi-people-fill fs-4"></i>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-md-3">
                                <Link to="/adminDashboard/uniquevisitorPage" className="text-decoration-none text-dark">
                                    <div className="card stat-card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between border-start border-4 border-primary">
                                        <div>
                                            <small className="text-uppercase fw-semibold text-primary">Unique Visitors</small>
                                            <h5 className="fw-bold mb-0">{data?.visitorCount?.uniqueVisitors ?? 0}</h5>
                                        </div>
                                        <div className="icon-circle bg-light text-secondary">
                                            <i className="bi bi-person-check-fill fs-4"></i>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-md-3">
                                <Link to="/adminDashboard/forms" className="text-decoration-none text-dark">
                                    <div className="card stat-card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between border-start border-4 border-warning">
                                        <div>
                                            <small className="text-uppercase fw-semibold text-warning">Total Forms</small>
                                            <h5 className="fw-bold mb-0">{data?.formsCount ?? 0}</h5>
                                        </div>
                                        <div className="icon-circle bg-light text-secondary">
                                            <i className="bi bi-file-earmark-text fs-4"></i>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-md-3">
                                <Link to="/adminDashboard/responses" className="text-decoration-none text-dark">
                                    <div className="card stat-card border-0 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between border-start border-4 border-primary">
                                        <div>
                                            <small className="text-uppercase fw-semibold text-primary">Total Response</small>
                                            <h5 className="fw-bold mb-0">{data?.responsesCount ?? 0}</h5>
                                        </div>
                                        <div className="icon-circle bg-light text-secondary">
                                            <i className="bi bi-wallet2 fs-4"></i>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMainPage;
