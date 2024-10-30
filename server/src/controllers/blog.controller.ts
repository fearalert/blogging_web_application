import { Request, Response } from 'express';
import prisma from '../models/prismaClient';
import { Prisma } from '@prisma/client';

export const createBlogPost = async (req: Request, res: Response) => {
    const { title, content, categoryID, tags } = req.body;

    const authorID = req.body.userId;

     // Validate authorID
     if (!authorID) {
        return res.status(400).json({ error: 'Author ID is required.' });
    }

    try {
        const blogPost = await prisma.blogPost.create({
            data: {
                title,
                content,
                author: { connect: { id: authorID } },
                category: { connect: { id: categoryID } },
                tags: {
                    create: tags.map((tagId: number) => ({
                        tag: { connect: { id: tagId } },
                    })),
                },
            },
        });

        res.status(201).json(blogPost);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getBlogPosts = async (req: Request, res: Response) => {
    try {
        const blogPosts = await prisma.blogPost.findMany({
            include: {
                author: true,
                comments: true,
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        res.json(blogPosts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateBlogPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, categoryID, tags } = req.body;

    if (!categoryID) {
        return res.status(400).json({ error: 'Category is required' });
    }
    if (!tags || tags.length === 0) {
        return res.status(400).json({ error: 'At least one tag is required' });
    }

    const validTags = tags.filter((tagId: number | null) => tagId !== null && tagId !== undefined);

    try {
        const existingBlogPost = await prisma.blogPost.findUnique({
            where: { id: Number(id) },
        });

        if (!existingBlogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const blogPost = await prisma.blogPost.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
                category: { connect: { id: categoryID } },
                tags: {
                    deleteMany: {}, 
                    create: validTags.map((tagId: number) => ({
                        tag: { connect: { id: tagId } },
                    })),
                },
            },
        });

        res.json(blogPost);
    } catch (error) {
        console.error('Error updating blog post:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteBlogPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.$transaction(async (prisma) => {
            await prisma.comment.deleteMany({
                where: { postID: Number(id) },
            });

            await prisma.blogPost.delete({
                where: { id: Number(id) },
            });
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting blog post:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getBlogPostById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const blogPost = await prisma.blogPost.findUnique({
            where: { id: Number(id) },
            include: {
                author: {
                    select: {
                        email: true
                    }                        
                },
                comments: true,
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.json(blogPost);
    } catch (error) {
        console.error('Error fetching blog post by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};