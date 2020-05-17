import fetch from 'dva/fetch';
import { message } from 'antd';

const hashHistory = require('history').createHashHistory();

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function download(url, options) {
  const response = await fetch(`${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      mode: 'no-cors',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  let data = {
    code: -1,
  };

  if (response.status >= 200 && response.status < 300) {
    const contentType = response.headers.get('content-type');
    if (contentType.indexOf('application/json') >= 0) {
      data = await response.json();
    } else {
      const contentDisposition = decodeURIComponent(
        response.headers.get('content-disposition')
      );
      const filename = contentDisposition
        .match(/filename=([^;]*)/)[1]
        .replace(/"/gi, '');
      const a = document.createElement('a'); // eslint-disable-line
      response.blob().then((blob) => {
        const $url = window.URL.createObjectURL(blob); // eslint-disable-line
        a.href = $url;
        a.download = filename || `${new Date().getTime()}`;
        a.click();
        window.URL.revokeObjectURL($url); // eslint-disable-line
      });
      data = {
        code: 0,
      };
    }
  } else {
    data = {
      code: -1,
      error: response.statusText,
    };
  }

  if (data.code === 999) {
    hashHistory.push({ pathname: '/login' });
  }

  return { data };
}

export async function upload(url, file) {
  const formData = new FormData();
  // const hisId = sessionStorage.getItem('hisId');
  formData.append('file', file.files);
  // formData.append('hisId', hisId);
  const response = await fetch(`${url}`, {
    method: 'POST',
    body: formData,
    // credentials: 'include',
    // mode: 'no-cors',
    // headers: {
    //   Accept: 'application/json, text/javascript, */*; q=0.01',
    //   'Content-Type': 'multipart/form-data',
    // },
  });
  let data = {
    code: -1,
  };
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

  if (data.code === 999) {
    hashHistory.push({ pathname: '/login' });
  }

  return { data };
}

export function jsonToQueryString(json) {
  if (json) {
    return Object.keys(json)
      .map((key) => {
        if (json[key] instanceof Array) {
          return Object.keys(json[key])
            .map((k) => {
              return `${encodeURIComponent(key)}=${encodeURIComponent(
                json[key][k]
              )}`;
            })
            .join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
      })
      .join('&');
  }
  return '';
}

/**
 * 循环调用一个promise函数，并做节流处理，返回一个定时器
 * @param promiseFunction
 * @param timeout
 * @return {*|interval}
 */
export function loopRequest(promiseFunction, timeout = 3000) {
  try {
    if (typeof promiseFunction !== 'function') {
      throw new Error(false);
    }
    let isRequesting = false;
    const req = () => {
      isRequesting = true;
      promiseFunction()
        .then(() => {
          isRequesting = false;
        })
        .catch(() => {
          isRequesting = false;
        });
    };
    const interval = setInterval(() => {
      if (!isRequesting) {
        req();
      }
    }, timeout);
    return interval;
  } catch (error) {
    console.error('[loopRequest] arguments[0] must be a promise function!');
  }
}

/**
 *
 * @param {*} money 单位为分
 */
export function formatMoney(money = 0) {
  try {
    if (typeof Number(money) === 'number') {
      return (Number(money) / 100).toFixed(2);
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}
