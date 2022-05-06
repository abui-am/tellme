export type ResultOption =
  | {
      message: string;
      status: 200 | 404;
      query: any;
      code: string;
    }
  | Record<string, any>;

const MESSAGE = {
  success: 'Data mendapatkan data',
};

const createResult = (res: any, option?: ResultOption) => {
  return {
    data: res,
    message: option?.message ?? MESSAGE.success,
    status: option?.status ?? 200,
    code: option?.code,
    query: option?.query ?? {},
  };
};

export default createResult;
