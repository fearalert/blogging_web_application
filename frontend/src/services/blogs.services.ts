import axios from 'axios';
import { BlogPost, Comment } from '../interfaces/interfaces';

// const BASE_URL = 'http://localhost:4000/api/v1';
const BASE_URL = 'http://localhost:4000/api/v1';

export const getBlogPost = async (id: string): Promise<BlogPost> => {
    try {
        const response = await axios.get(`${BASE_URL}/blogs/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching blog post');
    }
};

export const addComment = async (blogId: string, userId: number, content: string): Promise<Comment> => {
    try {
        const response = await axios.post(`${BASE_URL}/blogs/${blogId}/comments`, {
            content,
            userId
        });
        return response.data;
    } catch (error) {
        throw new Error('Error adding comment');
    }
};

export const updateComment = async (commentId: number, content: string): Promise<Comment> => {
    try {
        const response = await axios.put(`${BASE_URL}/comments/${commentId}`, { content });
        return response.data;
    } catch (error) {
        throw new Error('Error updating comment');
    }
};

export const deleteComment = async (commentId: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/comments/${commentId}`);
    } catch (error) {
        throw new Error('Error deleting comment');
    }
};
