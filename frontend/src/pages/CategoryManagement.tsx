import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { Category } from "@/interfaces/interfaces";

const CategoryManagement = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const fetchCategories = useCallback(async () => {
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/api/v1/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, token]);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const categoryData = { name: categoryName };
      if (editingCategoryId) {
        await axios.put(`http://localhost:4000/api/v1/categories/${editingCategoryId}`, categoryData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("http://localhost:4000/api/v1/categories", categoryData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setCategoryName("");
      setEditingCategoryId(null);
      await fetchCategories(); 
    } catch (error) {
      console.error("Error creating/updating category", error);
      setError("Failed to create/update category");
    }
  };

  const handleEdit = (category: Category) => {
    setCategoryName(category.name);
    setEditingCategoryId(category.id);
  };

  const handleDelete = async (categoryId: number) => {
    if (!token) {
      setError("No authentication token found");
      alert("No authentication token found");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:4000/api/v1/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchCategories();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error deleting category", error);
      let errorMessage = "Failed to delete category";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || errorMessage;
      }
      alert(errorMessage); 
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
        <h1 className="text-3xl font-bold">Category Management</h1>
      </header>

      <main className="flex flex-col items-center py-20 px-4 bg-white min-h-screen">
        <form onSubmit={handleCreateOrUpdate} className="w-full max-w-2xl mb-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingCategoryId ? "Update Category" : "Create Category"}
          </button>
        </form>

        <h2 className="text-2xl mb-4">Existing Categories</h2>
        <ul className="w-full max-w-2xl">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center mb-4 p-4 border rounded">
              <span>{category.name}</span>
              <div>
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
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

export default CategoryManagement;
