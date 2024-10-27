"use client";

import { useEffect, useState } from "react";
import { getBlogPosts } from "@/app/api/api";
import Link from "next/link";

interface Author {
  id: number;
  email: string;
  password: string;
}

interface Category {
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

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  authorID: number;
  createdAt: string;
  author: Author;
  categoryID: number;
  category: Category;
  comments: Comment[];
  tags?: Array<{ blogPostID: number; tagID: number; tag: { id: number; name: string } }>;
}

const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts.");
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {blogPosts.map((post) => (
          <li key={post.id} className="border-b pb-2">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p>{post.content.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
