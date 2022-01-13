import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { db } from '@/backend/firebase/admin';
import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';
import { CreatePostPayload, Data } from '@/typings/posts';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method === 'GET') {
    try {
      const { id, limit = '5', page = '1' } = <{ id: string; limit: string; page: string }>req.query;
      const snapshot = await db
        .collection('post')
        .orderBy('createdAt', 'desc')
        .where('profileId', '==', id)
        .offset((+page - 1) * +limit)
        .limit(+limit)
        .get();
      const result: any[] = [];

      snapshot.forEach((doc) => {
        result.push(doc.data());
      });

      res.status(200).json(createResult([...result], { query: { id, limit, page } }));
      res.end();
    } catch (e) {
      console.error(e);
      res.end();
    }
  }

  if (req.method === 'POST') {
    try {
      const { id } = <{ id: string }>req.query;
      const uuid = v4();
      const { image, message, sender } = req.body as CreatePostPayload;
      const storedData: Data = {
        id: uuid,
        image: {
          type: image?.type ?? '',
          url: image?.url ?? '',
        },
        message: message ?? '',
        sender: {
          name: sender?.name ?? 'Anonim',
          profileId: sender?.profileId ?? '',
          type: sender?.type ?? 'Anonymous',
        },
        comments: [],
        createdAt: firestore.Timestamp.now(),
        profileId: id,
        isDeleted: false,
      };
      const ref = await db.collection('post');

      ref.doc(uuid).create(storedData);

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
