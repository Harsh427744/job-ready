import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  companyTags: string[];
  testCases: Array<{ input: string; output: string }>;
  solution?: string;
  createdAt: Date;
}

const QuestionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: [{ type: String }],
  companyTags: [{ type: String }],
  testCases: [{ input: String, output: String }],
  solution: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
