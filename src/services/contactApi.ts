import axios from 'axios';

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
  baseURL: 'http://localhost:3000/api/contact',
  timeout: 15000,
});

export const SendMessage = (data) => {
  instance.post(data)
};
