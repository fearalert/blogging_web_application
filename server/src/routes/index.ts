import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category.controller';
import { createTag, deleteTag, getTags, updateTag } from '../controllers/tag.controller';
import { createBlogPost, getBlogPosts, updateBlogPost, deleteBlogPost } from '../controllers/blog.controller';
import { createComment, deleteComment, getComments, updateComment } from '../controllers/comment.controller';
import { login, register } from '../controllers/auth.controller';

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
router.post('/posts', createBlogPost as any);
router.get('/posts', getBlogPosts);
router.put('/posts/:id', updateBlogPost);
router.delete('/posts/:id', deleteBlogPost);

// Comment Routes
router.post('/comments', createComment);
router.get('/comments/:postId', getComments);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);


export default router;
