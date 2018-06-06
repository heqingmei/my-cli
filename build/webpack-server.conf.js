'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
const vueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const webpackNodeExternals = require('webpack-node-externals')


module.exports = merge(baseWebpackConfig, {
  target: "node",
  entry: './src/entry-server.js',
  devtool: 'source-map', //如果打包错了，在浏览器里可以找源码
  output: {
    filename: 'server-bundle.js',
    libraryTarget: "commonjs2"
  },
  //不打包node_modules
  externals: [webpackNodeExternals(
    {
      whitelist: /\.css$/
    }
  )], 
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"',
      "process.env.VUE_ENV":  '"server"'
    }),
    new vueSSRServerPlugin(),
  ]
});



