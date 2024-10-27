import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment.controller';

const router = Router();

router.post('/', createComment);
router.get('/:postId', getComments);

export default router;
