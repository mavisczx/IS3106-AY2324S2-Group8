import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ApiAuth from "../../helpers/ApiAuth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const credentials = { email, password };
      const token = await ApiAuth.authenticateStudent(credentials);
      localStorage.setItem("token", token); // Store the token in local storage
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white-100">
      <div className="max-w-lg p-10 border border-gray-300 rounded-lg bg-black shadow-lg">
        <div className="text-center">
          <div className="p-2.5 mt-1 flex items-center">
            <Icon
              icon="ic:baseline-people"
              className="text-xl rounded-md text-orange-500"
            />
            <h1 className="font-bold text-stone-200 text-3xl ml-3">
              ExchangeBuddy
            </h1>
          </div>
        </div>
        <h4 className="text-center mb-2 text-white">Login</h4>
        <form onSubmit={handleLogin} className="mb-6">
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full p-3 bg-orange-600 text-white rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-2 text-white">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-600 hover:text-orange-800"
          >
            Register here
          </Link>
          .
        </p>
        <p className="text-center mt-2 text-white">
          Login as admin instead?{" "}
          <Link
            to="/adminlogin"
            className="text-orange-600 hover:text-orange-800"
          >
            Login Here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
