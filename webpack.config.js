const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index',
  ],
  devServer: {
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.[hash].js',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
          clientLogLevel: 'none',
        },
      },
      {
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
            'react',
          ],
          plugins: [
            'transform-async-to-generator',
            'transform-decorators-legacy',
          ],
        },
      },
      {
        test: /\.scss|css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          },
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg|otf|pdf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [/images/],
        use: 'file-loader',
      },
      {
        test: /\.csv?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: './index.html' }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/), // eslint-disable-line
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },
};
