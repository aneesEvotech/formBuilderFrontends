import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSideBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { base_urlLink } from "../helper/config";
import DataTable from "react-data-table-component";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const UniqueVisitor = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [uniqueVisitorData, setUniqueVisitorData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Only allow admin users
        if (parsedUser?.user?.role !== "admin") {
            toast.warn("Access denied!");
            navigate("/");
            return;
        }

        fetchUniqueVisitors();
    }, []);

    // API call to fetch unique visitor data
    const fetchUniqueVisitors = async () => {
        try {
            const response = await axios.get(`${base_urlLink}/api/visitor/unique`);
            setUniqueVisitorData(response.data || []);
        } catch (error) {
            console.error("Error fetching visitor data:", error);
            toast.error("Failed to fetch visitor data.");
        } finally {
            setLoading(false);
        }
    };

    // DataTable columns
    const columns = [
        { name: "URL", selector: (row) => row.url, sortable: true },
        { name: "Unique Visitors", selector: (row) => row.uniqueVisitors, sortable: true },
    ];

    // Chart.js configuration
    const chartData = {
        labels: uniqueVisitorData.map((item) => item.url),
        datasets: [
            {
                label: "Unique Visitors",
                data: uniqueVisitorData.map((item) => item.uniqueVisitors),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => ` ${context.parsed.y} visitors`,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 45,
                    autoSkip: true,      // skip some labels if too many
                    maxTicksLimit: 10,   // max number of ticks to show
                },
                title: {
                    display: true,
                    text: "URL",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Unique Visitors",
                },
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-12 col-md-3 mb-4">
                    <DashboardSidebar data={{ activeLink: "UniqueVisitor", isopen: true }} />
                </div>

                {/* Main Content */}
                <div className="col-12 col-md-9">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-header bg-primary text-white py-3 rounded-top-4">
                            <h5 className="mb-0">
                                <i className="bi bi-ui-checks-grid me-2"></i>Unique Visitors
                            </h5>
                        </div>

                        {/* Chart */}
                        <div className="card p-3 m-5">
                            {!loading && uniqueVisitorData.length > 0 ? (
                                <Bar data={chartData} options={chartOptions} />
                            ) : (
                                <p className="text-center">{loading ? "Loading chart..." : "No data available"}</p>
                            )}
                        </div>

                        {/* Data Table */}
                        <div className="card-body p-4">
                            <DataTable
                                columns={columns}
                                data={uniqueVisitorData}
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

export default UniqueVisitor;
