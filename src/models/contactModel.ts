import mongoose, { Schema, ObjectId } from 'mongoose';

export interface IContact {
  _id?: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactSchema: Schema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});
export default mongoose.models.Contact ||
  mongoose.model<IContact>('Contact', contactSchema);
