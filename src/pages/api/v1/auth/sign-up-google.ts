import { auth } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

import { cors } from '@/backend/utils/middlewares';
import { responseBuilder } from '@/backend/utils/responseUtils';
import { db } from '@/firebase/admin';
import { PostLoginData, SignUpWithGoogle } from '@/typings/auth';
import { ProfileStored } from '@/typings/profile';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const rb = responseBuilder(req, res);

  if (req.method === 'POST') {
    try {
      const body = req.body as SignUpWithGoogle;

      const idToken = await auth().verifyIdToken(body.idToken);
      const user = await auth().getUser(idToken.uid);
      const ref = db.collection('profile');

      const stored: ProfileStored = {
        displayName: user?.displayName ?? '',
        uid: idToken.uid,
        email: user?.email ?? '',
        username: body?.username,
        imageUrl: user?.photoURL ?? '',
      };
      await ref.doc(user?.uid ?? '').create(stored);
      rb.success(
        {
          token: body.idToken,
          refreshToken: body.refreshToken,
          user: stored,
        } as PostLoginData,
        {
          message: 'Registrasi success',
        }
      );
    } catch (e: any) {
      console.log(e, 'TESSS');

      rb.badRequest({}, { message: e?.message });
      res.end();
    }
  }
};
