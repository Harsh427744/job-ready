import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  code: string;
  language: string;
  status: 'attempted' | 'solved';
  submittedAt: Date;
}

const SubmissionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, enum: ['attempted', 'solved'], default: 'attempted' },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISubmission>('Submission', SubmissionSchema);
