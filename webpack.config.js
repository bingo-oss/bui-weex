// You can see all the config in `./configs`.
let webpackConfig;
module.exports = env => {
  switch (env.NODE_ENV) {
    case 'prod':
    case 'production':
      webpackConfig = require('./configs/webpack.prod.conf');
      break;
    case 'common':
      webpackConfig = require('./configs/webpack.common.conf');
      break;
    case 'dev':
    case 'development':
      webpackConfig = require('./configs/webpack.dev.conf');
    default:
      webpackConfig = require('./configs/webpack.dev.conf');
  }
  return webpackConfig;
}
