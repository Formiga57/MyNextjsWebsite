import axios from 'axios';

export interface IProject {
  title: string;
  description: string;
  banner?: string;
  date: Date;
  toolsTags?: number[];
}

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/projects',
  timeout: 15000,
});

export const GetList = (): Promise<IProject[]> => {
  return new Promise(async (res, rej) => {
    const { data }: { data: IProject[] } = await instance.post('', {
      mode: 'getList',
    });
    res(data);
  });
};
