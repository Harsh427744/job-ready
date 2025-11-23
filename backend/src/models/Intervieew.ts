import mongoose, { Schema, Document } from 'mongoose';

export interface IInterview extends Document {
  hostId: mongoose.Types.ObjectId;
  participantId?: mongoose.Types.ObjectId;
  questionIds: mongoose.Types.ObjectId[];
  scheduledTime: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
}

const InterviewSchema: Schema = new Schema({
  hostId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participantId: { type: Schema.Types.ObjectId, ref: 'User' },
  questionIds: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  scheduledTime: { type: Date, required: true },
  duration: { type: Number, default: 60 },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IInterview>('Interview', InterviewSchema);
