import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { Tag } from "@/interfaces/interfaces";

const TagManagement = () => {
  const { token } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tagName, setTagName] = useState("");
  const [editingTagId, setEditingTagId] = useState<number | null>(null);

  const fetchTags = async () => {
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/api/v1/tags", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags", error);
      setError("Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  });

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const tagData = { name: tagName };
      if (editingTagId) {
        // Update tag
        await axios.put(`http://localhost:4000/api/v1/tags/${editingTagId}`, tagData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("http://localhost:4000/api/v1/tags", tagData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setTagName("");
      setEditingTagId(null);
      await fetchTags();
    } catch (error) {
      console.error("Error creating/updating tag", error);
      setError("Failed to create/update tag");
    }
  };

  const handleEdit = (tag: Tag) => {
    setTagName(tag.name);
    setEditingTagId(tag.id);
  };

  const handleDelete = async (tagId: number) => {
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/v1/tags/${tagId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchTags();
    } catch (error) {
      console.error("Error deleting tag", error);
      setError("Failed to delete tag");
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
        <h1 className="text-3xl font-bold">Tag Management</h1>
      </header>

      <main className="flex flex-col items-center py-20 px-4 bg-white min-h-screen">
        <form onSubmit={handleCreateOrUpdate} className="w-full max-w-2xl mb-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tag Name</label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingTagId ? "Update Tag" : "Create Tag"}
          </button>
        </form>

        <h2 className="text-2xl mb-4">Existing Tags</h2>
        <ul className="w-full max-w-2xl">
          {tags.map((tag) => (
            <li key={tag.id} className="flex justify-between items-center mb-4 p-4 border rounded">
              <span>{tag.name}</span>
              <div>
                <button
                  onClick={() => handleEdit(tag)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-white py-6 text-center text-gray-600">
        <p>&copy; 2024 Blogger. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TagManagement;
