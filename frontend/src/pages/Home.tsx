import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MessageCircle, Tag as TagIcon } from 'lucide-react';

interface Tag {
  id: number;
  name: string;
}

interface Author {
  id: number;
  email: string;
}

interface Comment {
  id: number;
  content: string;
  postID: number;
  authorID: number;
  createdAt: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  authorID: number;
  createdAt: string;
  categoryID: number;
  author: Author;
  comments: Comment[];
  category: {
    id: number;
    name: string;
  };
  tags: {
    blogPostID: number;
    tagID: number;
    tag: Tag;
  }[];
}

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/blog/');
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          console.error('Unexpected data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800">My Blog</h1>
          <p className="mt-2 text-gray-600">Welcome to my corner of the internet</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white p-8 rounded-lg shadow">
                <p className="text-center text-gray-600">Loading blogs...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {blogs.map((blog) => (
                  <article key={blog.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h2>
                      
                      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle size={16} className="mr-2" />
                          {blog.comments.length} comments
                        </div>
                      </div>

                      <div className="mt-4 text-gray-600 leading-relaxed">
                        {blog.content}
                      </div>

                      <div className="mt-6 flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <TagIcon size={16} className="mr-2" />
                          {blog.category.name}
                        </div>
                        <span className="text-gray-300">|</span>
                        <div className="text-sm text-gray-500">
                          By <span className="text-blue-600">{blog.author.email}</span>
                        </div>
                      </div>

                      {/* Comments Section */}
                      <div className="mt-8 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
                        {blog.comments.length > 0 ? (
                          blog.comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-700">{comment.content}</p>
                              <p className="mt-2 text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* About Widget */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600">Welcome to my blog where I share my thoughts and experiences.</p>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
              <div className="space-y-2">
                {Array.from(new Set(blogs.map(blog => blog.category.name))).map((category) => (
                  <div key={category} className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
                    <TagIcon size={16} className="mr-2" />
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;