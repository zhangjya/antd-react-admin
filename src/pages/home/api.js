import { request } from '@/utils/request';
import { jsonToQueryString } from '@/utils/utils';


export function api(param) {
  return request('/api', {
    method: 'POST',
    body: jsonToQueryString({ ...param }),
  });
}
