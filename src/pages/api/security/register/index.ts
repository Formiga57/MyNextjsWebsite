import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '../../../../models/userModel';
import dbConnect from '../../../../utils/mongodb';
import { hash } from 'bcryptjs';
import Token, { IToken } from '../../../../models/tokenModel';

interface IBody {
  user: string;
  email: string;
  password: string;
  token: string;
}
// prettier-ignore
const handler = async ({ method, body }: NextApiRequest,res: NextApiResponse) => {
  await dbConnect();
  if (method !== 'POST') {
    return res.status(400).json({});
  }
  const payload = body as IBody;
  const existentUser:IUser = await User.findOne({$or:[{username:payload.user},{email:payload.email}]})
  if(existentUser){
    return res.status(200).json({error:"Usuário já existente"});
  }
  const existentToken:IToken = await Token.findOne({token:payload.token})
  if(!existentToken){
    return res.status(200).json({error:"Token não existe"});
  }
  if(existentToken.userId){
    return res.status(200).json({error:"Token já utilizado"});
  }
  const passHash = await hash(payload.password,10)
  const newUser:IUser = {
    email: payload.email,
    username: payload.user,
    password: passHash,
    roles: existentToken.predefRoles,
    key:existentToken.token
  }
  const createdUser = await User.create(newUser)
  existentToken.userId = createdUser._id.toString()
  existentToken.save()
  res.status(200).json({ username: newUser.username});
};
export default handler;
