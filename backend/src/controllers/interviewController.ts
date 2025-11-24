import { Request, Response } from 'express';
import Interview from '../models/interview';

export const createInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const hostId = (req as any).user.id;
    const { scheduledTime, duration, questionIds } = req.body;

    const interview = await Interview.create({
      hostId,
      scheduledTime,
      duration,
      questionIds: questionIds || []
    });

    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserInterviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const interviews = await Interview.find({
      $or: [{ hostId: userId }, { participantId: userId }]
    })
      .populate('questionIds', 'title difficulty')
      .sort({ scheduledTime: -1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
