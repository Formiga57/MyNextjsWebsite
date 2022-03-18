import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

interface IBody {
  id: string;
}
const storage = multer.diskStorage({
  destination: './public/posts/tmp/',
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

apiRoute.post(async (req, res) => {
  let savedFiles = [];
  let savedFileNames = [];
  const dir = `./public/posts/uploads/${req.body.id}/`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  for (var i = 0; i < Object.keys(req['files']).length; i++) {
    var file = req['files'][i];
    if (path.extname(file.originalname) === '.md') {
      fs.rename(
        './public/posts/tmp/' + file.originalname,
        dir + `content${path.extname(file.originalname)}`,
        function (err) {
          if (err) throw err;
        }
      );
    } else {
      fs.rename(
        './public/posts/tmp/' + file.originalname,
        dir +
          `${file.originalname.toLowerCase()}${path
            .extname(file.originalname)
            .toLowerCase()}`,
        function (err) {
          if (err) throw err;
        }
      );
      savedFiles.push(
        dir.substring(8) +
          `${file.originalname}${path.extname(file.originalname)}`
      );
      savedFileNames.push(
        file.originalname.toLowerCase() + path.extname(file.originalname)
      );
    }
  }
  try {
    let files = fs.readdirSync('./public/posts/uploads/' + req.body.id);
    files.forEach((i, j) => {
      if (i === 'content.md') {
        files.splice(j, 1);
      }
    });
    res.status(200).json({ data: savedFiles, images: files });
  } catch (error) {
    res.status(400).json({});
  }
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
