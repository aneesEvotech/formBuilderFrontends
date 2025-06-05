import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PlanCard from "./PlanCard";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createCheckoutSession,
  getplans,
} from "../../services/subscriptionService";
// import { createCheckoutSession, getplans } from "../../services/subscriptionService";

const PricingPlans = () => {
  const token = useSelector((state) => state.auth.token);
  const [plans, setPlans] = useState([]);

  // Format price with currency
  const formatPrice = (amount, currency, interval) =>
    `${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)} / ${interval}`;


  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await getplans();
      console.log("response" , res)
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
          price: formatPrice(p.amount, p.currency, p.interval) || "$9 /Mon",
          planKey: p.nickname?.toLowerCase() || "pro",
          features: ["All"],
          button: `Upgrade to ${p.nickname}`,
          highlight: p.nickname?.toLowerCase() === "pro",
        })),
      ];
      setPlans(planList);
    } catch (err) {
      console.error("Error loading pricing:", err);
      toast.error("Failed to load plans. Please try again later.");
    }
  };

  // Handle upgrade action
  const handleUpgrade = async (planKey) => {
    try {
      const response = await createCheckoutSession({ plan: planKey });
      window.location.href = response.url;

      toast.info(`You clicked upgrade for plan: ${planKey}`);
    } catch (err) {
      console.error("Upgrade failed:", err);
      toast.error("Checkout failed. Try again.");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold display-5">Our Pricing Plans</h1>
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
