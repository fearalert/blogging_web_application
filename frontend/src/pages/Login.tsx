import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex w-full max-w-4xl items-center justify-between bg-white shadow-lg rounded-lg p-8">
        <div className="hidden md:flex flex-col items-center justify-center w-1/2">
          <h2 className="text-2xl font-bold mb-4">Lorem Ipsum</h2>
          <p className="text-center text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 p-8">
          <h2 className="text-center text-2xl font-semibold mb-6">Blog Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="flex flex-col" onSubmit={handleLogin}>
            <label className="relative mb-4">
              <span className="absolute left-3 top-2 text-gray-500"><i className="fas fa-envelope"></i></span>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="relative mb-4">
              <span className="absolute left-3 top-2 text-gray-500"><i className="fas fa-lock"></i></span>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-gray-500">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-blue-500 hover:underline text-sm">Forgot Password?</a>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-red-400 to-blue-500 text-white font-semibold rounded-md hover:shadow-lg transition">
              Login
            </button>
            <div className="text-center mt-4">
              Not a member? <Link to="/register" className="text-blue-500 hover:underline">Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
