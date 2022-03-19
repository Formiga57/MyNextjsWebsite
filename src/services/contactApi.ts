import axios from 'axios';
import { address } from '../utils/values';

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
  baseURL: `${address}/api/contact`,
  timeout: 15000,
});

export const SendMessage = (data) => {
  instance.post(data);
};
