import axios from 'axios';
import { address } from '../utils/values';

interface ILogin {
  identifier: string;
  password: string;
  persist: boolean;
}
interface IRegister {
  user: string;
  email: string;
  password: string;
  token: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  roles: number[];
}

const instance = axios.create({
  baseURL: `${address}/api/security`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const HandleLogin = ({
  identifier,
  password,
  persist,
}: ILogin): Promise<IUser> => {
  return new Promise((res, rej) => {
    const result = instance
      .post('/login', {
        identifier: identifier,
        password: password,
        persist: persist,
      })
      .then((result) => {
        if (result.status === 200) {
          const data: IUser = result.data;
          res(data);
        } else {
          rej();
        }
      })
      .catch((err) => rej(err));
  });
};
export const VerifyRefresh = (): Promise<IUser | null> => {
  return new Promise((res, rej) => {
    const result = instance
      .post('/verifyToken', {})
      .then((result) => {
        if (result.status === 200) {
          const data: IUser = result.data;
          res(data);
        } else {
          rej();
        }
      })
      .catch((err) => rej(err));
  });
};
export const HandleRegister = ({
  user,
  email,
  password,
  token,
}: IRegister): Promise<string> => {
  return new Promise((res, rej) => {
    const result = instance
      .post('/register', {
        user: user,
        email: email,
        password: password,
        token: token,
      })
      .then((result) => {
        if (result.status === 200) {
          res('ok');
        } else {
          rej();
        }
      })
      .catch((err) => rej(err));
  });
};
