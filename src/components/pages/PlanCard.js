import React from "react";
import PropTypes from "prop-types";

const PlanCard = ({ plan, onUpgrade }) => {
  return (
    <div className="col-md-4 mb-4">
      <div
        className={`card h-100 shadow-lg border-0 rounded-4 ${
          plan.highlight ? "bg-light" : ""
        }`}
      >
        <div className="card-header bg-transparent text-center border-0 pt-4">
          <h4 className="fw-bold mb-0">{plan.name}</h4>
          {plan.highlight && (
            <span className="badge bg-primary mt-2">Most Popular</span>
          )}
        </div>
        <div className="card-body text-center">
          <h2 className="card-title fw-bold text-primary mb-4">{plan.price}</h2>
          <ul className="list-group list-group-flush mb-4">
            {plan.features.map((feature, idx) => (
              <li className="list-group-item" key={idx}>
                ✅ {feature}
              </li>
            ))}
          </ul>
          {plan.button && (
            <button
              className="btn btn-outline-primary px-4 py-2 rounded-pill"
              onClick={() => onUpgrade(plan.planKey)}
            >
              {plan.button}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  onUpgrade: PropTypes.func.isRequired,
};

export default PlanCard;
