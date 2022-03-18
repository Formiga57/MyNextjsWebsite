import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/mongodb';
import { GetInfosFromId } from '../../../../utils/projectsApi';

interface IBody {
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
  try {
    const postInfos = await GetInfosFromId(payload._id);
    return res.status(200).json(postInfos);
  } catch (error) {
    return res.status(400).json({});
  }
};
export default handler;
