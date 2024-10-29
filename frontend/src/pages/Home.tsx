import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BlogPost, Tag, Category } from '../interfaces/interfaces';

const HomePage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsResponse, tagsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:4000/api/v1/blogs'),
          axios.get('http://localhost:4000/api/v1/tags'),
          axios.get('http://localhost:4000/api/v1/categories'),
        ]);

        setBlogs(blogsResponse.data);
        setFilteredBlogs(blogsResponse.data);
        setTags(tagsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (selectedTag) {
      filtered = filtered.filter(blog => blog.tags.some(tag => tag.tag.name === selectedTag));
    }

    if (selectedCategory) {
      filtered = filtered.filter(blog => blog.category.name === selectedCategory);
    }

    setFilteredBlogs(filtered);
  }, [selectedTag, selectedCategory, blogs]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-gray-800">
      <Navbar />

      <section className="flex flex-col items-center text-center py-20 px-4 bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Blogger</h2>
        <p className="text-gray-600 max-w-lg mb-6">
          Discover the latest blog posts, trends, and insights from diverse categories. Connect, read, and explore!
        </p>
        <Link to="/create" className="bg-gradient-to-r from-red-400 to-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:shadow-lg transition">
          Create a Blog Post
        </Link>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <h3 className="text-3xl font-semibold text-center mb-8 text-gray-800">Featured Blogs</h3>

        <div className="flex justify-center gap-4 mb-6">
          <select 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            value={selectedCategory || ""}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Filter by Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>

          <select 
            onChange={(e) => setSelectedTag(e.target.value)} 
            value={selectedTag || ""}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Filter by Tag</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
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
