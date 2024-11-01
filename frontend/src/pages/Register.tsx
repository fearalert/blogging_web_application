import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateEmail, validatePassword } from "../utils/validation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/register", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
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
          <h2 className="text-center text-2xl font-semibold mb-6">Blog Register</h2>
          {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}
          <form className="flex flex-col" onSubmit={handleRegister}>
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
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
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
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </label>
            <button className="w-full py-2 bg-gradient-to-r from-red-400 to-blue-500 text-white font-semibold rounded-md hover:shadow-lg transition">
              Register
            </button>
            <div className="text-center mt-4">
              Already a Member? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
