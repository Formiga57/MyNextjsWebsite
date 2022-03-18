import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import Project, { IProject } from '../../../../models/projectModel';
import dbConnect from '../../../../utils/mongodb';

interface IBody {
  banner: string;
  content: string;
  description: string;
  slug: string;
  title: string;
  _id: string;
}

const handler = async (
  { method, body }: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  if (method !== 'POST') {
    return res.status(400).json({});
  }
  const payload = body as IBody;
  const oldProject: IProject = await Project.findOne({ _id: payload._id });
  oldProject.banner = payload.banner;
  oldProject.description = payload.description;
  oldProject.slug = payload.slug;
  oldProject.title = payload.title;
  fs.writeFileSync(
    `./public/posts/uploads/${payload._id}/content.md`,
    payload.content,
    'utf8'
  );
  oldProject.save();
  return res.status(200).json({});
};
export default handler;
