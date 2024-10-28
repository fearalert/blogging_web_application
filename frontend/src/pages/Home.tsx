import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BlogPost } from '../interfaces/interfaces';

const HomePage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-gray-800">
      <Navbar />

      <section className="flex flex-col items-center text-center py-20 px-4 bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Blogger</h2>
        <p className="text-gray-600 max-w-lg mb-6">
          Discover the latest blog posts, trends, and insights from diverse categories. Connect, read, and explore!
        </p>
        <button className="bg-gradient-to-r from-red-400 to-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:shadow-lg transition">
          Explore Blogs
        </button>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <h3 className="text-3xl font-semibold text-center mb-8 text-gray-800">Featured Blogs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/400")' }}></div>
              <div className="p-6">
                <h4 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title.slice(0,40)}...</h4>
                <p className="text-gray-600 mb-4">
                  {blog.content.slice(0, 100)}...
                </p>
                <div className="text-sm text-gray-500 mb-2">
                  <strong>Category:</strong> {blog.category.name}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  <strong>Tags:</strong> {blog.tags.map(tag => tag.tag.name).join(', ')}
                </div>
                <Link to={`/blog/${blog.id}`} className="text-blue-500 font-medium hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white py-6 text-center text-gray-600">
        <p>&copy; 2024 Blogger. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
