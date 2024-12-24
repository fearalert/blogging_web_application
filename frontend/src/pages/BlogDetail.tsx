import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BlogPost, Comment } from '../interfaces/interfaces';
import { useAuth } from '../hooks/useAuth';

const BlogDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/blogs/${id}`);
                const blogPost: BlogPost = response.data;
                setBlog(blogPost);
                setComments(blogPost.comments);
            } catch (error) {
                console.error("Error fetching blog post", error);
                setError("Blog post not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPost();
    }, [id]);

    const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user) {
            alert("You must be logged in to leave a comment.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4000/api/v1/blogs/${id}/comments`, {
                content: newComment,
                userId: user.id,
            });
            setComments((prev) => [...prev, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment', error);
            alert("Error adding comment");
        }
    };

    const handleEditComment = (comment: Comment) => {
        setEditCommentId(comment.id);
        setEditCommentContent(comment.content);
    };

    const handleUpdateComment = async (event: React.FormEvent<HTMLFormElement>, commentId: number) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/comments/${commentId}`, {
                content: editCommentContent,
            });
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === commentId ? response.data : comment
                )
            );
            setEditCommentId(null);
            setEditCommentContent('');
        } catch (error) {
            console.error('Error updating comment', error);
            alert("Error updating comment");
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/comments/${commentId}`);
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment', error);
            alert("Error deleting comment");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
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

            <section className="flex flex-col items-center text-center py-20 px-8 bg-white">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h2>
                <div className="text-sm text-gray-500 mb-4">
                    <strong>Author:</strong> {blog.author.email} | 
                    <strong> Category:</strong> {blog.category.name} | 
                    <strong> Tags:</strong> {blog.tags.map(tag => tag.tag.name).join(', ')}
                </div>
                <div className="text-sm text-gray-500 mb-4">
                    <strong>Posted on:</strong> {new Date(blog.createdAt).toLocaleDateString()}
                </div>
                <p className="text-gray-600 max-w-6xl mb-6">{blog.content}</p>
                
                <form onSubmit={handleCommentSubmit} className="my-6">
                    <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Leave a comment"
                        required
                        className="border rounded p-2 w-full max-w-lg mb-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Submit
                    </button>
                </form>

                <div className="text-left max-w-2xl mx-auto mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Comments</h3>
                    {comments.length > 0 ? (
                        comments.map((comment: Comment) => (
                            <div key={comment.id} className="border-b border-gray-200 py-2">
                                <p className="text-blue-800 font-semibold"> Author ID: {comment.authorID}</p>
                                {editCommentId === comment.id ? (
                                    <form onSubmit={(e) => handleUpdateComment(e, comment.id)} className="mb-2">
                                        <textarea
                                            value={editCommentContent}
                                            onChange={(e) => setEditCommentContent(e.target.value)}
                                            required
                                            className="border rounded p-2 w-full max-w-lg mb-2"
                                        />
                                        <button type="submit" className="bg-green-500 text-white py-1 px-3 rounded">
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditCommentId(null)}
                                            className="bg-red-500 text-white py-1 px-3 rounded ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        <p className="text-gray-600">{comment.content}</p>
                                        <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                                        {comment.authorID === user?.id && (
                                            <div className="mt-2">
                                                <button onClick={() => handleEditComment(comment)} className="bg-yellow-500 text-white py-1 px-3 rounded mr-2">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteComment(comment.id)} className="bg-red-500 text-white py-1 px-3 rounded">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
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
