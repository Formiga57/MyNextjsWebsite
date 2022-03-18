import { GetServerSideProps } from 'next';
import { createContext, useEffect, useState } from 'react';
import { VerifyRefresh } from '../services/securityApi';

interface IContextValues {
  user?: IUser;
  Page: number;
  setPage: (number) => void;
}

interface IUser {
  id: string;
  email: string;
  username: string;
  roles: number[];
}
export const AuthContext = createContext({} as IContextValues);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [Page, setPage] = useState<number>(0);
  useEffect(() => {
    VerifyRefresh()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        window.location.replace('/login');
      });
  }, [setUser]);
  return (
    <AuthContext.Provider value={{ user, Page, setPage }}>
      {children}
    </AuthContext.Provider>
  );
};
