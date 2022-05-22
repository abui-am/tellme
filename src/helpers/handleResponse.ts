import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import toast from 'react-hot-toast';

type HandleResponseProps<T> =
  | {
      data: T;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

function handleResponse<T>(
  res: HandleResponseProps<T>,
  callback: {
    onSuccess?: (res: T) => void;
    onError?: () => void;
  }
) {
  if ('data' in res) {
    callback.onSuccess?.(res?.data);
  }
  if ('error' in res) {
    if (('data' in res?.error) as any) {
      callback.onError?.();
      toast.error((res?.error as any).data?.message || '');
    }
  }
}

export default handleResponse;
