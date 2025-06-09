import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSideBar";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";

const UserDashboardPage = () => {
    const [users, setUsers] = useState([]);
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

        if (users.length === 0) {
            getUsers();
        }
    }, []);

    const viewForm = (id) => {
        navigate(`/adminDashboard/edituser/${id}`);
    };

    const getUsers = () => {
        axios
            .get(`${base_urlLink}/api/auth/getallusers`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user/form?")) {
            axios.delete(`${base_urlLink}/auth/api/deleteuser/${id}`)
                .then(() => {
                    setUsers(prev => prev.filter(user => user.id !== id));
                })
                .catch(err => {
                    console.error("Delete failed:", err);
                });
        }
    };

    const columnsForm = [
        {
            name: "Action",
            cell: (row) => (
                <>
                    <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => viewForm(row._id)}
                        title="Edit"
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(row._id)}
                        title="Edit"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </>
            ),
            width: "100px"
        },
        { name: "User name", selector: (row) => row.username, sortable: true },
        { name: "Email", selector: (row) => row.email },
        { name: "Role", selector: (row) => row.role },
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

                <div className="col-12 col-md-9">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-header bg-primary text-white py-3 rounded-top-4">
                            <h5 className="mb-0">
                                <i className="bi bi-ui-checks-grid me-2"></i> User List
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <DataTable
                                columns={columnsForm}
                                data={users}
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

export default UserDashboardPage;
