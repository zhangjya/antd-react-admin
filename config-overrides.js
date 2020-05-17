const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
} = require('customize-cra');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE === 'true';

const addCompression = () => (config) => {
  if (isEnvProduction) {
    config.plugins.push(
      // gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        // 只处理比1kb大的资源
        threshold: 1024,
        // 只处理压缩率低于90%的文件
        minRatio: 0.9,
      })
    );
  }

  return config;
};

// 查看打包后各包大小
const addAnalyzer = () => (config) => {
  if (isAnalyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};

const configPaths = require('react-scripts/config/paths');
configPaths.appBuild = path.join(path.dirname(configPaths.appBuild), 'dist'); // 修改打包目录

const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#2f54eb',
        '@layout-body-background': '#F7F7F7',
      },
    },
  }),
  addWebpackAlias({
    '@': resolve('src'),
  }),
  addCompression(),
  addAnalyzer(),
  addWebpackPlugin(
    // 终端进度条显示
    new ProgressBarPlugin()
  ),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
