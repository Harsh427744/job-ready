import express from 'express';
import { createSubmission, getUserSubmissions, getUserStats } from '../controllers/submissionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createSubmission);
router.get('/', authenticateToken, getUserSubmissions);
router.get('/stats', authenticateToken, getUserStats);

export default router;
