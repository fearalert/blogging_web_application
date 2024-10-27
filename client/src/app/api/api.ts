/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/blog`);
  return response.data;
};

export const fetchPostById = async (id: string) => {
  const response = await axios.get(`${API_URL}/blog/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/category`);
  return response.data;
};

export const fetchTags = async () => {
  const response = await axios.get(`${API_URL}/tag`);
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const createComment = async (postId: string, data: any) => {
  const response = await axios.post(`${API_URL}/comment`, { ...data, postId });
  return response.data;
};

export const fetchCommentsForPost = async (postId: string) => {
  const response = await axios.get(`${API_URL}/comment/${postId}`);
  return response.data;
};
