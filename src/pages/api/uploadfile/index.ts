import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

interface IBody {
  id: string;
}
const storage = multer.diskStorage({
  destination: './public/posts/tmp',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('imgArray'));

apiRoute.post((req, res) => {
  const dir = `./public/posts/uploads/${req.body.id}/`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  for (var i = 0; i < Object.keys(req['files']).length; i++) {
    let newname: string = `${i}`;
    if (i === Number(req.body.banner)) {
      newname = 'banner';
    }
    var file = req['files'][i];
    console.log(`${i} ${file.originalname}`);
    if (path.extname(file.originalname) === '.md') {
      fs.rename(
        './public/posts/tmp' + file.originalname,
        dir + `content${path.extname(file.originalname)}`,
        function (err) {
          if (err) throw err;
        }
      );
    } else {
      fs.rename(
        './public/posts/uploads/' + file.originalname,
        dir + `${newname}${path.extname(file.originalname)}`,
        function (err) {
          if (err) throw err;
        }
      );
    }
  }
  res.status(200).json({ data: 'success' });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
