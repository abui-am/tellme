import { NextApiRequest, NextApiResponse } from 'next';

import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';
import { db } from '@/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method === 'GET') {
    try {
      const { id } = <{ id: string }>req.query;
      const snapshot = await db.collection('profile').doc(id).get();

      const dataSnapshot = snapshot.data();

      res.status(200).json(
        createResult(
          { ...dataSnapshot },
          {
            query: req.query,
          }
        )
      );
      res.end();
    } catch (e) {
      res.end();
    }
  }
};
