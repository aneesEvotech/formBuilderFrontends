import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";

const EditUserPage = () => {
    const [users, setUsers] = useState(null);
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
        getUserById(id);
    }, [id]);

    const getUserById = (id) => {
        axios
            .get(`${base_urlLink}/api/auth/getuserbyid/${id}`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`${base_urlLink}/api/auth/updateuser/${id}`, users, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                toast.success("User updated successfully");
                navigate("/adminDashboard/users"); // Or wherever you want
            })
            .catch((error) => {
                console.error("Update failed:", error);
            });
    };

    if (!users) return <div className="p-4">Loading user data...</div>;

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-12 col-md-3 mb-4">
                    <DashboardSidebar data={{ activeLink: "responses" }} />
                </div>

                <div className="col-12 col-md-9">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-header bg-primary text-white py-3 rounded-top-4">
                            <h5 className="mb-0">
                                <i className="bi bi-pencil-square me-2"></i> Edit User
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={users.username || ""}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={users.email || ""}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        className="form-control"
                                        value={users.phone || ""}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Role</label>
                                    <select
                                        name="role"
                                        className="form-select"
                                        value={users.role || "user"}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="moderator">Vender</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-success">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
