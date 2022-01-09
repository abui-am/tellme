export type ResultOption =
  | {
      message: string;
      status: 200 | 404;
    }
  | Record<string, any>;

const MESSAGE = {
  success: 'Data mendapatkan data',
};

const createResult = (res: any, query: any, option?: ResultOption) => {
  return {
    data: res,
    message: option?.message ?? MESSAGE.success,
    status: option?.status ?? 200,
    query,
  };
};

export default createResult;
