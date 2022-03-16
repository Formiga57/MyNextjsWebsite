import axios from 'axios';

interface ILogin {
  identifier: string;
  password: string;
  persist: boolean;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  roles: number[];
}

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/security/login',
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
      .post('', {
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
    const result = axios
      .post('http://localhost:3000/api/security/verifyToken', {})
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
