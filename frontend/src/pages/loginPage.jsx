import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        // console.log(res)
        toast.success(res.data.message)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.name));
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.message)
        // console.log(err.response.data)
      });
  };

  return (
    <div className="flex w-full h-full items-center justify-center bg-gray-50 px-4 font-sans ">
      <div className="w-full max-w-lg bg-white p-12 shadow-sm rounded-md">
        {/* Logo Placeholder */}
        <svg
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <rect
            width="3"
            height="7"
            x="4"
            y="13"
            rx="1.5"
            className="fill-blue-500 opacity-60"
          />
          <rect
            width="3"
            height="10"
            x="9"
            y="10"
            rx="1.5"
            className="fill-blue-500"
          />
          <rect
            width="3"
            height="6"
            x="14"
            y="14"
            rx="1.5"
            className="fill-blue-500"
          />
          <path d="M21 4 L23 7 L21 10 L19 7 Z" className="fill-cyan-400" />
          <circle cx="21" cy="7" r="1" fill="#ffffff" />
        </svg>

        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Smart Expenses Tracker
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Login to track your expenses
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer Section */}
        <p className="mt-10 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
