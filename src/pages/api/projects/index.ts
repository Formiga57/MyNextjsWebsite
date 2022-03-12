import { NextApiRequest, NextApiResponse } from 'next';
import Project, { IProject } from '../../../models/projectModel';
import dbConnect from '../../../utils/mongodb';

const handler = async (
  { method, body }: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  if (method !== 'POST') {
    return res.status(400).json({});
  }
  switch (body.mode) {
    case 'getList':
      // const project: IProject = {
      //   title: 'Testeee Segundo reis',
      //   description:
      //     'Uma descrição bacana explicando sobre como é feito o projeto e quais são as coisas bacana',
      //   date: new Date(),
      //   banner: 'linkBannerzin',
      //   toolsTags: [1, 3, 2, 4, 5],
      // };
      // await Project.create(project);
      const projectList = await Project.find();
      console.log(projectList);
      res.status(200).json(projectList);
      break;
    default:
      res.status(400).json({});
      break;
  }
};
export default handler;
