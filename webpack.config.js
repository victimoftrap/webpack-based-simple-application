'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const SRC_DIR = __dirname + '/src';
const BUILD_DIR = __dirname + '/build';
const PUBLIC_DIR = __dirname + '/public';

let plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(NODE_ENV)
  }),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(PUBLIC_DIR, 'index.html')
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].[hash].css' : '[name].[hash].css'
  })
];

module.exports = {
  mode: 'none',

  entry: {
    app: path.join(SRC_DIR, '/index.js')
  },

  devServer: {
    contentBase: BUILD_DIR,
    watchContentBase: true,
    inline: true,
    open: true
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].js',
    library: '[name]'
  },

  watch: NODE_ENV === 'development',

  devtool: NODE_ENV === 'development' ? 'source-map' : false,

  plugins: plugins,

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            }
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              partialDirs: [
                path.join(SRC_DIR, 'partials')
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
