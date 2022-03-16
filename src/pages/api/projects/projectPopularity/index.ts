import { NextApiRequest, NextApiResponse } from 'next';
import Project, { IProject } from '../../../../models/projectModel';
import dbConnect from '../../../../utils/mongodb';

interface IBody {
  id: string;
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
  const project: IProject = await Project.findOne({ _id: payload.id });
  project.popularity += 1;
  project.save();
  res.status(200).json({});
};
export default handler;
