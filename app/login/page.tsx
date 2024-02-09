"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token",data?.token);
        router.push("/admin");
      } else {
        toast.error("Invalid credentials")
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full mx-5 p-6 space-y-6 bg-indigo-200 shadow-md rounded-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Admin Login
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full p-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring focus:border-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
