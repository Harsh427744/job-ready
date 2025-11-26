import { Request, Response } from 'express';
import Submission from '../models/submission';
import Question from '../models/Question';
import User from '../models/user';
import { XP_VALUES, calculateLevel, checkAchievements } from '../utils/xpSystem';

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { questionId, code, language } = req.body;
    const userId = (req as any).user.id;

    // Validate question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if already solved
    const existingSubmission = await Submission.findOne({
      userId,
      questionId,
      status: 'solved',
    });

    const isFirstSolve = !existingSubmission;
    const status = 'solved'; // In real app, you'd run tests here

    // Create submission
    const submission = await Submission.create({
      userId,
      questionId,
      code,
      language,
      status,
    });

    // Update user XP and streak
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Award XP only for first solve
    if (isFirstSolve) {
      const xpEarned = XP_VALUES[question.difficulty as keyof typeof XP_VALUES] || 0;
      user.xp += xpEarned;

      // Update streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (user.lastSubmissionDate) {
        const lastDate = new Date(user.lastSubmissionDate);
        lastDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          user.streak += 1; // Continue streak
        } else if (diffDays > 1) {
          user.streak = 1; // Reset streak
        }
        // If same day, don't change streak
      } else {
        user.streak = 1; // First submission
      }

      user.lastSubmissionDate = new Date();

      // Calculate new level
      const levelInfo = calculateLevel(user.xp);
      user.level = levelInfo.level;

      // Check for new achievements
      const allSubmissions = await Submission.find({ userId });
      const newAchievements = checkAchievements(user, allSubmissions);
      
      newAchievements.forEach((achievement) => {
        if (!user.achievements.includes(achievement)) {
          user.achievements.push(achievement);
        }
      });

      await user.save();

      return res.status(201).json({
        submission,
        xpEarned,
        newLevel: levelInfo.level,
        levelTitle: levelInfo.title,
        totalXp: user.xp,
        streak: user.streak,
        newAchievements,
      });
    }

    res.status(201).json({ submission, xpEarned: 0, message: 'Already solved' });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserSubmissions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const submissions = await Submission.find({ userId })
      .populate('questionId')
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSubmissionStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const submissions = await Submission.find({ userId }).populate('questionId');

    const attemptedQuestions = new Set(submissions.map((s) => s.questionId._id.toString())).size;
    const solvedQuestions = new Set(
      submissions.filter((s) => s.status === 'solved').map((s) => s.questionId._id.toString())
    ).size;

    // Category stats
    const categoryStats: any = {};
    submissions.forEach((submission) => {
      const question = submission.questionId as any;
      question.category.forEach((cat: string) => {
        if (!categoryStats[cat]) {
          categoryStats[cat] = { attempted: 0, solved: 0 };
        }
        categoryStats[cat].attempted += 1;
        if (submission.status === 'solved') {
          categoryStats[cat].solved += 1;
        }
      });
    });

    // Remove duplicates in category stats
    const uniqueCategoryStats: any = {};
    const processedQuestions = new Set();
    
    submissions.forEach((submission) => {
      const questionId = submission.questionId._id.toString();
      const question = submission.questionId as any;
      
      question.category.forEach((cat: string) => {
        if (!uniqueCategoryStats[cat]) {
          uniqueCategoryStats[cat] = { attempted: new Set(), solved: new Set() };
        }
        
        if (!processedQuestions.has(`${cat}-${questionId}`)) {
          uniqueCategoryStats[cat].attempted.add(questionId);
          if (submission.status === 'solved') {
            uniqueCategoryStats[cat].solved.add(questionId);
          }
          processedQuestions.add(`${cat}-${questionId}`);
        }
      });
    });

    // Convert Sets to counts
    Object.keys(uniqueCategoryStats).forEach((cat) => {
      uniqueCategoryStats[cat] = {
        attempted: uniqueCategoryStats[cat].attempted.size,
        solved: uniqueCategoryStats[cat].solved.size,
      };
    });

    // Get user info
    const user = await User.findById(userId);
    const levelInfo = calculateLevel(user?.xp || 0);

    res.json({
      attemptedQuestions,
      solvedQuestions,
      categoryStats: uniqueCategoryStats,
      xp: user?.xp || 0,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
      nextLevelXp: levelInfo.nextLevelXp,
      currentLevelXp: levelInfo.currentLevelXp,
      streak: user?.streak || 0,
      achievements: user?.achievements || [],
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
