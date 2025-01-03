import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { validateEmail, validatePassword } from "../utils/validation";
import TextField from "../components/TextField";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        email,
        password,
      });
      const { token } = response.data;
      login(response.data);
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
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <p className="text-center italic text-gray-600 mb-4">
            Welcome back to your creative haven—log in to share your stories, connect with fellow writers, and keep your inspiration alive!          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 p-8">
          <h2 className="text-center text-2xl font-semibold mb-6">Blog Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="flex flex-col" onSubmit={handleLogin}>
          <TextField type={"email"} placeholder={"Enter your email"} value={email} error={emailError} onChange={(e) => setEmail(e.target.value)} icon={<FaEnvelope/>}/>
          <TextField type={"password"} placeholder={"Enter your password"} value={password} error={passwordError} onChange={(e) => setPassword(e.target.value)} icon={<FaLock/>}/>
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
