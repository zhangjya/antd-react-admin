export default {
  namespace: 'login',
  state: {
    isSend: false,
    isKaptcha: false,
    showModal: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return {};
    },
  },
  effects: {},
};
