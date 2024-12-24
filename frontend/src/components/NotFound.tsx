import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2">Oops! The page you are looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="mt-4 text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md hover:shadow-lg transition">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
