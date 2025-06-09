import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const subscription = useSelector((state) => state.subscription);
  const { plan, status, startDate, endDate } = subscription || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple delay of 1 second to simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-label="Loading"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 rounded-4 text-center"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-4">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "3rem" }}
          ></i>
          <h2 className="mt-3">Subscription Successful!</h2>
        </div>

        <div className="mb-3">
          <p className="mb-1">
            <strong>Plan:</strong>{" "}
            <span className="text-capitalize">{plan}</span>
          </p>
          <p className="mb-1">
            <strong>Status:</strong> {status}
          </p>
          {startDate && (
            <p className="mb-1">
              <strong>Start:</strong> {new Date(startDate).toLocaleDateString()}
            </p>
          )}
          {endDate && (
            <p className="mb-3">
              <strong>Ends:</strong> {new Date(endDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/adminDashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;