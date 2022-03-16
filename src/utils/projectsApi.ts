import Project, { IProject } from '../models/projectModel';
import dbConnect from './mongodb';
export const GetPostBySlug = async (slug) => {
  await dbConnect();
  return Project.findOne({ slug: slug });
};
