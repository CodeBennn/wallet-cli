const { resolve } = require('path');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

const webpackBaseConfig = {
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve(process.cwd(), 'dist'),
  },
  resolve: {
    alias: {
      '@pages': resolve('src/pages'),
      '@states': resolve('src/states'),
      '@hooks': resolve('src/hooks'),
    },
    extensions: ['.js', '.ts', '.tsx', 'jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset',
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {},
  },
  resolve: {
    // fallback: { url: false, os: false },
    alias: {
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
      '@connectors': resolve('src/connectors'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
    fallback: {
      // stream: require.resolve('stream-browserify'),
    },
  },
  plugins: [new Dotenv()],
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
