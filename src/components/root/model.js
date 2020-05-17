import { message } from 'antd';
import * as service from './api';

export default {
  namespace: 'root',
  state: {
    pageTitle: '',
    accountInfo: null,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return {
        breadcrumb: [],
        menuTree: [],
      };
    },
    title(state, { payload }) {
      return {
        ...state,
        title: payload,
      };
    },
  },
  effects: {
    *logout({ payload }, { call }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.logout, payload);
      message.destroy();
      if (data.code === 0) {
        return true;
      }
      message.error(data.msg);
      return false;
    },
  },
};
