import axios, { AxiosResponse } from 'axios';

export interface IProject {
  slug: string;
  _id: string;
  title: string;
  description: string;
  banner?: string;
  date: Date;
  toolsTags?: number[];
  popularity: number;
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

export const AddPopularity = (id:string) =>{
  instance.post('/projectPopularity',{id:id})
}
export const GetPostInfo = async (id:string):Promise<AxiosResponse<any, any>> =>{
  return await instance.post('/getPostInfo',{_id:id})
}
