import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FeatureGate = ({ children }) => {
  const { plan, status } = useSelector((state) => state.subscription || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-3">
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

  const hasAccess = plan === "pro plan" && status === "active";

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="border border-warning rounded p-3 my-3 bg-light">
      <p className="text-warning mb-2">🚫 You don't have access to this feature.</p>
      <p className="text-muted mb-3">
        This feature is part of the <strong>Pro</strong> subscription. Please upgrade to unlock it.
      </p>
      <Link to="/pricing" className="btn btn-sm btn-primary">
        View Plans & Upgrade
      </Link>
    </div>
  );
};

export default FeatureGate;