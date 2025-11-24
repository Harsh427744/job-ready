import express from 'express';
import { getQuestions, getQuestionById, createQuestion } from '../controllers/questionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getQuestions);
router.get('/:id', authenticateToken, getQuestionById);
router.post('/', authenticateToken, createQuestion);

export default router;
