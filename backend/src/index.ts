import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Import routes (we'll create these next)
import authRoutes from './routes/auth';
import questionRoutes from './routes/questions';
import submissionRoutes from './routes/submissions';
import interviewRoutes from './routes/interviews';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Interview Prep API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/interviews', interviewRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
