import React from 'react';
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-700">Blogger</h1>

            <ul className="flex items-center gap-6 text-gray-700 font-medium">
                {user ? (
                    <>
                        <li>
                            <Link to="/home" className="hover:text-blue-500 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/blogs" className="hover:text-blue-500 transition-colors">
                                My Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/create" className="hover:text-blue-500 transition-colors">
                                Create Post
                            </Link>
                        </li>
                        <button
                            onClick={logout} 
                            className="bg-gradient-to-r from-red-400 to-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:shadow-lg transition">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="hover:text-blue-500 transition-colors">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-blue-500 transition-colors">
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
