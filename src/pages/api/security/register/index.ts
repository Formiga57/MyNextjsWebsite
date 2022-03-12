import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '../../../../models/userModel';
import dbConnect from '../../../../utils/mongodb';
import { hash } from 'bcryptjs';

interface IBody {
  username: string;
  email: string;
  password: string;
  key: string;
}
// prettier-ignore
const handler = async ({ method, body }: NextApiRequest,res: NextApiResponse) => {
  await dbConnect();
  if (method !== 'POST') {
    return res.status(400).json({});
  }
  const payload = body as IBody;
  const existentUser = await User.findOne({$or:[{username:payload.username},{email:payload.email}]})
  if(existentUser){
    return res.status(400).json({error:"Usuário já existente"});
  }
  const passHash = await hash(payload.password,10)
  const newUser:IUser = {
    email: payload.email,
    username: payload.username,
    password: passHash,
    roles: []
  }
  User.create(newUser)
  res.status(200).json({ username: newUser.username});
};
export default handler;
