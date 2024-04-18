import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import ApiAdmin from "../../helpers/ApiAdmin";
import createAdmin from "./createAdmin.jpg";
import { toast } from "react-toastify";

const CreateAdmin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const createAdminForm = useRef(null);

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      ApiAdmin.createAdmin(
        { username, email, password, contact, name },
        token
      ).then((response) => {
        if (response.ok) {
          toast.success("🎉 Admin created successfully!");
          createAdminForm.current.reset();
        } else {
          toast.error("❌ Error adding admin, account may already exist");
        }
      });
    } catch (error) {
      toast.error("Create admin failed:", error.message);
    }
  };

  return (
    <div
      className="flex h-screen -m-10 justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(
          rgba(255, 255, 255, 0.55),
          rgba(255, 255, 255, 0.55)), url(${createAdmin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md mx-auto p-6 bg-black bg-opacity-90 rounded-lg shadow-md">
        <div className="text-center">
          <div className="p-2 mb-2 flex items-center">
            <Icon
              icon="subway:admin-1"
              className="text-xl rounded-md text-orange-500"
            />
            <h1 className="font-bold text-stone-200 text-3xl ml-3">
              Create Admin
            </h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} ref={createAdminForm}>
          <div className="mb-4">
            <label
              className="block text-stone-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-stone-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-stone-300 text-sm font-bold mb-2"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contact"
              type="text"
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-stone-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-stone-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
