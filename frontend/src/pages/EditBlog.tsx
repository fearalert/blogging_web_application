import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BlogPost } from "../interfaces/interfaces";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/Navbar";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useAuth();
  const [, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryID, setCategoryID] = useState<number | string>("");
  const [tags, setTags] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!token || !user) {
        setError("No authentication token or user found");
        navigate("/blogs");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/v1/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedBlog = response.data;

        if (fetchedBlog.authorID !== user.id) {
          setError("You are not authorized to edit this blog.");
          navigate("/blogs");
          return;
        }

        setBlog(fetchedBlog);
        setTitle(fetchedBlog.title);
        setContent(fetchedBlog.content);
        setCategoryID(fetchedBlog.category.id);
        setTags(fetchedBlog.tags.map((tag: { id: number }) => tag.id));
      } catch (error) {
        console.error("Error fetching blog", error);
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, token, user, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const updatedBlog = {
        title,
        content,
        categoryID,
        tags,
      };

      await axios.put(`http://localhost:4000/api/v1/blogs/${id}`, updatedBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog", error);
      setError("Failed to update blog");
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
        <h1 className="text-3xl font-bold">Edit Blog</h1>
      </header>

      <main className="flex flex-col items-center py-20 px-4 bg-white min-h-screen">
        <form onSubmit={handleUpdate} className="w-full max-w-2xl">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              rows={6}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category ID</label>
            <input
              type="number"
              value={categoryID}
              onChange={(e) => setCategoryID(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tags (comma-separated IDs)</label>
            <input
              type="text"
              value={tags.join(",")}
              onChange={(e) => setTags(e.target.value.split(",").map((tag) => Number(tag.trim())))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Blog
          </button>
        </form>
      </main>

      <footer className="bg-white py-6 text-center text-gray-600">
        <p>&copy; 2024 Blogger. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EditBlog;
