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
    let cookiesSend = [`accessToken=deleted; HttpOnly; Max-Age=1;Path=/;`]
    cookiesSend.push(`refreshToken=deleted; HttpOnly; Max-Age=1;Path=/;`)
    res.setHeader('Set-Cookie',cookiesSend)
    return res.status(200).json({success:"Token refreshed, you're now still allowed to enter"})
};
export default handler;
