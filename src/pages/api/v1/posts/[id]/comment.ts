import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';
import { db } from '@/firebase/admin';
import { Comment } from '@/typings/posts';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method === 'POST') {
    try {
      const { id } = <{ id: string }>req.query;
      const { comment } = req.body as Comment;
      const sender = {
        profileId: '',
        name: 'Anonim',
        type: 'Anonymous',
      };
      await db
        .collection('post')
        .doc(id)
        .update({
          comments: firestore.FieldValue.arrayUnion({
            id: v4(),
            comment,
            sender,
            createdAt: firestore.Timestamp.now(),
          }),
        });

      res.status(200).json(
        createResult(
          { comment },
          {
            query: req.query,
            message: 'Berhasil menambahkan komentar',
          }
        )
      );
      res.end();
    } catch (e) {
      res.end();
    }
  }
};
