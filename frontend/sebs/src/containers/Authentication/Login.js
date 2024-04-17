import React, { useState } from "react";
//import Api from "../../helpers/Api";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const credentials = { email, password };
      const token = await Api.login(credentials);
      localStorage.setItem("token", token); // Store the token in local storage
      // Redirect to the home page after successful login
      window.location.href = "/"; // Replace "/home" with your desired home route
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f9",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="Event Management System Logo"
            style={{ maxWidth: "40%", height: "auto" }}
          />
          <h2 style={{ marginTop: "0px" }}>
            <strong>Event Management System</strong>
          </h2>
        </div>
        <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Login</h4>
        <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ width: "100%", padding: "10px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ width: "100%", padding: "10px" }}
              required
            />
          </div>
          {error && (
            <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
