import { Request, Response } from 'express';
import prisma from '../models/prismaClient';
import { Prisma } from '@prisma/client';

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const existingCategory = await prisma.category.findUnique({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists.' });
        }

        const category = await prisma.category.create({ data: { name } });
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({ include: { posts: true } });
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await prisma.category.update({ where: { id: Number(id) }, data: { name } });
        res.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const associatedPosts = await prisma.blogPost.findMany({
            where: { categoryID: Number(id) },
        });

        if (associatedPosts.length > 0) {
            return res.status(400).json({ error: 'Cannot delete category with associated blog posts.' });
        }

        await prisma.category.delete({
            where: { id: Number(id) },
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting category:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};
