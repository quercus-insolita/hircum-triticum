const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/api', {
  target: process.env.REACT_APP_FILE_SERVER_URL,
  logLevel: 'debug',
  changeOrigin: true,
  pathRewrite: function (path, req) {
    return req.originalUrl.replace('/api/', '/_api/');
  }
});

module.exports = function (app) {
  app.use(apiProxy);
};
