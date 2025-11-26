import express from 'express';
import { createSubmission, getUserSubmissions, getSubmissionStats } from '../controllers/submissionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createSubmission);
router.get('/', authenticateToken, getUserSubmissions);
router.get('/stats', authenticateToken,getSubmissionStats);

export default router;
