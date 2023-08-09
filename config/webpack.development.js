const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const notifier = require('node-notifier');
// const logo = join(__dirname, 'icon.png');
const prot = 3003;
module.exports = {
  devServer: {
    historyApiFallback: true,
    static: {
      directory: join(__dirname, '../dist'),
    },
    hot: true,
    port: prot,
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'images/[name].[ext]',
  },
  stats: 'errors-only',
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: '京程一灯 Testenv',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      template: resolve(__dirname, '../src/index-dev.html'),
    }),
    // new WebpackBuildNotifierPlugin({
    //   title: '💿  Dvelopment Notification',
    //   logo,
    //   suppressSuccess: true,
    // }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:' + prot],
        notes: ['💊 构建信息请及时关注窗口右上角'],
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        console.log(error);
        notifier.notify({
          title: '👒 Webpack Build Error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          icon: join(__dirname, 'icon.png'),
        });
      },
      clearConsole: true,
    }),
  ],
};
