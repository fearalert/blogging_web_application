import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BlogPost, Category, Tag } from "../interfaces/interfaces";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useAuth();
  const [, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
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
        setSelectedCategory(fetchedBlog.category.id);
        setSelectedTags(fetchedBlog.tags.map((tag: { id: number }) => tag.id));
      } catch (error) {
        console.error("Error fetching blog", error);
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/categories');
        setCategories(response.data);
      } catch (err) {
        setError(String(err));
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/tags');
        setTags(response.data);
      } catch (err) {
        setError(String(err));
      }
    };

    fetchBlog();
    fetchCategories();
    fetchTags();
  }, [id, token, user, navigate]);

  const handleTagChange = (tagID: number) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagID) ? prevTags.filter((id) => id !== tagID) : [...prevTags, tagID]
    );
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("No authentication token found");
      return;
    }

    if (!selectedCategory) {
      alert("Please select a category before updating the post.");
      return;
    }
    if (selectedTags.length === 0) {
      alert("Please select at least one tag before updating the post.");
      return;
    }

    try {
      const updatedBlog = {
        title,
        content,
        categoryID: selectedCategory,
        tags: selectedTags,
      };

      await axios.put(`http://localhost:4000/api/v1/blogs/${id}`, updatedBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/blog/${id}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating blog:", error);

      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to update blog");
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Category:</label>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Tags:</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <label key={tag.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagChange(tag.id)}
                    className="mr-2"
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Post
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </main>
    </div>
  );
};

export default EditBlog;
