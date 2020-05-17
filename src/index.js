/* eslint-disable global-require */
import dva from 'dva';
// import '@babel/polyfill';
// import createLoading from 'dva-loading';
import { message } from 'antd';
import './resources/styles/common.less';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  // history: hashHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
// app.use(createLoading());

const models = [
  require('./components/root/model').default,
  require('./pages/login/model').default,
];

// 3. Model
// Moved to router.js
// app.model(require('./components/root/model').default);

models.forEach(item => app.model(item));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
