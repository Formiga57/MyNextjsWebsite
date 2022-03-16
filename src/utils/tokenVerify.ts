import dbConnect from './mongodb';
import Refresh, { IRefresh } from '../models/refreshModel';
import User, { IUser } from '../models/userModel';
import { decode, sign } from 'jsonwebtoken';
export const VerifyToken = async (
  refreshCookie: string,
  tokenCookie: string
): Promise<String> => {
  return new Promise(async (res, rej) => {
    await dbConnect();
    if (tokenCookie) {
      const decoded = decode(tokenCookie);
      if (decoded['exp'] > new Date().getTime() / 1000) {
        return res(tokenCookie);
      }
    }
    if (!refreshCookie) {
      rej("Refresh token doesn't exists and token is invalid");
    }
    const refresh: IRefresh = await Refresh.findOne({ refresh: refreshCookie });
    const user: IUser = await User.findOne({ _id: refresh.userid });
    if (!refresh) {
      rej('No refresh token associated, this should happen?');
    }
    if (refreshCookie !== refresh.refresh) {
      rej('Refresh token invalid, this should happen?');
    }
    const token = await sign(
      { email: user.email, username: user.username, id: user._id.toString() },
      'day32tdbnhe789a2nebtasbdkj',
      {
        subject: user._id.toString(),
        expiresIn: '50s',
      }
    );
    res(token);
  });
};
