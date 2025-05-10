import axios from "axios";
import React, { useState } from "react";
import { base_urlLink } from "../helper/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const validate = (field, value) => {
    switch (field) {
      case "username":
        if (!value.trim()) return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      if (name === "username") setUsername(value);
      if (name === "password") setPassword(value);

      const errorMsg = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid =
    !errors.username && !errors.password && username && password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: username || "",
      password: password || "",
    };
    console.log(payload);

    try {
      const response = await axios.post(
        `${base_urlLink}/auth/api/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.token) {
        toast.success("Login successful!");
        console.log("Login successful:", response.data);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate("/");
      } else {
        toast.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error.message || "An error occurred";
      toast.error(`Login failed: ${errorMessage}`);
      console.error("Login failed:", errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login functionality will go here.");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit} noValidate>
                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className={`form-control ${errors.username ? "is-invalid" : ""
                      }`}
                    value={username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""
                        }`}
                      value={password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                {/* Remember Me */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={!isFormValid}
                >
                  Login
                </button>
                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <a className="" style={{color:'red'}} href="/register">Register</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
