import { NextApiRequest, NextApiResponse } from 'next';

import createResult, { ResultOption } from './createResult';
import { BAD_REQUEST, UNAUTHORIZED } from './error';

export const responseBuilder = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    success: (data: any, option?: ResultOption) => {
      res.status(200).json(
        createResult(data, {
          status: 'success',
          message: option?.message ?? 'Berhasil mendapatkan data',
          query: req.query,
        })
      );
      res.end();
    },
    badRequest: (data: any, option?: ResultOption) => {
      res.status(BAD_REQUEST).json(
        createResult(data, {
          status: 'bad_request',
          message: option?.message ?? 'Bad request',
          query: req.query,
        })
      );
      res.end();
    },
    unauthorized: (data: any, option?: ResultOption) => {
      res.status(UNAUTHORIZED).json(
        createResult(data, {
          status: 'unautorized',
          message: option?.message ?? 'Tidak memiliki hak akses',
          query: req.query,
        })
      );
      res.end();
    },
  };
};
