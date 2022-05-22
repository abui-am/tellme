import { auth } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

import createResult from '@/backend/utils/createResult';
import { cors } from '@/backend/utils/middlewares';
import { responseBuilder } from '@/backend/utils/responseUtils';
import { db } from '@/firebase/admin';
import { PutProfileByIdPayload } from '@/typings/profile';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const rb = responseBuilder(req, res);

  if (req.method === 'GET') {
    try {
      const { id } = <{ id: string }>req.query;
      const snapshot = await db.collection('profile').doc(id).get();

      const dataSnapshot = snapshot.data();

      res.status(200).json(
        createResult(
          { ...dataSnapshot },
          {
            query: req.query,
          }
        )
      );
      res.end();
    } catch (e) {
      res.end();
    }
  }

  if (req.method === 'PUT') {
    try {
      const { authentication } = <{ authentication: string }>req.headers;
      const { id } = <{ id: string }>req.query;
      const body = <PutProfileByIdPayload>req.body;
      const refer = db.collection('profile').doc(id);

      const { uid } = await auth().verifyIdToken(authentication);
      const dataSnapshot = (await refer.get()).data();

      if (uid !== dataSnapshot?.uid) {
        rb.unauthorized(
          {},
          {
            message: 'Unauthorized',
          }
        );
      } else {
        const isExist = await checkIfUsernameIsExist(body.username);
        if (!isExist) {
          await refer.update(body);
          const newRefer = db.collection('profile').doc(id);
          const data = (await newRefer.get()).data();
          rb.success(data, {
            message: 'Success',
          });
        } else {
          rb.unauthorized(
            {},
            {
              message: 'Username already exists',
            }
          );
        }
      }
    } catch (e) {
      console.error(e);
      rb.badRequest(
        {},
        {
          message: 'Bad Request',
        }
      );
    }
  }
};

export async function checkIfUsernameIsExist(username: string) {
  const snapshot = await db.collection('profile').where('username', '==', username).get();
  console.log(snapshot);
  return !snapshot.empty;
}
