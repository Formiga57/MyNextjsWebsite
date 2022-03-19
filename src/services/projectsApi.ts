import axios, { AxiosResponse } from 'axios';
import { IAdminPostInfos } from '../utils/projectsApi';

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
  baseURL: 'https://formiga57.xyz/api/projects',
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

export const AddPopularity = (id: string) => {
  instance.post('/projectPopularity', { id: id });
};
export const GetPostInfo = async (
  id: string
): Promise<AxiosResponse<any, any>> => {
  return await instance.post('/getPostInfo', { _id: id });
};
export const UploadImages = async (
  formData: FormData
): Promise<AxiosResponse<any, any>> => {
  return await axios.post('https://formiga57.xyz/api/uploadfile', formData);
};
export const UpdatePost = async (
  Data: IAdminPostInfos,
  id: string
): Promise<AxiosResponse<any, any>> => {
  return await instance.post('/updatePostInfo/', { ...Data, _id: id });
};
export const NewProject = async (): Promise<AxiosResponse<any, any>> => {
  return await instance.post('/newProject');
};
