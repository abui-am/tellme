import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { cors } from '@/backend/utils/middlewares';
import { responseBuilder } from '@/backend/utils/responseUtils';
import { db } from '@/firebase/admin';
import { authClient } from '@/firebase/clientApp';
import { LoginPayload } from '@/typings/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const rb = responseBuilder(req, res);

  if (req.method === 'POST') {
    try {
      const { email, password } = <LoginPayload>req.body;
      const res = await signInWithEmailAndPassword(authClient, email, password);
      const token = await res.user?.getIdToken();
      const refreshToken = res.user?.refreshToken;
      const profile = await db
        .collection('profile')
        .doc(res?.user?.uid ?? '')
        .get();
      const profileData = profile.data();

      rb.success(
        {
          token,
          refreshToken,
          user: {
            emailVerified: res.user?.emailVerified,
            email: res.user?.email,
            ...profileData,
          },
        },
        {
          message: 'Login success',
        }
      );
    } catch (e) {
      console.error(e);
      rb.badRequest(
        {},
        {
          message: 'Login gagal',
        }
      );
    }
  }
};
