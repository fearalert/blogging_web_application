export interface User {
    id: number;
    email: string;
}

export interface RegistrationResponse {
    user: User;
    token: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

// interfaces/Tag.ts
export interface Tag {
    id: number;
    name: string;
}

// interfaces/Comment.ts
export interface Comment {
    author: {
        email: string
    };
    id: number;
    content: string;
    postID: number;
    authorID: number;
    createdAt: string;
}

// interfaces/Author.ts
export interface Author {
    id: number;
    email: string;
    password?: string; // Optionally include password if needed
}

// interfaces/Category.ts
export interface Category {
    id: number;
    name: string;
}

export interface BlogPost {
    id: number;
    title: string;
    content: string;
    authorID: number;
    createdAt: string;
    categoryID: number;
    author: Author;
    comments: Comment[];
    category: Category;
    tags: {
        blogPostID: number;
        tagID: number;
        tag: Tag;
    }[];
}

// interfaces/GetBlogPostsResponse.ts
export type GetBlogPostsResponse = BlogPost[];

// interfaces/Post.ts
export interface Post {
    id: number;
    title: string;
    content: string;
    authorID: number;
    createdAt: string;
    categoryID: number;
}

export interface Category {
    id: number;
    name: string;
    posts: Post[];
}

// interfaces/GetCategoriesResponse.ts
export type GetCategoriesResponse = Category[];

export interface CreateBlogPostResponse {
    id: number;
    title: string;
    content: string;
    authorID: number;
    createdAt: string;
    categoryID: number;
}

