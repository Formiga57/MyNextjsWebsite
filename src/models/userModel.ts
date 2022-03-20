import mongoose, { Schema, ObjectId } from 'mongoose';

export interface IUser {
  _id?: ObjectId;
  email: string;
  username: string;
  password: string;
  roles: number[];
  key: string;
}

const userSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: Number, required: true }],
  key: [{ type: String, required: true }],
});
export default mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);
