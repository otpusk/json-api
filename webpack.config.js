const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    entry: ['@babel/polyfill', './playground/index.js'],
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        port: 3000
    },
    resolve: {
        extensions: ['.mjs', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'eval-source-map'
}

module.exports = config;