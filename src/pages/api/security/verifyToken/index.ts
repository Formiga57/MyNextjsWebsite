import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '../../../../models/userModel';
import dbConnect from '../../../../utils/mongodb';
import { hash } from 'bcryptjs';
import { decode, sign } from 'jsonwebtoken';
import Refresh, { IRefresh } from '../../../../models/refreshModel';
const parseCookie = (str: string): object =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
// prettier-ignore
const handler = async ({ method, body,headers }: NextApiRequest,res: NextApiResponse) => {
    const cookies = parseCookie(headers.cookie)
    if(!cookies['accessToken']){
        return res.status(400).json({error:"No token, go to login page!"})
    }
    const decoded = decode(cookies['accessToken'])
    if(decoded['exp'] > new Date().getTime()/1000){
        return res.status(200).json({success:"Isn't expired, go further"})
    }
    if(!cookies['refreshToken']){
        return res.status(400).json({error:"No refresh, expired!"})
    }
    const refresh:IRefresh = await Refresh.findOne({userid:decoded['id']})
    if(!refresh){
        return res.status(400).json({error:"No refresh associated, this should happen?"})
    }
    if(cookies['refreshToken'] !== refresh.refresh){
        return res.status(400).json({error:"Refresh Incorrect, this should happen?"})
    }
    const user:IUser = await User.findOne({$or:[{username:decoded['username']},{email:decoded['email']}]})
    const token = await sign({email:user.email,username:user.username,id:user._id.toString()},'day32tdbnhe789a2nebtasbdkj',{
        subject:user._id.toString(),
        expiresIn:"50s"
    })
    res.setHeader('Set-Cookie',`accessToken=${token}; HttpOnly; Max-Age=3600;Path=/;`)
    return res.status(200).json({success:"Token refreshed, you're now still allowed to enter"})
};
export default handler;
