import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSideBar";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";

const ViewResponsePage = () => {
    const [responses, setResponses] = useState([]);
    const [title, setTitle] = useState("");
    const { id } = useParams();
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


    const getResponses = () => {
        axios
            .get(`${base_urlLink}/api/responses/getallresponses/${id}`)
            .then((response) => {
                setResponses(response.data);
                console.log("adiu lisb", response.data);
            })
            .catch((error) => {
                console.error("Error fetching responses:", error);
            });
    };


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
                                <i className="bi bi-ui-checks-grid me-2"></i> View Each Form Responses
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            {responses.length === 0 ? (
                                <p>No responses available.</p>
                            ) : (
                                <div className="container">
                                    <div className="row">
                                        {responses.map((response, index) => (
                                            <div className="col-md-6 mb-4" key={response._id}>
                                                <div className="card h-100 shadow-sm border-0">
                                                    <div className="card-header bg-light fw-bold">
                                                        Response #{index + 1}
                                                        <span className="float-end text-muted" style={{ fontSize: '0.8rem' }}>
                                                            {new Date(response.submittedAt).toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="card-body">
                                                        {response.answers.map((answer) => (
                                                            <div key={answer._id} className="mb-2">
                                                                <strong>{answer.fieldLabel}:</strong>{" "}
                                                                {Array.isArray(answer.response)
                                                                    ? answer.response.join(", ")
                                                                    : typeof answer.response === "boolean"
                                                                        ? answer.response ? "Yes" : "No"
                                                                        : answer.response}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewResponsePage;
