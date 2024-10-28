import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import { Category, Tag, CreateBlogPostResponse } from '../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CreateBlogPostPage = () => {
    const { token, user } = useAuth();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchCategories();
        fetchTags();
    }, []);

    const handleTagChange = (tagID: number) => {
        setSelectedTags((prevTags) => 
            prevTags.includes(tagID) ? prevTags.filter(id => id !== tagID) : [...prevTags, tagID]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) {
            setError('Please select a category');
            return;
        }
        if (selectedTags.length === 0) {
            setError('Please select at least one tag');
            return;
        }

        try {
            const response = await axios.post<CreateBlogPostResponse>(
                'http://localhost:4000/api/v1/blogs',
                {
                    title,
                    content,
                    authorID: user?.id,
                    categoryID: selectedCategory,
                    tags: selectedTags,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);
            navigate('/home');
        } catch (err) {
            setError(String(err));
        }
    };

    return (
      <>
        <Navbar />
        <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                <div className="flex flex-col w-full">
                    <h2 className="text-center text-2xl font-semibold mb-6">Create New Blog Post</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </label>
                        <label className="relative mb-4">
                            <textarea
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                                rows={6}
                                required
                            />
                        </label>
                        <label className="relative mb-4">
                            <select
                                value={selectedCategory || ''}
                                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="relative mb-4">
                            <span className="mb-2 text-gray-700">Select Tags:</span>
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
                        </label>
                        <button className="w-full py-2 bg-gradient-to-r from-red-400 to-blue-500 text-white font-semibold rounded-md hover:shadow-lg transition">
                            Create Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default CreateBlogPostPage;
