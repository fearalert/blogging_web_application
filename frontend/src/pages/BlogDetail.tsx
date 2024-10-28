import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BlogPost } from '../interfaces/interfaces';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/blogs');
        const blogs: BlogPost[] = response.data;

        // Filter for the specific blog post by ID
        const foundBlog = blogs.find((post) => post.id === Number(id));
        setBlog(foundBlog || null);
      } catch (error) {
        console.error("Error fetching blog posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog post not found.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-gray-800">
      <header className="bg-white shadow-md py-4 px-6">
        <Link to="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
      </header>

      <section className="flex flex-col items-center text-center py-20 px-4 bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h2>
        <div className="text-sm text-gray-500 mb-4">
          <strong>Author:</strong> {blog.author.email} | <strong>Category:</strong> {blog.category.name} | 
          <strong>Tags:</strong> {blog.tags.map(tag => tag.tag.name).join(', ')}
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <strong>Posted on:</strong> {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <p className="text-gray-600 max-w-2xl mb-6">{blog.content}</p>
        
        <img src="https://via.placeholder.com/800x400" alt="Blog Post" className="rounded-lg shadow-lg mb-6" />

        <div className="text-left max-w-2xl mx-auto mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Comments</h3>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 py-2">
                <p className="text-gray-800"><strong>Author ID:</strong> {comment.authorID}</p>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </div>
      </section>

      <footer className="bg-white py-6 text-center text-gray-600">
        <p>&copy; 2024 Blogger. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BlogDetailPage;
