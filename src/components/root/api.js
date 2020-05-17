import { request } from '@/utils/request';

export function logout() {
  return request('/api/mch/logout', {
    method: 'POST',
  });
}
