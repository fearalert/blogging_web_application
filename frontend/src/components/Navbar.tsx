import React from 'react';
import { useAuth } from "../context/useAuth";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-700">Blogger</h1>

            <ul className="flex items-center gap-6 text-gray-700 font-medium">
                {user ? (
                    <>
                        <li>
                            <a href="/home" className="hover:text-blue-500 transition-colors">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/create" className="hover:text-blue-500 transition-colors">
                                Create Post
                            </a>
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
                            <a href="/login" className="hover:text-blue-500 transition-colors">
                                Login
                            </a>
                        </li>
                        <li>
                            <a href="/register" className="hover:text-blue-500 transition-colors">
                                Register
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
