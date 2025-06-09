import React from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 rounded-4 text-center"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-4">
          <i
            className="bi bi-x-circle-fill text-danger"
            style={{ fontSize: "3rem" }}
          ></i>
          <h2 className="mt-3 text-danger">Subscription Canceled</h2>
        </div>

        <p className="mb-3">
          You canceled the subscription process. No changes have been made to
          your account.
        </p>

        <div className="d-grid gap-2">
          <button
            className="btn btn-warning"
            onClick={() => navigate("/pricing")}
          >
            Try Again
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCancel;
