import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PlanCard from "./PlanCard";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createCheckoutSession,
  getplans,
} from "../../services/subscriptionService";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
  const subscription = useSelector((state) => state.subscription);
  const { plan, status } = subscription || {};
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await getplans();
      const planList = [
        {
          name: "Freemium",
          price: "Free",
          planKey: "freemium",
          features: ["Profile", "Dashboard"],
          button: null,
          highlight: false,
        },
        ...res.map((p) => ({
          name: p.nickname || p.product,
          price: formatPrice(p.amount, p.currency, p.interval),
          planKey: p.nickname?.toLowerCase() || "pro plan",
          features: ["All"],
          button: `Upgrade to ${p.nickname}`,
          highlight: p.nickname?.toLowerCase() === "pro plan",
        })),
      ];
      setPlans(planList);
    } catch (err) {
      console.error("Error loading pricing:", err);
      toast.error("Failed to load plans. Please try again later.");
    }
  };

  const formatPrice = (amount, currency, interval) =>
    `${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)} / ${interval}`;

  const handleUpgrade = async (planKey) => {
    try {
      const response = await createCheckoutSession({ plan: planKey });
      window.location.href = response.url;
    } catch (err) {
      console.error("Upgrade failed:", err);
      toast.error("Checkout failed. Try again.");
    }
  };
  if (plan?.toLowerCase() === "pro plan" && status === "active") {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-success mb-3">You're Already on the Pro Plan!</h2>
        <p className="text-muted">Enjoy all the premium features 🎉</p>
        <div className="mt-4 d-flex justify-content-center gap-3">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go to Dashboard
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold display-5">Our Pricing Plans</h1>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>

      <div className="row g-4 justify-content-center">
        {plans.map((plan, idx) => (
          <PlanCard key={idx} plan={plan} onUpgrade={handleUpgrade} />
        ))}
      </div>

      <p className="text-center text-muted mt-5">
        Upgrade anytime. No hidden fees. Cancel easily.
      </p>
    </div>
  );
};

export default PricingPlans;