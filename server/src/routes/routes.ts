import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category.controller';
import { createTag, deleteTag, getTags, updateTag } from '../controllers/tag.controller';
import { createComment, deleteComment, getComments, updateComment } from '../controllers/comment.controller';
import { login, register } from '../controllers/auth.controller';
import { createBlogPost, deleteBlogPost, getBlogPostById, getBlogPosts, updateBlogPost } from '../controllers/blog.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// User Routes
router.post('/register', register as any);
router.post('/login', login as any);

// Category Routes
router.post('/categories', createCategory as any);
router.get('/categories', getCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

router.post('/tags', createTag as any);
router.get('/tags', getTags);
router.put('/tags/:id', updateTag);
router.delete('/tags/:id', deleteTag);

// Blog Post Routes
router.post('/blogs',authMiddleware as any, createBlogPost as any);
router.get('/blogs', getBlogPosts);
router.put('/blogs/:id', updateBlogPost as any);
router.delete('/blogs/:id', deleteBlogPost);
router.get('/blogs/:id', getBlogPostById as any);


// Comment Routes
router.post('/blogs/:postId/comments', createComment);
router.get('/blogs/:postId/comments', getComments);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);


export default router;
