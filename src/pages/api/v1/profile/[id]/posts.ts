import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/backend/firebase/admin';
import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method === 'GET') {
    try {
      const { id } = <{ id: string }>req.query;
      const snapshot = await db.collection('post').where('profileId', '==', id).get();
      const result: any[] = [];

      snapshot.forEach((doc) => {
        result.push(doc.data());
      });

      res.status(200).json(createResult([...result], req.query));
      res.end();
    } catch (e) {
      res.end();
    }
  }
};
