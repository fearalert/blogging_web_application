import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const createBlogPost = async (req: Request, res: Response) => {
    const { title, content, categoryID, tags } = req.body;

    try {
        const existingTags = await prisma.tag.findMany({ where: { id: { in: tags } } });
        if (existingTags.length !== tags.length) {
            return res.status(400).json({ error: 'One or more tags do not exist.' });
        }

        const blogPost = await prisma.blogPost.create({
            data: {
                title,
                content,
                authorID: req.body.userId,
                categoryID,
                tags: {
                    create: existingTags.map(tag => ({ tag: { connect: { id: tag.id } } })),
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

    try {
        const blogPost = await prisma.blogPost.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
                categoryID,
                tags: {
                    set: tags.map((tagId: number) => ({ tagID: tagId })),
                },
            },
        });
        res.json(blogPost);
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.blogPost.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
