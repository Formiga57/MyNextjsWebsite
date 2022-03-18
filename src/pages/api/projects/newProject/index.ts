import { NextApiRequest, NextApiResponse } from 'next';
import Project, { IProject } from '../../../../models/projectModel';
import dbConnect from '../../../../utils/mongodb';
import fs from 'fs';

const handler = async (
  { method, body }: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  if (method !== 'POST') {
    return res.status(400).json({});
  }
  const newProject: IProject = {
    title: ' ',
    description: ' ',
    date: new Date(),
    slug: ' ',
    popularity: 0,
    banner: ' ',
    toolsTags: [],
  };
  const createdProj: IProject = await Project.create(newProject);
  await fs.mkdirSync('./public/posts/uploads/' + createdProj._id.toString());
  await fs.appendFileSync(
    './public/posts/uploads/' + createdProj._id.toString() + '/content.md',
    ''
  );
  res.status(200).json({ id: createdProj._id.toString() });
};
export default handler;
