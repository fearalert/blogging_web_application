import { Link } from "react-router-dom";

const RegisterPage = () => {
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
          <form className="flex flex-col">
            <label className="relative mb-4">
              <span className="absolute left-3 top-2 text-gray-500"><i className="fas fa-envelope"></i></span>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="relative mb-4">
              <span className="absolute left-3 top-2 text-gray-500"><i className="fas fa-lock"></i></span>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
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
