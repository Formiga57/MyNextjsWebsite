import Project, { IProject } from '../models/projectModel';
import dbConnect from './mongodb';
import fs from 'fs';
export const GetPostBySlug = async (slug) => {
  await dbConnect();
  return Project.findOne({ slug: slug });
};
export const GetInfosFromId = async (id: string): Promise<IAdminPostInfos> => {
  return new Promise(async (res, rej) => {
    const project: IProject = await Project.findOne({ _id: id });
    if (!project) {
      rej(null);
    }
    try {
      let files = fs.readdirSync('./public/posts/uploads/' + id);
      let content = '';
      files.forEach((i, j) => {
        if (i === 'content.md') {
          try {
            content = fs.readFileSync(
              './public/posts/uploads/' + id + '/' + i,
              'utf8'
            );
            files.splice(j, 1);
          } catch (error) {
            console.log(error);
          }
        }
      });
      res({
        content: content,
        description: project.description,
        images: files,
        slug: project.slug,
        title: project.title,
        toolsTags: project.toolsTags,
        banner: project.banner,
      });
    } catch (error) {
      console.log(error);
      rej(null);
    }
  });
};
export interface IAdminPostInfos {
  images: string[];
  title: string;
  description: string;
  slug: string;
  toolsTags: number[];
  content: string;
  banner: string;
}
