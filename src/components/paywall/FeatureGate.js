import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FeatureGate = ({ children }) => {
  const { plan, status } = useSelector((state) => state.subscription || {});
  const hasAccess = plan === "pro plan" && status === "active";

  if (hasAccess) {
    return children;
  }

  return (
    <div className="border border-warning rounded p-3 my-3 bg-light">
      <p className="text-warning mb-2">
        🚫 You don't have access to this feature.
      </p>
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
