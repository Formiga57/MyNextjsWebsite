import mongoose, { Schema } from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  banner?: string;
  date: Date;
  toolsTags?: Number[];
}

const projectSchema: Schema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String },
  date: { type: Date, required: true },
  toolsTags: [{ type: Number }],
});
export default mongoose.models.Project ||
  mongoose.model<IProject>('Project', projectSchema);
