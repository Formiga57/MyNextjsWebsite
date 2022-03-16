import { NextApiRequest, NextApiResponse } from 'next';
import Contact, { IContact } from '../../../models/contactModel';
import dbConnect from '../../../utils/mongodb';

interface IBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (
  { method, body }: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  if (method !== 'POST') {
    return res.status(400).json({});
  }
  const payload = body as IBody;
  const newContact: IContact = {
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
    date: new Date(),
  };
  Contact.create(newContact);
};
export default handler;
