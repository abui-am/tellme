import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/backend/firebase/admin';
import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';
import { CreatePostPayload, Data } from '@/typings/posts';

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

  if (req.method === 'POST') {
    try {
      const { id } = <{ id: string }>req.query;
      const { image, message, sender } = req.body as CreatePostPayload;
      const storedData: Data = {
        image: {
          type: image?.type ?? '',
          url: image?.url ?? '',
        },
        message: message ?? '',
        sender: {
          name: sender?.name ?? '',
          profileId: sender?.profileId ?? '',
          type: sender?.type ?? 'anonymous',
        },
        comments: [],
        createdAt: firestore.Timestamp.now(),
        profileId: id,
        isDeleted: false,
      };
      const ref = await db.collection('post');

      ref.add(storedData);

      res.status(200).json(
        createResult(
          { image, message, sender },
          {
            message: 'Berhasil mengirimkan pesan rahasia',
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
