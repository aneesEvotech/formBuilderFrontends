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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TotalVisitor = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [totalVisitorData, setTotalVisitorData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/");
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser?.user?.role !== "admin") {
            toast.warn("Access denied!");
            navigate("/");
            return;
        }

        fetchTotalVisitors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTotalVisitors = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${base_urlLink}/api/visitor/total`);
            setTotalVisitorData(response.data || []);
        } catch (error) {
            console.error("Error fetching total visitors:", error);
            toast.error("Failed to fetch total visitors");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { name: "URL", selector: (row) => row.url, sortable: true },
        { name: "Total Visitors", selector: (row) => row.total, sortable: true },
    ];

    const chartData = {
        labels: totalVisitorData.map((item) => item.url),
        datasets: [
            {
                label: "Total Visitors",
                data: totalVisitorData.map((item) => item.total),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,  // important for flexible height
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
                    text: "Total Visitors",
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
                    <DashboardSidebar data={{ activeLink: "TotalVisitor", isopen: true }} />
                </div>

                {/* Main content */}
                <div className="col-12 col-md-9">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-header bg-primary text-white py-3 rounded-top-4">
                            <h5 className="mb-0">
                                <i className="bi bi-ui-checks-grid me-2"></i> Total Visitors
                            </h5>
                        </div>

                        {/* Responsive Chart Container */}
                        <div
                            className="card p-3 m-5"
                            style={{ minHeight: "300px", maxHeight: "500px", overflowX: "auto" }}
                        >
                            {!loading && totalVisitorData.length > 0 ? (
                                <div style={{ height: "100%", width: "100%" }}>
                                    <Bar data={chartData} options={chartOptions} />
                                </div>
                            ) : (
                                <p className="text-center">{loading ? "Loading chart..." : "No data available"}</p>
                            )}
                        </div>

                        <div className="card-body p-4">
                            <DataTable
                                columns={columns}
                                data={totalVisitorData}
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

export default TotalVisitor;
