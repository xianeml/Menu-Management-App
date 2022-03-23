import { SERVER_URL } from '@/constants/env.js';
import { TmenuResponse, TrequestConfig } from '@/types/api.js';
import { Tmenu } from '@/types/store.js';

export default async (config: TrequestConfig) => {
  const { url, method, data } = config;

  const requestUrl = SERVER_URL + url;
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const opt: any = { method, headers };
    if (data) opt.body = JSON.stringify(data);

    const response = await fetch(requestUrl, opt);

    // TODO: 에러 코드 별 처리하기
    if (response.status !== 200) {
      const resData = await response.json();
      throw new Error(resData.message);
    }

    const resData = method === 'DELETE' ? null : await response.json();

    if (method === 'GET') {
      return resData.map((data: TmenuResponse) => ({
        id: data.menuId,
        menuName: data.name,
        inStock: !data.isSoldOut,
      })) as Tmenu[];
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
