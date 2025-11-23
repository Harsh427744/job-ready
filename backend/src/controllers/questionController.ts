import { Request, Response } from 'express';
import Question from '../models/Question';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { difficulty, category, company, search, page = 1, limit = 20 } = req.query;
    
    const query: any = {};
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    if (company) query.companyTags = company;
    if (search) query.title = { $regex: search, $options: 'i' };

    const questions = await Question.find(query)
      .select('-solution')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Question.countDocuments(query);

    res.json({
      questions,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getQuestionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
