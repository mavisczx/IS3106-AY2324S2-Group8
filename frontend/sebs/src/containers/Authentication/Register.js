import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ApiStudent from "../../helpers/ApiStudent"; // Assuming this is the correct API
import { Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import buddyImage from "./buddy.jpg";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await ApiStudent.createStudent(formData);
      window.location.href = "/login";
      // toast.success("Registration successful. Please log in.", {
      //   theme: "dark",
      // });
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required.");
      return false;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div
      className="flex justify-center items-center h-screen -m-10"
      style={{
        backgroundImage: `url(${buddyImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-xl p-12 rounded-lg bg-black bg-opacity-80 shadow-lg">
        <div className="text-center">
          <div className="p-2.5 mt-1 flex items-center justify-center">
            <Icon
              icon="ic:baseline-school"
              className="text-xl rounded-md text-orange-500"
            />
            <h1 className="font-bold text-stone-200 text-3xl ml-3">
              ExchangeBuddy
            </h1>
          </div>
        </div>
        <h1 className="text-center font-bold mb-2 text-white">Register</h1>
        <form onSubmit={handleRegister} className="mb-6">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <PasswordStrengthBar password={formData.password} />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full p-3 bg-orange-600 text-white rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-2 text-white">
          Already have an account?
          <Link to="/login" className="text-orange-600 hover:text-orange-800">
            {" "}
            Login here{" "}
          </Link>
          .
        </p>
        <p className="text-center mt-2 text-white">
          Admin account?
          <Link
            to="/adminlogin"
            className="text-orange-600 hover:text-orange-800"
          >
            {" "}
            Login here{" "}
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
