import { createContext, useState } from 'react';

interface IContextValues {
  user?: IUser;
  Page: number;
  setPage: (number) => void;
  setUser: (IUser) => void;
}

interface IUser {
  id: string;
  email: string;
  username: string;
  roles: number[];
  key: string;
}
export const AuthContext = createContext({} as IContextValues);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [Page, setPage] = useState<number>(0);
  return (
    <AuthContext.Provider value={{ user, Page, setPage, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
