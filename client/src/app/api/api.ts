import axios from 'axios';

export const API_URL = 'http://localhost:4000/api/v1';

interface UserProps {
  email: string;
  password: string;
}

interface RegisterResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}


// Define interfaces for blog post
interface BlogPostProps {
  title: string;
  content: string;
  categoryID: number;
  tags: number[];
}

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

interface BlogPostResponse {
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

export const createBlogPost = async (data: BlogPostProps): Promise<BlogPostResponse> => {
  try {
    const response = await axios.post(`${API_URL}/blog-posts`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Creating blog post failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Creating blog post failed');
    }
    throw new Error('Creating blog post failed');
  }
};

export const getBlogPosts = async (): Promise<BlogPostResponse[]> => {
  try {
    const response = await axios.get(`${API_URL}/blog/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Fetching blog posts failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Fetching blog posts failed');
    }
    throw new Error('Fetching blog posts failed');
  }
};

export const updateBlogPost = async (id: number, data: BlogPostProps): Promise<BlogPostResponse> => {
  try {
    const response = await axios.put(`${API_URL}/blog/posts/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Updating blog post failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Updating blog post failed');
    }
    throw new Error('Updating blog post failed');
  }
};

export const deleteBlogPost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/blog-posts/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Deleting blog post failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Deleting blog post failed');
    }
    throw new Error('Deleting blog post failed');
  }
};

export const registerUser = async (data: UserProps): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
};

export const loginUser = async (data: UserProps): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || 'Login failed');
    }
    throw new Error('Login failed');
  }
};