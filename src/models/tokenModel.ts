import mongoose, { Schema, ObjectId } from 'mongoose';

export interface IToken {
  token: string;
  userId?: string;
  save: () => void;
}

const tokenSchema: Schema = new Schema<IToken>({
  token: { type: String, required: true },
  userId: { type: String, required: true },
});
export default mongoose.models.Token ||
  mongoose.model<IToken>('Token', tokenSchema);
