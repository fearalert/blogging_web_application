import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateEmail, validatePassword } from "../utils/validation";
import TextField from "../components/TextField";
import { FaEnvelope, FaLock } from "react-icons/fa";

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
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <p className="text-center text-gray-600 mb-4">
            Join our vibrant blogging community today—create an account to share your ideas, engage with readers, and make your voice heard across the world!          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 p-8">
          <h2 className="text-center text-2xl font-semibold mb-6">Blog Register</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="flex flex-col" onSubmit={handleRegister}>
            <TextField type={"email"} placeholder={"Enter your email"} value={email} error={emailError} onChange={(e) => setEmail(e.target.value)} icon={<FaEnvelope/>}/>
            <TextField type={"password"} placeholder={"Enter your password"} value={password} error={passwordError} onChange={(e) => setPassword(e.target.value)} icon={<FaLock/>}/>
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
