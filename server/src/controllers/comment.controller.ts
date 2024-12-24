import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const createComment = async (req: Request, res: Response) => {
    const { content } = req.body;
    const postID = Number(req.params.postId);

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                postID,
                authorID: req.body.userId,
            },
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getComments = async (req: Request, res: Response) => {
    const { postId } = req.params;

    try {
        const comments = await prisma.comment.findMany({
            where: { postID: Number(postId) },
            include: { 
                author: true
            },
        });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const updatedComment = await prisma.comment.update({
            where: { id: Number(id) },
            data: { content },
        });
        res.json(updatedComment);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.comment.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
