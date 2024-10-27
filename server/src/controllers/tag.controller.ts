import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  const tag = await prisma.tag.create({
    data: { name },
  });
  res.status(201).json(tag);
};

export const getTags = async (req: Request, res: Response) => {
  const tags = await prisma.tag.findMany({
    include: { posts: true },
  });
  res.json(tags);
};
