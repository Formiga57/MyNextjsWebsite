import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '../../../../models/userModel';
import Refresh, { IRefresh } from '../../../../models/refreshModel';
import dbConnect from '../../../../utils/mongodb';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import mongoose from 'mongoose';
interface IBody {
  identifier: string;
  password: string;
  persist: boolean;
}
const rand = () => {
  return Math.random().toString(36).substr(2);
};

const generateRefresh = () => {
  return rand() + rand() + rand() + rand() + rand() + rand();
};
// prettier-ignore
const handler = async ({ method, body }: NextApiRequest,res: NextApiResponse) => {
  await dbConnect();
  if (method !== 'POST') {
    return res.status(401).json({});
  }
  const payload = body as IBody;
  const user:IUser = await User.findOne({$or:[{username:payload.identifier},{email:payload.identifier}]})
  if(!user){
    return res.status(401).json({error:"Usuário ou senha incorretos!"});
  }
  const matched = await compare(payload.password,user.password)
  if(!matched){
    return res.status(401).json({error:"Usuário ou senha incorretos!"});
  }
  const token = await sign({email:user.email,username:user.username,id:user._id.toString()},'day32tdbnhe789a2nebtasbdkj',{
      subject:user._id.toString(),
      expiresIn:"50s"
  })
  let cookies = [`accessToken=${token}; HttpOnly; Max-Age=3600;Path=/;`]
  if(payload.persist){
    const oldRefresh:IRefresh = await Refresh.findOne({userid:user._id.toString()})
    if(oldRefresh){
        oldRefresh.refresh = generateRefresh()
        await oldRefresh.save()
        cookies.push(`refreshToken=${oldRefresh.refresh}; HttpOnly; Max-Age=2592000;Path=/;`)
    }else{
        const refresh:IRefresh = {
            userid: user._id.toString(),
            refresh: generateRefresh()
        }
        await Refresh.create(refresh)
        cookies.push(`refreshToken=${refresh.refresh}; HttpOnly; Max-Age=2592000;Path=/;`)
    }
  }
  res.setHeader('Set-Cookie',cookies)
  res.status(200).json({email: user.email,username: user.username,roles: user.roles,id:user._id.toString()});
};
export default handler;
