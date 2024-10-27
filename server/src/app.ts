import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';
import categoryRoutes from './routes/category.routes';
import commentRoutes from './routes/comment.routes';
import tagRoutes from './routes/tag.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/tag', tagRoutes);

export default app;
