import mongoose, { Schema, ObjectId } from 'mongoose';

export interface IRefresh {
  save?: () => void;
  userid: string;
  refresh: string;
}

const refreshSchema: Schema = new Schema<IRefresh>({
  userid: { type: String, required: true },
  refresh: { type: String, required: true },
});
export default mongoose.models.Refresh ||
  mongoose.model<IRefresh>('Refresh', refreshSchema);
