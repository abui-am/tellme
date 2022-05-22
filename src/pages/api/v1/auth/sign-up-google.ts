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

      const data = (await ref.doc(idToken.uid).get()).data();
      if (data) {
        rb.success(
          {
            token: body.idToken,
            user: data,
            refreshToken: body.refreshToken,
          } as PostLoginData,
          {
            message: 'Login success',
          }
        );
      } else {
        const stored: ProfileStored = {
          displayName: user?.displayName ?? '',
          uid: idToken.uid,
          email: user?.email ?? '',
          username: '',
          imageUrl: user?.photoURL?.replace('s96-c', 's384-c') ?? '',
        };
        await ref.doc(user?.uid ?? '').create(stored);
        rb.success(
          {
            token: body.idToken,
            user: stored,
            refreshToken: body.refreshToken,
          } as PostLoginData,
          {
            message: 'Registrasi success',
          }
        );
      }
    } catch (e: any) {
      rb.badRequest({}, { message: e?.message });
    }
  }
};
