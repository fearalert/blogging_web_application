import { Router } from 'express';
import {  createBlogPost, deleteBlogPost, getBlogPosts, updateBlogPost } from '../controllers/blog.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/',authMiddleware as any, createBlogPost as any);
router.get('/', getBlogPosts);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;
