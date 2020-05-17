import fetch from 'dva/fetch';
import { message } from 'antd';

// 请求loading队列
const postLoadingQueue = [];
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, options, showLoading = false) {
  if (showLoading) {
    if (postLoadingQueue.length === 0) {
      message.loading('loading...');
    }
    postLoadingQueue.push('');
  }
  const response = await fetch(`${url}`, {
    ...options,
    body: `${options.body}&token=${sessionStorage.getItem('token')}`,
    credentials: 'include',
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  postLoadingQueue.pop();
  if (postLoadingQueue.length <= 0) {
    message.destroy();
  }

  let data = {};

  if (response.status >= 200 && response.status < 300) {
    try {
      data = await response.json();
    } catch (e) {
      data = {
        code: 1001,
        msg: 'Syntax Error in Response Data',
      };
    }
  } else {
    data = {
      code: 1000,
      msg: response.statusText,
    };
  }
  // 集中处理的异常
  return { data };
}
