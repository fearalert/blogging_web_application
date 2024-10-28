import { useEffect, useState } from 'react';
import axios from 'axios';

interface Tag {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  content: string;
  postID: number;
  authorID: number;
  createdAt: string;
}

interface Author {
  id: number;
  email: string;
}

interface Category {
  id: number;
  name: string;
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
  category: Category;
  tags: { blogPostID: number; tagID: number; tag: Tag }[];
}

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/v1/blog/');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Recent Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="mb-4 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
            <p className="text-sm text-gray-500">
              By {blog.author.email} | {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2">
              <h3 className="font-medium">Comments:</h3>
              {blog.comments.length > 0 ? (
                blog.comments.map((comment) => (
                  <div key={comment.id} className="border-t pt-2">
                    <p>{comment.content}</p>
                    <p className="text-xs text-gray-400">
                      Commented on {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
            <div className="mt-2">
              <h3 className="font-medium">Tags:</h3>
              {blog.tags.map((tag) => (
                <span key={tag.tagID} className="mr-2 bg-blue-200 text-blue-800 rounded px-2 py-1 text-xs">
                  {tag.tag.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
