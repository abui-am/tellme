import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/backend/firebase/admin';
import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const doc = await db
        .collection('profile')
        .doc(id as string)
        .get();

      res.status(200).json(createResult(doc.data()));
      res.end();
    } catch (e) {
      res.status(500).json({ message: e });
      res.end();
    }
  }
};
