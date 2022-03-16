import { NextApiRequest, NextApiResponse } from 'next';
import Project, { IProject } from '../../../../models/projectModel';
import dbConnect from '../../../../utils/mongodb';

interface IBody {
  title: string;
  description: string;
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
  const slug = payload.title.toLowerCase().replaceAll(' ', '-');
  const newProject: IProject = {
    title: payload.title,
    description: payload.description,
    date: new Date(),
    slug: slug,
  };
  const createdProj: IProject = await Project.create(newProject);
  res.status(200).json({ id: createdProj._id.toString() });
};
export default handler;
