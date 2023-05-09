const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'), // Entry to your application
    path.resolve(appDirectory, 'App.tsx'), // Change this to your main App file
    path.resolve(appDirectory, 'src'),
    //path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-login-screen'),
    path.resolve(
      appDirectory,
      'node_modules/react-native-text-input-interactive',
    ),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['module:metro-react-native-babel-preset'],
      //presets: ['react-native'],
      //plugins: ['react-native-web'],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

/*const ttfLoaderConfiguration = {
  test: /.(png|woff|woff2|eot|ttf|svg)$/,
  loader: 'url-loader',
  include: path.resolve(appDirectory, 'assets/fonts'),
};*/

const cssStyleLoader = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
};

module.exports = {
  devServer: {
    historyApiFallback: true,
  },

  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js'),
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration, cssStyleLoader],
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appDirectory, 'index.html'),
      favicon: path.join(appDirectory, 'favicon.ico'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: <https://github.com/necolas/react-native-web/issues/349>
      __DEV__: JSON.stringify(true),
    }),
  ],
};
