import { useState } from 'react';
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-700">Blogger</h1>

            <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
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
                        <li 
                            onMouseEnter={() => setShowDropdown(true)} 
                            onMouseLeave={() => setShowDropdown(false)} 
                            className="relative">
                            <button className="hover:text-blue-500 transition-colors">
                                Categories & Tags
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 w-48 mt-0 bg-white border rounded shadow-md z-10">
                                    <Link to={`/categories`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Categories
                                    </Link>
                                    <Link to={`/tags`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Tags
                                    </Link>
                                </div>
                            )}
                        </li>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:shadow-lg transition">
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

            <div className="md:hidden flex items-center">
                <button onClick={toggleDrawer} className="text-gray-700 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {showDrawer && (
                <div className="absolute top-4 right-4 w-48 bg-white shadow-md rounded-md z-20">
                    <div className="py-2">
                        {user ? (
                            <>
                                <Link to="/home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Home
                                </Link>
                                <Link to="/blogs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    My Blogs
                                </Link>
                                <Link to="/create" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Create Post
                                </Link>
                                <Link to="/categories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Categories
                                </Link>
                                <Link to="/tags" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Tags
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Login
                                </Link>
                                <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
