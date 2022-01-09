import dayjs from 'dayjs';

import { CreatedAt } from '@/typings/posts';

export const parseTimeStamp = (ts: CreatedAt) => {
  // eslint-disable-next-line no-underscore-dangle
  return dayjs(ts?.seconds);
};
