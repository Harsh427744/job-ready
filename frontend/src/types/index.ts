export interface User {
  id: string;
  name: string;
  email: string;
  xp?: number;
  level?: number;
  streak?: number;
  achievements?: string[];
}

export interface Question {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  companies?: string[];
  examples?: {
    input: string;
    output: string;
    explanation: string;
  }[];
  constraints?: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Submission {
  _id: string;
  userId: string;
  questionId: Question;
  code: string;
  language: string;
  status: 'attempted' | 'solved';
  submittedAt: Date;
}

export interface SubmissionResponse {
  submission: Submission;
  xpEarned: number;
  newLevel: number;
  levelTitle: string;
  totalXp: number;
  streak: number;
  newAchievements: string[];
}

export interface Stats {
  attemptedQuestions: number;
  solvedQuestions: number;
  categoryStats: {
    [key: string]: {
      attempted: number;
      solved: number;
    };
  };
  xp: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  currentLevelXp: number;
  streak: number;
  achievements: string[];
}
