import { auth, firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { cors } from '@/backend/utils/middlewares';
import { responseBuilder } from '@/backend/utils/responseUtils';
import { db } from '@/firebase/admin';
import { Comment } from '@/typings/posts';
import { ProfileStored } from '@/typings/profile';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const rb = responseBuilder(req, res);

  if (req.method === 'POST') {
    try {
      const { id } = <{ id: string }>req.query;
      const { authentication } = <{ authentication: string }>req.headers;
      const { uid } = await auth().verifyIdToken(authentication);

      const { comment } = req.body as Comment;

      const profile = <ProfileStored>(await db.collection('profile').doc(uid).get()).data();

      const sender = {
        profileId: profile?.uid,
        name: profile.displayName,
        imageUrl: profile.imageUrl ?? '265112957_1028677061247492_6032049044662209224_n.jpg',
        type: 'Author',
      };

      const doc = db.collection('post').doc(id);
      doc.update({
        comments: firestore.FieldValue.arrayUnion({
          id: v4(),
          comment,
          sender,
          createdAt: firestore.Timestamp.now(),
        }),
      });
      rb.success(
        { comment },
        {
          query: req.query,
          message: 'Berhasil menambahkan komentar',
        }
      );
    } catch (e: any) {
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
