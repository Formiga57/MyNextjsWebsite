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
    await dbConnect()
    const cookies = parseCookie(headers.cookie)
    if(cookies['accessToken']){
        const decoded = decode(cookies['accessToken'])
        const user = await User.findOne({$or:[{username:decoded['username']},{email:decoded['email']}]})
        if(decoded['exp'] > new Date().getTime()/1000){
            user.password = null
            delete user.password
            return res.status(200).json(user)
        }
    }
    if(!cookies['refreshToken']){
        return res.status(401).json({error:"No refresh, expired!"})
    }
    const refresh:IRefresh = await Refresh.findOne({refresh:cookies['refreshToken'].toString()})
    const user:IUser = await User.findOne({_id:refresh.userid})
    if(!refresh){
        return res.status(401).json({error:"No refresh associated, this should happen?"})
    }
    if(cookies['refreshToken'] !== refresh.refresh){
        return res.status(401).json({error:"Refresh Incorrect, this should happen?"})
    }
    const token = await sign({email:user.email,username:user.username,id:user._id.toString()},process.env.JWT_TOKEN,{
        subject:user._id.toString(),
        expiresIn:"50s"
    })
    res.setHeader('Set-Cookie',`accessToken=${token}; HttpOnly; Max-Age=3600;Path=/;`)
    user.password = null
    delete user.password
    return res.status(200).json(user)
};
export default handler;
