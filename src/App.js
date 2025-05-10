import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  return (
    <Router>
      <AppRouter />
      <ToastContainer />
    </Router>
  );
}

export default App;
