import mongoose, { Schema, ObjectId } from 'mongoose';

export interface IProject {
  _id?: ObjectId;
  slug: string;
  title: string;
  description: string;
  banner?: string;
  date: Date;
  toolsTags?: number[];
  popularity: number;
  save?: () => void;
}

const projectSchema: Schema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String },
  date: { type: Date, required: true },
  slug: { type: String, required: true },
  toolsTags: [{ type: Number }],
  popularity: { type: Number, required: true, default: 0 },
});
export default mongoose.models.Project ||
  mongoose.model<IProject>('Project', projectSchema);
