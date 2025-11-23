import { Request, Response } from 'express';
import Submission from '../models/Submission';

export const createSubmission = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { questionId, code, language } = req.body;

    const submission = await Submission.create({
      userId,
      questionId,
      code,
      language,
      status: 'attempted'
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserSubmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const submissions = await Submission.find({ userId })
      .populate('questionId', 'title difficulty')
      .sort({ submittedAt: -1 })
      .limit(50);

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const submissions = await Submission.find({ userId }).populate('questionId');
    
    const uniqueQuestions = new Set(submissions.map(s => s.questionId._id.toString()));
    const solvedQuestions = submissions.filter(s => s.status === 'solved').length;
    
    const categoryStats: any = {};
    submissions.forEach(sub => {
      const question = sub.questionId as any;
      question.category.forEach((cat: string) => {
        if (!categoryStats[cat]) categoryStats[cat] = { attempted: 0, solved: 0 };
        categoryStats[cat].attempted++;
        if (sub.status === 'solved') categoryStats[cat].solved++;
      });
    });

    res.json({
      attemptedQuestions: uniqueQuestions.size,
      solvedQuestions,
      categoryStats,
      recentSubmissions: submissions.slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
