import express from 'express';
import { createInterview, getUserInterviews } from '../controllers/interviewController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createInterview);
router.get('/', authenticateToken, getUserInterviews);

export default router;
