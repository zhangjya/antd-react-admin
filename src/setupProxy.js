const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://shcs.med.gzhc365.com',
      changeOrigin: true,
    })
  );
};
