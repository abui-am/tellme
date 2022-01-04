import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/backend/firebase/admin';
import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method === 'GET') {
    let id = '';

    try {
      const snapshot = await db.collection('profile').get();

      snapshot.forEach((doc) => {
        id = doc.id;
      });

      const doc = await db.collection('profile').doc(id).get();

      res.status(200).json(createResult(doc.data()));
      res.end();
    } catch (e) {
      res.status(500).json({ message: e });
      res.end();
    }
  }
};
