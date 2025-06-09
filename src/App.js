import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import { getSubscriptionStatus } from "./services/subscriptionService";
import { setSubscription } from "./redux-store/slices/subscriptionSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLatestSubscription = async () => {
      try {
        const subscriptionData = await getSubscriptionStatus();
        dispatch(setSubscription(subscriptionData.subscription));
      } catch (err) {
        console.error("Failed to fetch updated subscription", err);
      }
    };

    fetchLatestSubscription();
  }, [dispatch]);
  return (
    <Router>
      <AppRouter />
      <ToastContainer />
    </Router>
  );
}

export default App;
