import { NextApiRequest, NextApiResponse } from 'next';

import { cors } from '@/backend/utils/middlewares';
import { responseBuilder } from '@/backend/utils/responseUtils';
import { db } from '@/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const rb = responseBuilder(req, res);

  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const doc = await db
        .collection('profile')
        .doc(id as string)
        .get();

      rb.success(doc.data());
    } catch (e) {
      res.status(500).json({ message: e });
      res.end();
    }
  }
};
