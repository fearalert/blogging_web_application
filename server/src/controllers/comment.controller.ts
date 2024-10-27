import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const createComment = async (req: Request, res: Response) => {
  const { content, postID } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      postID,
      authorID: req.body.userId,
    },
  });
  res.status(201).json(comment);
};

export const getComments = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const comments = await prisma.comment.findMany({
    where: { postID: Number(postId) },
    include: { author: true },
  });
  res.json(comments);
};
