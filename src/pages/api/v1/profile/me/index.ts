import { auth } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

import { cors } from '@/backend/utils/middlewares';
import { responseBuilder } from '@/backend/utils/responseUtils';
import { db } from '@/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const rb = responseBuilder(req, res);

  if (req.method === 'GET') {
    try {
      const { authentication } = <{ authentication: string }>req.headers;
      console.log(req.headers);
      const { uid } = await auth().verifyIdToken(authentication);
      const ref = db.collection('profile').doc(uid);
      const data = (await ref.get()).data();
      rb.success(data, {
        message: 'Success',
      });
    } catch (e: any) {
      console.error(e);
      rb.badRequest(
        {},
        {
          code: e.code,
          message: e.message,
        }
      );
    }
  }
};
