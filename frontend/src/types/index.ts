export interface User {
  id: string;
  name: string;
  email: string;
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
