import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mockUser = {
    username: "admin@example.com",
    password: "admin",
  };

  //Handle login logic
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === mockUser.username && password === mockUser.password) {
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg_login.png)`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-gradient-to-br from-purple-800 to-purple-500 rounded-lg p-8 w-full max-w-md">
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
          <img
            src={`${process.env.PUBLIC_URL}/odisseia_novo.png`}
            alt="Logo"
            className="h-16 w-max"
          />
        </div>
        <h2 className="text-white text-2xl mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Username</label>
            <input
              title="Login"
              type="text"
              name="email"
              autoComplete="email-new"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent text-white"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent text-white"
              placeholder="Enter your password"
            />
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full bg-white text-purple-600 font-bold py-2 px-4 rounded-lg hover:bg-purple-500 hover:text-white transition"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
