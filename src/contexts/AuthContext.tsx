import { GetServerSideProps } from 'next';
import { createContext, useEffect, useState } from 'react';
import { VerifyRefresh } from '../services/securityApi';

interface IContextValues {
  user?: IUser;
}

interface IUser {
  id: string;
  email: string;
  username: string;
  roles: number[];
}
export const AuthContext = createContext({} as IContextValues);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    VerifyRefresh()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        window.location.replace('/login');
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
