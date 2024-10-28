import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BlogPost } from "../interfaces/interfaces";
import { useAuth } from "../context/useAuth"; 
import Navbar from "../components/Navbar";

const MyBlogs = () => {
  const { user, token } = useAuth(); 
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!token || !user) {
        setError("No authentication token or user found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/v1/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userBlogs = response.data.filter((blog: BlogPost) => blog.authorID === user.id);
        setBlogs(userBlogs);
      } catch (error) {
        console.error("Error fetching blogs", error);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token, user]); 

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error("Error deleting blog", error);
        setError("Failed to delete blog");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-gray-800">
      <Navbar />
      <header className="flex justify-center items-center text-center gap-4 shadow-md py-4 px-6">
        <h1 className="text-3xl font-bold">My Blogs</h1>
      </header>

      <main className="flex flex-col items-center py-20 px-4 bg-white min-h-screen">
        <section className="w-full max-w-4xl">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/400")' }}></div>
                  <div className="p-6">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h4>
                    <p className="text-gray-600 mb-4">{blog.content.slice(0, 100)}...</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Category:</strong> {blog.category.name}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Tags:</strong> {blog.tags.map(tag => tag.tag.name).join(', ')}
                    </div>
                    <Link to={`/blog/${blog.id}`} className="text-blue-500 font-medium hover:underline">Read More</Link>
                    <div className="flex justify-between mt-4">
                      <Link to={`/edit/${blog.id}`} className="text-blue-500 hover:underline">Edit</Link>
                      <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center text-center my-8">
                 <p className="text-gray-600">No blogs found. </p>
                 <Link to={`/create`} className="text-blue-500 font-medium ">Create a new blog</Link>
            </div>
           
          )}
        </section>
      </main>

      <footer className="bg-white py-6 text-center text-gray-600">
        <p>&copy; 2024 Blogger. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MyBlogs;
