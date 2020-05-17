import { request } from '@/utils/request';
import { jsonToQueryString } from '@/utils/utils';

export function login(param) {
  return request('/api/mch/login', {
    method: 'POST',
    body: jsonToQueryString({ ...param }),
  });
}
