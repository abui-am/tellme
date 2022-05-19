import { getDownloadURL, ref } from 'firebase/storage';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { cors } from '@/backend/utils/middlewares';
import { responseBuilder } from '@/backend/utils/responseUtils';
import { storage } from '@/firebase/admin';
import { storageClient } from '@/firebase/clientApp';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const rb = responseBuilder(req, res);

  const uuid = v4();
  if (req.method === 'POST') {
    try {
      const data: any = await new Promise((resolve, reject) => {
        const form = formidable();
        form.parse(req, (err: any, fields: any, files: any) => {
          // eslint-disable-next-line prefer-promise-reject-errors
          if (err) reject({ err });
          resolve({ err, fields, files });
        });
      });

      const { file } = data.files;
      await storage.bucket().upload(file.filepath, {
        destination: `profiles/${uuid}.${file.originalFilename.split('.')?.pop()}`,
      });
      const fileRef = ref(storageClient, `profiles/${uuid}.${file.originalFilename.split('.')?.pop()}`);

      rb.success({
        url: await getDownloadURL(fileRef),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e });
      res.end();
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
