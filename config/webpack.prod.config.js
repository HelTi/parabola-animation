const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    'parabola-animation': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    library: 'parabolaAnimation',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: true
            }
          }, {
            loader: "sass-loader",
            options: {
              outputStyle: 'compressed',
              sourceMap: true
            }
          }]
        })
      },
      {
        test: /\.html$/,
        loader: "html-loader?attrs=img:src img:data-src"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/static/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: ROOT_PATH,
      verbose: true,
      dry: false,
    }),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].min.css',
      disable: false,
      allChunks: true
    })
  ]
};