import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { cors } from '@/backend/utils/middlewares';
import { responseBuilder } from '@/backend/utils/responseUtils';
import { auth, db } from '@/firebase/admin';
import { authClient } from '@/firebase/clientApp';
import { PostLoginData, SignUpPayload } from '@/typings/auth';
import { ProfileStored } from '@/typings/profile';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const rb = responseBuilder(req, res);

  if (req.method === 'POST') {
    try {
      const { email, password, confirmPassword, displayName, username } = req.body as SignUpPayload;
      const ref = db.collection('profile');

      if (password === confirmPassword) {
        const res = await auth.createUser({ email, password, displayName });
        const stored: ProfileStored = {
          displayName,
          uid: res.uid,
          email,
          username,
        };
        await ref.doc(res.uid).create(stored);
        const login = await signInWithEmailAndPassword(authClient, email, password);
        rb.success(
          {
            token: await login.user?.getIdToken(),
            refreshToken: login?.user?.refreshToken,
            user: stored,
          } as PostLoginData,
          {
            message: 'Registrasi success',
          }
        );
      } else {
        rb.unauthorized(
          {},
          {
            message: 'Password tidak sama dengan yang dikonfirmasi',
          }
        );
      }
    } catch (e: any) {
      rb.badRequest(
        {},
        {
          message: e?.message,
        }
      );
    }
  }
};
