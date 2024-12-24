import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const createTag = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const existingTag = await prisma.tag.findUnique({ where: { name } });
        if (existingTag) {
            return res.status(400).json({ error: 'Tag already exists.' });
        }

        const tag = await prisma.tag.create({ data: { name } });
        res.status(201).json(tag);
    } catch (error) {
        console.error('Error creating tag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await prisma.tag.findMany({ include: { posts: true } });
        res.json(tags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
      const updatedTag = await prisma.tag.update({
          where: { id: Number(id) },
          data: { name },
      });
      res.json(updatedTag);
  } catch (error) {
      console.error('Error updating tag:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
      await prisma.tag.delete({ where: { id: Number(id) } });
      res.status(204).send();
  } catch (error) {
      console.error('Error deleting tag:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
