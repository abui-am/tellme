import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { db } from '@/backend/firebase/admin';
import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';
import { Comment } from '@/typings/posts';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method === 'POST') {
    try {
      const { id } = <{ id: string }>req.query;
      const {
        comment,
        sender = {
          profileId: '',
          name: 'Anonymous',
          type: 'Anonymous',
        },
      } = req.body as Comment;

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
