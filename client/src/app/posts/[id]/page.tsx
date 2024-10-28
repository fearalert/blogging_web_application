"use client";

import { useEffect, useState } from "react";
import { getBlogPosts } from "@/app/api/api"; 
import { BlogPost } from "@/app/page";
import Link from "next/link";

const BlogPostPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      } catch (err) {
        console.error("Error unwrapping params:", err);
      }
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const posts = await getBlogPosts();
        const selectedPost = posts.find((p) => String(p.id) === id);
        
        console.log("Fetched posts:", posts);
        console.log("Selected post:", selectedPost);
        
        setPost(selectedPost || null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post.");
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="container min-h-screen mx-auto p-4">
      <Link href="/" className="flex items-center space-x-4 my-4 text-blue-500 hover:text-blue-700 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Go Back</span>
        </Link>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-600 mb-4 border-border border-b">
        <p className="mr-4">By: {post.author.email}</p>
        <p className="mr-4">Category: {post.category.name}</p>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <br />
      <div className="mb-6 border border-border rounded-md shadow-sm p-4">
      <p className="text-lg">{post.content}</p>
    </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-300 pb-4 mb-4">
              <p className="text-gray-800 font-medium">{comment.content}</p>
              <p className="text-sm text-gray-600">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
