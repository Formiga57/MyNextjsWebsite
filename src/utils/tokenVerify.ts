import { decode } from 'jsonwebtoken';
import Refresh, { IRefresh } from '../models/refreshModel';
import User, { IUser } from '../models/userModel';
import dbConnect from './mongodb';
export const VerifyToken = async (
  refreshCookie: string,
  tokenCookie: string
): Promise<String> => {
  return new Promise(async (res, rej) => {
    await dbConnect();
    if (tokenCookie) {
      const decoded = decode(tokenCookie);
      if (decoded['exp'] > new Date().getTime() / 1000) {
        return res('');
      }
    }
    if (!refreshCookie) {
      return rej("Refresh token doesn't exists and token is invalid");
    }
    const refresh: IRefresh = await Refresh.findOne({ refresh: refreshCookie });
    if (!refresh) {
      return rej('No refresh token associated, this should happen?');
    }
    const user: IUser = await User.findOne({ _id: refresh.userid });
    if (refreshCookie !== refresh.refresh) {
      return rej('Refresh token invalid, this should happen?');
    }
    return res('');
  });
};
